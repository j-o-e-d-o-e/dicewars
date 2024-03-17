import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";

export class Comp extends Player {
  static thresholdMighty;
  static thresholdVeryMighty;

  static thresholds(clusters) {
    Comp.thresholdMighty = Math.ceil(clusters.length / 3);
    Comp.thresholdVeryMighty = Math.ceil(clusters.length / 2);
  }

  constructor(id, cautious = false) {
    super(id);
    this.cautious = cautious;
  }

  async turn(clusters, players, afterTurn, end) {
    super.turn();
    for (const attack of [this.attackByPath, this.attackRandomly]) {
      let won = await attack.call(this, clusters, players);
      if (won) {
        await end(false);
        return;
      }
    }
    afterTurn();
  }

  async attackByPath(clusters, players) {
    let path = this.path(clusters);
    let mighties = this.mightyOthers(clusters, players);
    while (path && (mighties.length === 0 || mighties[0].dices <= Comp.thresholdVeryMighty
      || path.slice(1, -1).every(c => c.playerId === mighties[0].id))) {
      let cluster = path.shift();
      for (let target of path.slice(0, -1)) {
        let otherId = await this.attack(cluster, target);
        if (otherId === undefined) break;
        else if (!super.afterSuccessfulAttack(clusters, players, otherId)) cluster = target;
        else return true;
      }
      path = this.path(clusters);
      mighties = this.mightyOthers(clusters, players);
    }
  }

  async attackRandomly(clusters, players) {
    let _clusters = clusters.filter(c => c.playerId === this.id && c.dices > 1)
      .sort((a, b) => b.dices - a.dices);
    let cluster = _clusters.shift();
    while (cluster) {
      let mighties = this.dices > Comp.thresholdMighty ? [] : this.mightyOthers(clusters, players);
      let target = this.target(cluster, mighties);
      if (!target) {
        cluster = _clusters.shift();
        continue;
      }
      let otherId = await this.attack(cluster, target)
      if (otherId === undefined) cluster = _clusters.shift()
      else if (!super.afterSuccessfulAttack(clusters, players, otherId)) cluster = target.dices > 1 ? target : _clusters.shift();
      else return true;
    }
  }

  attack(cluster, target) {
    return new Promise(resolve => {
      let {sumPlayer, sumOther} = super.attacking(cluster, target);
      drawCluster(cluster.corners);
      setTimeout(() => {
        drawCluster(target.corners);
        setTimeout(() => {
          let dicesPlayerBefore = cluster.dices;
          cluster.dices = 1;
          drawDices(cluster);
          drawCluster(cluster.corners, this.id);
          if (sumPlayer > sumOther) resolve(super.successfulAttack(dicesPlayerBefore, target));
          else {
            drawCluster(target.corners, target.playerId);
            resolve(undefined);
          }
        }, TIMEOUT_BG);
      }, TIMEOUT_SM);
    });
  }

  mightyOthers(clusters, players) {
    return players.filter(p => p.id !== this.id && p.dices > Comp.thresholdMighty).sort((a, b) => b.dices - a.dices);
  }

  filterTargetsByMightyOthers(targets, mighties) {
    let tmp;
    for (const mighty of mighties) {
      tmp = targets.filter(c => c.playerId === mighty.id);
      if (tmp.length > 0) break;
    }
    return tmp;
  }

  target(cluster, mighties) {
    let targets = cluster.adjacentClustersFromCluster().filter(c => c.playerId !== this.id);
    if (targets.length === 0) return;
    if (mighties.length > 0) targets = this.filterTargetsByMightyOthers(targets, mighties);
    targets = targets.filter(c => cluster.dices > c.dices - (cluster.dices === 8));
    if (targets.length === 0) return;
    let {groupedTargets, dices} = this.groupTargetsByDices(cluster, targets);
    if (this.cautious && mighties.length === 0) return this.chooseTargetCautiously(groupedTargets, dices, cluster);
    else return this.chooseTargetAggressively(groupedTargets, dices);
  }

  groupTargetsByDices(cluster, targets) {
    let groupedTargets = targets.reduce((acc, current) => { // https://stackoverflow.com/a/34890276/9416041
      (acc[current['dices']] = acc[current['dices']] || []).push(current);
      return acc;
    }, {});
    let dices = [...Array(cluster.dices - 1).keys()].reverse();
    dices[dices.length - 1] = cluster.dices - 1;
    if (cluster.dices === 8) dices.push(8);
    return {groupedTargets, dices};
  }

  chooseTargetAggressively(groupedTargets, dices) {
    for (let dice of dices) {
      if (!(dice in groupedTargets)) continue;
      return groupedTargets[dice][Math.floor(Math.random() * groupedTargets[dice].length)];
    }
  }

  chooseTargetCautiously(groupedTargets, dices, cluster) {
    if (this.additionalDices === 0 && cluster.dices > 2 && cluster.dices < 8
      && cluster.adjacentClusters.some(c => c.dices - cluster.dices > 2)) return;
    for (let dice of dices) {
      if (!(dice in groupedTargets)) continue;
      let candidates = [];
      for (let target of groupedTargets[dice]) {
        if (target.adjacentClustersFromCluster()
          .filter(c => c.playerId !== this.id)
          .every(c => cluster.dices >= c.dices))
          candidates.push(target);
      }
      if (candidates.length > 0) return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }

  path(clusters) {
    let regions = [];
    for (let cluster of clusters.filter(c => c.playerId === this.id)) {
      if (regions.flat().includes(cluster)) continue;
      regions.push(cluster.region());
    }
    regions = regions.map(r => r.filter(c => c.adjacentClustersFromCluster()
      .some(c => c.playerId !== this.id)));

    let res;
    for (let [i, regionFrom] of regions.entries()) {
      for (let clusterFrom of regionFrom) {
        for (let [j, regionTo] of regions.entries()) {
          if (regionFrom === regionTo) continue;
          for (let clusterTo of regionTo) {
            let path = clusterFrom.path(clusterTo);
            if (!path) continue;
            if (res) {
              let newSizeP = regionFrom.length + regionTo.length;
              let newSizeR = regions[res.from].length + regions[res.to].length;
              if (newSizeP > newSizeR || (newSizeP === newSizeR && path.length < res.path.length)) res = {
                from: i,
                to: j,
                path: path
              };
            } else res = {from: i, to: j, path: path};
          }
        }
      }
    }
    return res?.path;
  }
}
