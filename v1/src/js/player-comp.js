import {TIMEOUT_BG, TIMEOUT_SM} from "./info.js"
import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";

export class Comp extends Player {

    constructor() {
        super();
    }

    async move(clusters, players, cb) {
        super.move();
        let mighty = this.mightiestOther(clusters, players);
        let compClusters = clusters.filter(c => c.playerId === this.id && c.dices > 1)
            .sort((a, b) => b.dices - a.dices);
        let cluster = compClusters.shift();
        while (cluster !== undefined) {
            let targets = cluster.getAdjacentClustersFromCluster().filter(c => c.playerId !== this.id);
            if (mighty !== undefined) targets = targets.filter(c => c.playerId === mighty.id);
            targets = targets.filter(c => cluster.dices > c.dices - (cluster.dices === 8))
                .sort((a, b) => a.dices - b.dices);
            if (targets.length === 0) {
                cluster = compClusters.shift();
                continue;
            }
            let target = targets[0];
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

    mightiestOther(clusters, players) {
        let _players = players.map(p => {
            return {id: p.id, dices: p.dices + p.additionalDices, clusters: 0, obj: p}
        });
        let dices = 0;
        for (let cluster of clusters) {
            dices += cluster.dices;
            _players.find(p => p.id === cluster.playerId).clusters++;
        }
        let mighty = _players.find(p => p.dices > dices / 2 || p.clusters > clusters.length / 2);
        if (mighty !== undefined && mighty.id !== this.id) return mighty.obj;
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