import {TIMEOUT} from "./info.js"
import {Player} from "./player.js";
import {drawUpdatedCluster, drawUpdatedDices} from "./draw.js";

export class Comp extends Player {

    constructor() {
        super();
    }

    async move(clusters, cb) {
        super.move();
        let compClusters = clusters.filter(c => c.playerId === this.id && c.dices > 1)
            .sort((a, b) => b.dices - a.dices);
        // console.log(this.clusters.map(c => [c.id, c.dices]));
        let attacks = 0;
        for (let cluster of compClusters) {
            let targetClusters = cluster.getAdjacentClustersFromCluster()
                .filter(c => c.playerId !== this.id && c.dices + 2 < cluster.dices)
                .sort((a, b) => a.dices - b.dices);
            if (targetClusters.length === 0) continue;
            // console.log(targetClusters.map(c => [c.id, c.dices]));
            let target = targetClusters[0];
            attacks++;
            await this.attack(cluster, target);
        }
        console.log(`attacks: ${attacks}/${compClusters.length}`);
        cb();
    }

    attack(cluster, target) {
        return new Promise(resolve => {
            let sumComp = Player.roleDice(cluster.dices);
            let sumOther = Player.roleDice(target.dices);
            console.log(`${cluster.id} attacks ${target.id} -> thrown dices: ${sumComp} vs ${sumOther}`);
            setTimeout(() => {
                let dicesCompBefore = cluster.dices;
                cluster.dices = 1;
                drawUpdatedDices(cluster);
                if (sumComp > sumOther) {
                    target.playerId = this.id;
                    target.dices = dicesCompBefore - 1;
                    drawUpdatedDices(target);
                    drawUpdatedCluster(target.corners, this.id);
                }
                resolve()
            }, TIMEOUT*5);
        });
    }
}