import {Player} from "./player.js";
import {drawCluster, drawDices} from "./draw.js";
import Stats from "./stats.js";

export class Human extends Player {

    constructor(id) {
        super(id);
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
            console.log(`attacks ${target.playerId}: ${this.clickedCluster.id} vs ${target.id} -> thrown dices: ${sumPlayer} vs ${sumOther}`);
            let dicesPlayerBefore = this.clickedCluster.dices;
            this.clickedCluster.dices = 1;
            let i = this.clickableClusters.findIndex(c => c.id === this.clickedCluster.id);
            this.clickableClusters.splice(i, 1);
            drawCluster(this.clickedCluster.corners, this.id);
            drawDices(this.clickedCluster);
            if (sumPlayer > sumOther) {
                Stats.set.successfulAttacks();
                let otherPlayerId = target.playerId;
                target.playerId = this.id;
                target.dices = dicesPlayerBefore - 1;
                drawCluster(target.corners, this.id);
                drawDices(target);
                this.clickedCluster = undefined;
                if (target.dices > 1 && target.adjacentClustersFromCluster().some(c => c.playerId !== this.id))
                    this.clickableClusters.push(target);
                return otherPlayerId;
            }
            Stats.set.unsuccessfulAttacks()
            this.clickedCluster = undefined;
        }
    }
}