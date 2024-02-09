import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";

export class Comp extends Player {
    static THRESHOLD_FACTOR = 2.5;

    constructor() {
        super();
    }

    async turn(clusters, players, cb) {
        super.turn();
        let compClusters = clusters.filter(c => c.playerId === this.id && c.dices > 1)
            .sort((a, b) => b.dices - a.dices);
        let cluster = compClusters.shift();
        while (cluster !== undefined) {
            let mighty = this.mightyOther(clusters, players);
            let target = this.target(cluster, mighty);
            if (target === undefined) {
                cluster = compClusters.shift();
                continue;
            }
            await this.attack(cluster, target).then(otherId => {
                if (otherId === undefined) cluster = compClusters.shift();
                else {
                    cluster = target;
                    let gameEnded = this.afterSuccessfulMove(clusters, players, otherId);
                    if (gameEnded) {
                        cluster = undefined;
                        cb = () => {
                        };
                    }
                }
            });
        }
        cb();
    }

    mightyOther(clusters, players) {
        let _players = players.filter(p => p.id !== this.id).map(p => {
            return {id: p.id, dices: p.dices + p.additionalDices, clusters: 0}
        });
        let allDices = 0;
        for (let cluster of clusters) {
            allDices += cluster.dices;
            let _p = _players.find(p => p.id === cluster.playerId);
            if (_p !== undefined) {
                _p.clusters++;
                _p.dices += cluster.dices;
            }
        }
        for (let _p of _players) {
            if (_p.clusters > clusters.length / players.length * Comp.THRESHOLD_FACTOR ||
                _p.dices > allDices / players.length * Comp.THRESHOLD_FACTOR) {
                return players.find(p => p.id === _p.id);
            }
        }
    }

    target(cluster, mighty) {
        let targets = cluster.adjacentClustersFromCluster().filter(c => c.playerId !== this.id);
        if (mighty !== undefined) targets = targets.filter(c => c.playerId === mighty.id);
        targets = targets.filter(c => cluster.dices > c.dices - (cluster.dices === 8));
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

    pathsBetweenRegions(clusters) {
        let regions = [];
        for (let cluster of clusters.filter(c => c.playerId === this.id)) {
            if (regions.flat().includes(cluster)) continue;
            regions.push(cluster.region());
        }
        regions = regions.map(r =>
            r.filter(c => c.adjacentClustersFromCluster()
                .some(c => c.playerId !== this.id))
        );

        let paths = [];
        for (let [i, regionFrom] of regions.entries()) {
            for (let clusterFrom of regionFrom) {
                for (let [j, regionTo] of regions.entries()) {
                    if (regionFrom === regionTo) continue;
                    for (let clusterTo of regionTo) {
                        paths.push({
                            from: {region: i, cluster: clusterFrom},
                            to: {region: j, cluster: clusterTo},
                            paths: clusterFrom.paths(clusterTo)
                        });
                    }
                }
            }
        }
        return paths;
    }

    attack(cluster, target) {
        return new Promise(resolve => {
            let sumPlayer = Player.roleDice(cluster.dices);
            let sumOther = Player.roleDice(target.dices);
            console.log(`attacks ${target.playerId} -> thrown dices: ${sumPlayer} vs ${sumOther}`);
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
}