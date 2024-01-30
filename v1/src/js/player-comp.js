import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";

export class Comp extends Player {

    constructor() {
        super();
    }

    async move(clusters, players, cb) {
        super.move();
        let idPred = this.getPredForPlayerId(players, clusters.length);
        let compClusters = clusters.filter(c => c.playerId === this.id && c.dices > 1)
            .sort((a, b) => b.dices - a.dices);
        let cluster = compClusters.shift();
        while (cluster !== undefined) {
            let targetClusters = cluster.getAdjacentClustersFromCluster()
                .filter(c => idPred(c.playerId) && cluster.dices > c.dices - (cluster.dices === 8))
                .sort((a, b) => a.dices - b.dices);
            if (targetClusters.length === 0) {
                cluster = compClusters.shift();
                continue;
            }
            let target = targetClusters[0];
            await this.attack(cluster, target).then(otherId => {
                if (otherId !== undefined) {
                    cluster = target;
                    let gameEnded = this.afterSuccessfulMove(clusters, players, otherId);
                    if (gameEnded) {
                        cluster = undefined;
                        cb = () => {
                        };
                    }
                } else cluster = compClusters.shift();
            });
        }
        cb();
    }

    getPredForPlayerId(players, clustersLength) {
        let playerIdWithBiggestRegion = 0, max = 0;
        for (let [i, p] of players.entries()) {
            if (p.dices > max) {
                max = p.dices;
                playerIdWithBiggestRegion = i;
            }
        }
        if (max >= clustersLength / 2 && playerIdWithBiggestRegion !== this.id) return playerId => playerId === playerIdWithBiggestRegion;
        else return playerId => playerId !== this.id;
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