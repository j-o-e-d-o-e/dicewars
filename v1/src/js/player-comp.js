import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";

export class Comp extends Player {

    constructor(id) {
        super(id);
    }

    async turn(clusters, players, afterTurn, end) {
        super.turn();
        let path = this.path(clusters);
        let mighties = this.mightyOthers(clusters, players);
        while (path && (mighties.length === 0 || mighties[0].dices <= clusters.length / 2
            || path.slice(1, -1).every(c => c.playerId === mighties[0].id))) {
            let cluster = path.shift();
            for (let target of path.slice(0, -1)) {
                let otherId = await this.attack(cluster, target);
                if (otherId === undefined) break;
                else if (!this.afterSuccessfulMove(clusters, players, otherId)) cluster = target;
                else {
                    await end(false);
                    return;
                }
            }
            path = this.path(clusters);
            mighties = this.mightyOthers(clusters, players);
        }
        let _clusters = clusters.filter(c => c.playerId === this.id && c.dices > 1)
            .sort((a, b) => b.dices - a.dices);
        let cluster = _clusters.shift();
        while (cluster) {
            mighties = this.mightyOthers(clusters, players);
            let target = this.target(cluster, mighties);
            if (!target) {
                cluster = _clusters.shift();
                continue;
            }
            let otherId = await this.attack(cluster, target)
            if (otherId === undefined) cluster = _clusters.shift()
            else if (!this.afterSuccessfulMove(clusters, players, otherId)) cluster = target.dices > 1 ? target : _clusters.shift();
            else {
                await end(false);
                return;
            }
        }
        afterTurn();
    }

    attack(cluster, target) {
        return new Promise(resolve => {
            let sumPlayer = Player.roleDice(cluster.dices);
            let sumOther = Player.roleDice(target.dices);
            console.log(`attacks ${target.playerId}: ${cluster.id} vs ${target.id} -> thrown dices: ${sumPlayer} vs ${sumOther}`);
            drawCluster(cluster.corners);
            setTimeout(() => {
                drawCluster(target.corners);
                setTimeout(() => {
                    let dicesPlayerBefore = cluster.dices;
                    cluster.dices = 1;
                    drawDices(cluster);
                    drawCluster(cluster.corners, this.id);
                    if (sumPlayer > sumOther) {
                        let otherPlayerId = target.playerId;
                        target.playerId = this.id;
                        target.dices = dicesPlayerBefore - 1;
                        drawDices(target);
                        drawCluster(target.corners, this.id);
                        resolve(otherPlayerId);
                    } else {
                        drawCluster(target.corners, target.playerId);
                        resolve(undefined);
                    }
                }, TIMEOUT_BG);
            }, TIMEOUT_SM);
        });
    }

    mightyOthers(clusters, players) {
        let threshold = Math.floor(clusters.length / 3);
        return players.filter(p => p.id !== this.id && p.dices > threshold).sort((a, b) => b.dices - a.dices);
    }

    target(cluster, mighties) {
        let targets = cluster.adjacentClustersFromCluster().filter(c => c.playerId !== this.id);
        if (mighties.length > 0) {
            let tmp;
            for (let mighty of mighties) {
                tmp = targets.filter(c => c.playerId === mighty.id);
                if (tmp.length > 0) break;
            }
            targets = tmp;
        }
        targets = targets.filter(c => cluster.dices > c.dices - (cluster.dices === 8));
        if (targets.length === 0) return;
        let grouped = targets.reduce((acc, current) => { // https://stackoverflow.com/a/34890276/9416041
            (acc[current['dices']] = acc[current['dices']] || []).push(current);
            return acc;
        }, {});
        let dices = [...Array(cluster.dices - 1).keys()].reverse();
        dices[dices.length - 1] = cluster.dices - 1;
        if (cluster.dices === 8) dices.push(8);
        for (let dice of dices) {
            if (dice in grouped) return grouped[dice][Math.floor(Math.random() * grouped[dice].length)];
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