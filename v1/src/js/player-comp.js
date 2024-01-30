import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawUpdatedCluster, drawUpdatedDices} from "./draw.js";

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
                        console.log(`Comp player (id: ${this.id}) has won.`);
                        cb = () => {
                        };
                        cluster = undefined;
                    }
                } else cluster = compClusters.shift();
            });
        }
        cb();
    }

    getPredForPlayerId(players, clustersLength) {
        let playerIdWithBiggestRegion = 0, max = 0;
        for (let [i, p] of players.entries()) {
            if (p.biggestRegionSize > max) {
                max = p.biggestRegionSize;
                playerIdWithBiggestRegion = i;
            }
        }
        if (max >= clustersLength / 2 && playerIdWithBiggestRegion !== this.id) return playerId => playerId === playerIdWithBiggestRegion;
        else return playerId => playerId !== this.id;
    }

    attack(cluster, target) {
        return new Promise(resolve => {
            let sumComp = Player.roleDice(cluster.dices);
            let sumOther = Player.roleDice(target.dices);
            console.log(`${cluster.id} attacks ${target.id} -> thrown dices: ${sumComp} vs ${sumOther}`);
            drawUpdatedCluster(cluster.corners);
            setTimeout(() => {
                drawUpdatedCluster(target.corners);
                setTimeout(() => {
                    let dicesCompBefore = cluster.dices;
                    cluster.dices = 1;
                    drawUpdatedDices(cluster);
                    drawUpdatedCluster(cluster.corners, this.id);
                    if (sumComp > sumOther) {
                        let otherPlayerId = target.playerId;
                        target.playerId = this.id;
                        target.dices = dicesCompBefore - 1;
                        drawUpdatedDices(target);
                        drawUpdatedCluster(target.corners, this.id);
                        resolve(otherPlayerId);
                    } else {
                        drawUpdatedCluster(target.corners, target.playerId);
                        resolve(undefined);
                    }
                }, TIMEOUT_BG);
            }, TIMEOUT_SM);
        });
    }
}