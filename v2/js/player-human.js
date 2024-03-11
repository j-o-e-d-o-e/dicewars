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
    if (this.clickedCluster === undefined) this.selectCluster(point);
    else if (this.clickedCluster.containsPoint(point)) this.undoSelection();
    else return this.selectTarget(point);
  }

  selectCluster(point) {
    let clicked = this.clickableClusters.find(c => c.containsPoint(point));
    if (clicked === undefined) return;
    this.clickedCluster = clicked;
    drawCluster(this.clickedCluster.corners);
    console.log(`selected=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`);
  }

  undoSelection() {
    drawCluster(this.clickedCluster.corners, this.id);
    this.clickedCluster = undefined;
    // console.log(`undo=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`);
  }

  selectTarget(point) {
    let candidates = this.clickedCluster.adjacentClustersFromCluster().filter(c => c.playerId !== this.id);
    let target = candidates.find(c => c.containsPoint(point));
    if (target === undefined) return;
    return this.attack(target);
  }

  attack(target) {
    let {sumPlayer, sumOther} = super.attacking(this.clickedCluster, target);
    let dicesPlayerBefore = this.clickedCluster.dices;
    this.clickedCluster.dices = 1;
    drawCluster(this.clickedCluster.corners, this.id);
    drawDices(this.clickedCluster);
    if (sumPlayer > sumOther) {
      Stats.set.successfulAttacks();
      this.clickedCluster = undefined;
      return super.successfulAttack(dicesPlayerBefore, target);
    } else {
      Stats.set.unsuccessfulAttacks()
      let i = this.clickableClusters.findIndex(c => c.id === this.clickedCluster.id);
      this.clickableClusters.splice(i, 1);
      this.clickedCluster = undefined;
    }
  }

  setClickables(clusters) {
    this.clickableClusters = clusters.filter(c => c.playerId === this.id && c.dices > 1
      && c.adjacentClustersFromCluster().some(c => c.playerId !== this.id));
  }
}
