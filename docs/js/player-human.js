import{Player}from"./player.js";import{drawCluster,drawDices}from"./draw.js";class Human extends Player{constructor(){super(),this.clickableClusters=void 0,this.clickedCluster=void 0}click(i){if(void 0===this.clickedCluster){var e=this.clickableClusters.find(e=>e.containsPoint(i));void 0!==e&&(this.clickedCluster=e,console.log(`selected=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`),drawCluster(this.clickedCluster.corners))}else if(this.clickedCluster.containsPoint(i))drawCluster(this.clickedCluster.corners,this.id),this.clickedCluster=void 0;else{e=this.clickedCluster.adjacentClustersFromCluster().filter(e=>e.playerId!==this.id).find(e=>e.containsPoint(i));if(void 0!==e){var s=Player.roleDice(this.clickedCluster.dices),t=Player.roleDice(e.dices),c=(console.log(`attacks ${e.playerId}: ${this.clickedCluster.id} vs ${e.id} -> thrown dices: ${s} vs `+t),this.clickedCluster.dices);if(this.clickedCluster.dices=1,drawCluster(this.clickedCluster.corners,this.id),drawDices(this.clickedCluster),t<s)return t=e.playerId,e.playerId=this.id,e.dices=c-1,drawCluster(e.corners,this.id),drawDices(e),this.clickedCluster=void 0,t;this.clickedCluster=void 0}}}}export{Human};