import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawUpdatedCluster, drawUpdatedDices} from "./draw.js";

export class Comp extends Player {

    constructor() {
        super();
    }

    async move(clusters, getPlayer, cb) {
        super.move();
        let compClusters = clusters.filter(c => c.playerId === this.id && c.dices > 1)
            .sort((a, b) => b.dices - a.dices);
        let cluster = compClusters.shift()
        while (cluster !== undefined) {
            let targetClusters = cluster.getAdjacentClustersFromCluster()
                .filter(c => c.playerId !== this.id && cluster.dices > c.dices - (cluster.dices === 8))
                .sort((a, b) => a.dices - b.dices);
            if (targetClusters.length === 0) {
                cluster = compClusters.shift();
                continue;
            }
            let target = targetClusters[0];
            await this.attack(cluster, target).then(otherPlayerId => {
                if (otherPlayerId !== undefined) {
                    cluster = target;
                    this.afterSuccessfulAttack(clusters, getPlayer(otherPlayerId));
                } else cluster = compClusters.shift();
            });
        }
        cb();
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