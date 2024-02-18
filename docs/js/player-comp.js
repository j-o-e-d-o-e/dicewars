import{TIMEOUT_BG,TIMEOUT_SM}from"./info.js";import{Player}from"./player.js";import{drawCluster,drawDices}from"./draw.js";class Comp extends Player{constructor(){super()}async turn(r,t,e,s){super.turn();let i=this.path(r);for(;i;){let e=i.shift();for(var a of i.slice(0,-1)){var l=await this.attack(e,a);if(void 0===l||this.afterSuccessfulMove(r,t,l))break;e=a}i=this.path(r)}var d=r.filter(e=>e.playerId===this.id&&1<e.dices).sort((e,r)=>r.dices-e.dices);let o=d.shift();for(;o;){var c=this.mightyOther(r,t),c=this.target(o,c);if(c){var h=await this.attack(o,c);if(void 0!==h){if(this.afterSuccessfulMove(r,t,h))return void await s(!1);o=c}else o=d.shift()}else o=d.shift()}e()}attack(a,l){return new Promise(t=>{let s=Player.roleDice(a.dices),i=Player.roleDice(l.dices);console.log(`attacks ${l.playerId}: ${a.id} vs ${l.id} -> thrown dices: ${s} vs `+i),drawCluster(a.corners),setTimeout(()=>{drawCluster(l.corners),setTimeout(()=>{var e,r=a.dices;a.dices=1,drawDices(a),drawCluster(a.corners,this.id),s>i?(e=l.playerId,l.playerId=this.id,l.dices=r-1,drawDices(l),drawCluster(l.corners,this.id),t(e)):(drawCluster(l.corners,l.playerId),t(void 0))},TIMEOUT_BG)},TIMEOUT_SM)})}mightyOther(e,r){let t=Math.floor(e.length/3);e=r.filter(e=>e.id!==this.id&&e.dices>t);if(0<e.length)return e.reduce((e,r)=>!e||r.dices>e.dices?r:e)}target(r,t){let e=r.adjacentClustersFromCluster().filter(e=>e.playerId!==this.id);var s,i=(e=(e=t?e.filter(e=>e.playerId===t.id):e).filter(e=>r.dices>e.dices-(8===r.dices))).reduce((e,r)=>((e[r.dices]=e[r.dices]||[]).push(r),e),{}),a=[...Array(r.dices-1).keys()].reverse();a[a.length-1]=r.dices-1,8===r.dices&&a.push(8);for(s of a)if(s in i)return i[s][Math.floor(Math.random()*i[s].length)]}path(e){let r=[];for(var t of e.filter(e=>e.playerId===this.id))r.flat().includes(t)||r.push(t.region());let s;for(var[i,a]of(r=r.map(e=>e.filter(e=>e.adjacentClustersFromCluster().some(e=>e.playerId!==this.id)))).entries())for(var l of a)for(var[d,o]of r.entries())if(a!==o)for(var c of o){var h,f,c=l.path(c);c&&(!s||(h=a.length+o.length,(f=r[s.from].length+r[s.to].length)<h)||h===f&&c.length<s.path.length)&&(s={from:i,to:d,path:c})}return s?.path}}export{Comp};