import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";

export class Comp extends Player {

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
        let _players = players.map(p => {
            return {id: p.id, dices: p.dices + p.additionalDices, clusters: 0, obj: p}
        });
        let _dices = 0;
        for (let cluster of clusters) {
            _dices += cluster.dices;
            _players.find(p => p.id === cluster.playerId).clusters++;
        }
        const THRESHOLD_FACTOR = 2.5;
        let mighty = _players.find(p => p.dices >= Math.floor(_dices / players.length) * THRESHOLD_FACTOR
            || p.clusters >= Math.floor(clusters.length / players.length) * THRESHOLD_FACTOR);
        if (mighty !== undefined && mighty.id !== this.id) return mighty.obj;
    }

    target(cluster, mighty) {
        let targets = cluster.getAdjacentClustersFromCluster().filter(c => c.playerId !== this.id);
        if (mighty !== undefined) targets = targets.filter(c => c.playerId === mighty.id);
        targets = targets.filter(c => cluster.dices > c.dices - (cluster.dices === 8));
        let grouped = targets.reduce((acc, current) => { // https://stackoverflow.com/a/34890276/9416041
            (acc[current['dices']] = acc[current['dices']] || []).push(current);
            return acc;
        }, {});
        let dices = [...Array(cluster.dices - 1).keys()]
            .sort((a, b) => b - a)
            .slice(0, cluster.dices - 2).concat([cluster.dices - 1]);
        if (cluster.dices === 8) dices = dices.concat([8]);
        for (let dice of dices) {
            if (dice in grouped) return grouped[dice][0];
        }
    }

    paths(clusters) {
        if (clusters.length === this.dices) return;
        return [];
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