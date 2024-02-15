import{Human}from"./player-human.js";import{drawRemovePlayer,drawDicesNums}from"./draw.js";class Player{static count=0;constructor(){this.id=Player.count++,this.dices=0,this.additionalDices=0}static roleDice(e){let s=0;for(let i=0;i<e;i++)s+=Math.floor(6*Math.random())+1;return s}turn(){console.log(`${this instanceof Human?"Human":"Comp"}'s turn (id: ${this.id})...`)}afterSuccessfulMove(i,e,s){this.setDices(i),drawDicesNums(this);let t=e.find(i=>i.id===s);if(t.setDices(i),!i.some(i=>i.playerId===t.id))return[i]=e.splice(e.findIndex(i=>i.id===t.id),1),drawRemovePlayer(i.id),console.log(`Deleted player (id: ${i.id}).`),i instanceof Human?(console.log(`Human player (id: ${i.id}) has lost.`),!0):1===e.length?(console.log(`${this instanceof Human?"Human":"Comp"} player (id: ${this.id}) has won.`),!0):void 0;drawDicesNums(t)}allocateNewDices(i){var e=i.filter(i=>i.playerId===this.id&&i.dices<8);let s=this.dices;for(;0<s&&0<e.length;){var t=Math.floor(Math.random()*e.length);e[t].dices++,8===e[t].dices&&e.splice(t,1),0<this.additionalDices?this.additionalDices--:s--}0<s&&(this.additionalDices+=s,this.additionalDices>2*i.length)&&(this.additionalDices=2*i.length)}setDices(i){this.dices=0;for(var e of i.filter(i=>i.playerId===this.id)){e=e.region().length;e>this.dices&&(this.dices=e)}}}export{Player};