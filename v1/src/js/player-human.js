import {Player} from "./player.js";
import {drawUpdatedCluster, drawUpdatedDices} from "./draw.js";

export class Human extends Player {

    constructor() {
        super();
        this.clickableClusters = undefined;
        this.clickedCluster = undefined;
    }

    click(point) {
        if (this.clickedCluster === undefined) {
            let clicked = this.clickableClusters.find(c => c.containsPoint(point));
            if (clicked === undefined) return;
            this.clickedCluster = clicked;
            console.log(`selected=${this.clickedCluster.id}`);
            drawUpdatedCluster(this.clickedCluster.corners);
        } else if (this.clickedCluster.containsPoint(point)) {
            console.log(`undo=${this.clickedCluster.id}`);
            drawUpdatedCluster(this.clickedCluster.corners, this.id);
            this.clickedCluster = undefined;
        } else {
            let candidates = this.clickedCluster.getAdjacentClustersFromCluster().filter(c => c.playerId !== this.id);
            let clickedCluster2 = candidates.find(c => c.containsPoint(point));
            if (clickedCluster2 === undefined) return;
            let sumPlayer = Player.roleDice(this.clickedCluster.dices);
            let sumOther = Player.roleDice(clickedCluster2.dices);
            console.log(`attack=${clickedCluster2.id} -> thrown dices: ${sumPlayer} vs ${sumOther}`);
            let dicesPlayerBefore = this.clickedCluster.dices;
            this.clickedCluster.dices = 1;
            drawUpdatedCluster(this.clickedCluster.corners, this.id);
            drawUpdatedDices(this.clickedCluster);
            if (sumPlayer > sumOther) {
                let otherPlayerId = clickedCluster2.playerId;
                clickedCluster2.playerId = this.id;
                clickedCluster2.dices = dicesPlayerBefore - 1;
                drawUpdatedCluster(clickedCluster2.corners, this.id);
                drawUpdatedDices(clickedCluster2);
                this.clickedCluster = undefined;
                return otherPlayerId;
            }
            this.clickedCluster = undefined;
        }
    }
}