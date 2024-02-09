import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";

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
            console.log(`selected=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`);
            drawCluster(this.clickedCluster.corners);
        } else if (this.clickedCluster.containsPoint(point)) {
            // console.log(`undo=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`);
            drawCluster(this.clickedCluster.corners, this.id);
            this.clickedCluster = undefined;
        } else {
            let candidates = this.clickedCluster.adjacentClustersFromCluster().filter(c => c.playerId !== this.id);
            let target = candidates.find(c => c.containsPoint(point));
            if (target === undefined) return;
            let sumPlayer = Player.roleDice(this.clickedCluster.dices);
            let sumOther = Player.roleDice(target.dices);
            console.log(`attacks ${target.playerId} -> thrown dices: ${sumPlayer} vs ${sumOther}`);
            let dicesPlayerBefore = this.clickedCluster.dices;
            this.clickedCluster.dices = 1;
            drawCluster(this.clickedCluster.corners, this.id);
            drawDices(this.clickedCluster);
            if (sumPlayer > sumOther) {
                let otherPlayerId = target.playerId;
                target.playerId = this.id;
                target.dices = dicesPlayerBefore - 1;
                drawCluster(target.corners, this.id);
                drawDices(target);
                this.clickedCluster = undefined;
                return otherPlayerId;
            }
            this.clickedCluster = undefined;
        }
    }
}