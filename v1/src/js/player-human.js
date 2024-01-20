import {Player} from "./player.js";
import {getCluster} from './clusters.js'
import {drawUpdatedCluster, drawUpdatedDices} from "./draw.js";

export class Human extends Player {

    constructor() {
        super();
        this.clickableClusters = undefined;
        this.clickedCluster = undefined;
    }

    turn(point, clusters) {
        if (this.clickedCluster === undefined) {
            let clicked = getCluster(this.clickableClusters, point);
            if (clicked === undefined) return;
            this.clickedCluster = clicked;
            console.log(`selected=${this.clickedCluster.id}`);
            drawUpdatedCluster(this.clickedCluster.corners, undefined);
        } else if (this.clickedCluster.containsPoint(point)) {
            console.log(`undo=${this.clickedCluster.id}`);
            drawUpdatedCluster(this.clickedCluster.corners, this.id);
            this.clickedCluster = undefined;
        } else {
            let candidates = this.clickedCluster.getAdjacentClusterIds().map(id => clusters[id]).filter(c => c.playerId !== this.id);
            let clickedCluster2 = getCluster(candidates, point);
            if (clickedCluster2 === undefined) return;
            let sumPlayer = Player.roleDice(this.clickedCluster.dices);
            let sumOther = Player.roleDice(clickedCluster2.dices);
            let dicesPlayerBefore = this.clickedCluster.dices;
            this.clickedCluster.dices = 1;
            console.log(`attack=${clickedCluster2.id}`);
            console.log(`thrown dices: ${sumPlayer} vs ${sumOther}`);
            drawUpdatedCluster(this.clickedCluster.corners, this.id);
            drawUpdatedDices(this.clickedCluster);
            if (sumPlayer > sumOther) {
                clickedCluster2.playerId = this.id;
                clickedCluster2.dices = dicesPlayerBefore - 1;
                this.clickableClusters = clusters.filter(c => c.playerId === this.id && c.dices > 1);
                drawUpdatedCluster(clickedCluster2.corners, this.id);
                drawUpdatedDices(clickedCluster2);
            }
            this.clickedCluster = undefined;
        }
    }
}