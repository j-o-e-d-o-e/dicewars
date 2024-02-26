(()=>{"use strict";const e=1280,t=745,i=20,s=32,r=600,l=60;let o=7;function n(e){o=e}class d{constructor(e,t,i,s){this.id=e,this.row=t,this.col=i,this.hex=s,this.cluster=void 0}addNeighbours(e,t,i){0!==this.row&&this.col!==i&&(this.upRight=e[this.id-i]),0===this.row||0===this.col&&this.row%2==0||(this.upLeft=e[this.id-i-1]),0!==this.col&&(this.left=e[this.id-1]),this.row===t||0===this.col&&this.row%2==0||(this.downLeft=e[this.id+i]),this.row!==t&&this.col!==i&&(this.downRight=e[this.id+i+1]),this.col===i||this.col===i-1&&this.row%2!=0||(this.right=e[this.id+1])}adjacentNodesFromNode(){return[this.upRight,this.upLeft,this.left,this.downLeft,this.downRight,this.right].filter((e=>void 0!==e))}}const c=i*Math.sqrt(3);function a(e,t){let s={center:{x:e,y:t},corners:[]};for(let r=0;r<6;r++){let l=Math.PI/180*(60*r-30);s.corners.push({x:e+i*Math.cos(l),y:t+i*Math.sin(l)})}return s}class h{constructor(e,t,i){this.id=e,this.playerId=i?i.playerId:void 0,this.dices=i?i.dices:Math.floor(6*Math.random())+1,this.nodes=[],this.addNodeAndItsNeighbours(t),i||this.expand(),this.corners=this.cornersPos(),this.center=this.centerPos(),this.adjacentClusters=void 0}addNodeAndItsNeighbours(e){e.cluster=this,this.nodes.push(e),e.adjacentNodesFromNode().filter((e=>void 0===e.cluster)).forEach((e=>{e.cluster=this,this.nodes.push(e)}))}expand(){for(;this.nodes.length<10;){let e=this.adjacentNodesFromCluster().filter((e=>void 0===e.cluster));if(0===e.length)break;let t=e[Math.floor(Math.random()*(e.length-1))];this.addNodeAndItsNeighbours(t)}}cornersPos(){let e=[];for(let t of this.nodes)for(let[i,s]of["upRight","upLeft","left","downLeft","downRight","right"].entries())if(void 0===t[s]||t[s]?.cluster?.id!==this.id){let s=5-i,r=5===s?0:s+1;e.push({start:{x:t.hex.corners[r].x,y:t.hex.corners[r].y},end:{x:t.hex.corners[s].x,y:t.hex.corners[s].y}})}e.sort(((e,t)=>e.start.x-t.start.x));let t=e.shift(),i=[t];for(;0!==e.length;)for(let s=0;s<e.length;s++){let r=e[s];if(Math.sqrt((t.end.x-r.start.x)**2+(t.end.y-r.start.y)**2)<2){t=r,e.splice(s,1),i.push(t);break}}return i.map((e=>({x:Math.floor(e.start.x),y:e.start.y})))}centerPos(){let e,t=[...this.corners,this.corners[0]],i=0,s=0,r=0;for(let l=0,o=t.length-1;l<t.length;o=l++){let n=t[l],d=t[o];e=n.x*d.y-d.x*n.y,i+=e,s+=(n.x+d.x)*e,r+=(n.y+d.y)*e}return e=3*i,{x:Math.floor(s/e),y:Math.floor(r/e)}}adjacentNodesFromCluster(){return Array.from(new Set(this.nodes.flatMap((e=>e.adjacentNodesFromNode())).filter((e=>!this.nodes.includes(e)))))}neighbours(){this.adjacentClusters=[...new Set(this.adjacentNodesFromCluster().filter((e=>void 0!==e.cluster)).map((e=>e.cluster)))]}adjacentClustersFromCluster(){return this.adjacentClusters}containsPoint(e){let t=this.corners,i=!1;for(let s=0,r=t.length-1;s<t.length;s++)t[s].y>e.y!=t[r].y>e.y&&e.x<(t[r].x-t[s].x)*(e.y-t[s].y)/(t[r].y-t[s].y)+t[s].x&&(i=!i),r=s;return i}region(){let e=[this],t=this.adjacentClustersFromCluster().filter((e=>e.playerId===this.playerId));for(;t.length>0;)e=e.concat(t),t=[...new Set(t.flatMap((t=>t.adjacentClustersFromCluster().filter((t=>!e.includes(t)&&t.playerId===this.playerId)))))];return e}path(e){let t,i=[this],r=Array(s).fill(!1);r[this.id]=!0;let l=Array(s),o=Array(s);for(o[this.id]=0;i.length>0;){let s=i.shift(),n=s.adjacentClustersFromCluster();for(let d of n){let n=this.dices-o[s.id];if(!(d.id!==e.id&&d.playerId===this.playerId||d.playerId!==e.playerId&&d.dices-(8===n)>=n||r[d.id]))if(l[d.id]=s,o[d.id]=o[s.id]+1,d.id!==e.id)r[d.id]=!0,i.push(d);else{let i=e,s=l[i.id],r=[i];for(;s;)r.push(s),i=s,s=l[i.id];if(r.reverse(),t){let e=Math.min(...r.slice(1,-1).map(((e,t)=>this.dices-t-e.dices))),i=Math.min(...t.slice(1,-1).map(((e,t)=>this.dices-t-e.dices)));(e>i||e===i&&r.length<t.length)&&(t=r)}else t=r}}}return t}}const u=3;let f,m,g;function y(e){let t=e.adjacentNodesFromCluster().filter((e=>void 0===e.cluster&&e.adjacentNodesFromNode().filter((e=>void 0===e.cluster)).length>=u));return 0===t.length?(f--,void(++g>=f&&(g=0))):t[Math.floor(Math.random()*t.length)]}function p(){let e=m+g+++1;return g===f&&(g=0),e}const k=[{color:"#B37FFE",img:void 0},{color:"#B3FF01",img:void 0},{color:"#009302",img:void 0},{color:"#FF7FFE",img:void 0},{color:"#FF7F01",img:void 0},{color:"#B3FFFE",img:void 0},{color:"#FFFF01",img:void 0},{color:"#FF5858",img:void 0}],v=9,C="background-color:rgba(255, 165, 0, 0.5)";let I,x,w,M=[];function b(e,t){void 0===t?F(e,"red",v-1,"rgba(255, 255, 255, 0.8)"):F(e,"black",v,k[t].color)}function F(e,t,i,s){x.beginPath();for(let t of e)x.lineTo(t.x,t.y);x.closePath(),x.strokeStyle=t,x.lineWidth=i,x.stroke(),x.fillStyle=s,x.fill()}function E(e,t){let i=M[e.id];void 0===t&&i.clearRect(e.center.x-30,e.center.y-80,80,120),$(i,e,{startI:t}).then((()=>{}))}async function $(e,t,{timeout:i=l,startI:s=0}={}){let r=t.center.x-30,o=t.center.y-20;for(let l=0;l<t.dices;l++)4===l&&(r+=16,o+=8),l<s||await new Promise((s=>{setTimeout((()=>{e.drawImage(k[t.playerId].img,r,o-l%4*20),s()}),i)}))}function N(e){w.children.namedItem(e.id).children[0].children[1].innerHTML=e.dices,e.additionalDices>0?w.children.namedItem(e.id).children[1].innerHTML=`+${e.additionalDices}`:w.children.namedItem(e.id).children[1].innerHTML=""}class D{constructor(e){this.id=e,this.dices=0,this.additionalDices=0}static roleDice(e){let t=0;for(let i=0;i<e;i++)t+=Math.floor(6*Math.random())+1;return t}turn(){console.log(`${this instanceof P?"Human":"Comp"}'s turn (id: ${this.id})...`)}afterSuccessfulMove(e,t,i){this.setDices(e),N(this);let s=t.find((e=>e.id===i));if(s.setDices(e),e.some((e=>e.playerId===s.id)))N(s);else{let[e]=t.splice(t.findIndex((e=>e.id===s.id)),1);if(r=e.id,w.removeChild(w.children.namedItem(r)),console.log(`Deleted player (id: ${e.id}).`),e instanceof P)return console.log(`Human player (id: ${e.id}) has lost.`),!0;if(1===t.length)return console.log(`${this instanceof P?"Human":"Comp"} player (id: ${this.id}) has won.`),!0}var r}allocateNewDices(e){let t=e.filter((e=>e.playerId===this.id&&e.dices<8)),i=this.dices;for(;i>0&&t.length>0;){let e=Math.floor(Math.random()*t.length);t[e].dices++,8===t[e].dices&&t.splice(e,1),this.additionalDices>0?this.additionalDices--:i--}i>0&&(this.additionalDices+=i,this.additionalDices>2*e.length&&(this.additionalDices=2*e.length))}setDices(e){this.dices=0;for(let t of e.filter((e=>e.playerId===this.id))){let e=t.region().length;e>this.dices&&(this.dices=e)}}}const A={startTime:void 0,rounds:0,successfulAttacks:0,unsuccessfulAttacks:0},j={get:{time(){let e=new Date-A.startTime,t=Math.floor(e/6e4),i=(e%6e4/1e3).toFixed(0);return"Time played: "+t+":"+(i<10?"0":"")+i},rounds:()=>`Rounds: ${A.rounds}`,successRate(){let e=A.successfulAttacks+A.unsuccessfulAttacks;return`Success rate: ${0===e?0:Math.round(A.successfulAttacks/e*100)}%`}},set:{rounds(){A.rounds++},successfulAttacks(){A.successfulAttacks++},unsuccessfulAttacks(){A.unsuccessfulAttacks++}},reset(){A.startTime=new Date,A.rounds=0,A.successfulAttacks=0,A.unsuccessfulAttacks=0}};class P extends D{constructor(e){super(e),this.clickableClusters=void 0,this.clickedCluster=void 0}click(e){if(void 0===this.clickedCluster){let t=this.clickableClusters.find((t=>t.containsPoint(e)));if(void 0===t)return;this.clickedCluster=t,console.log(`selected=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`),b(this.clickedCluster.corners)}else if(this.clickedCluster.containsPoint(e))b(this.clickedCluster.corners,this.id),this.clickedCluster=void 0;else{let t=this.clickedCluster.adjacentClustersFromCluster().filter((e=>e.playerId!==this.id)).find((t=>t.containsPoint(e)));if(void 0===t)return;let i=D.roleDice(this.clickedCluster.dices),s=D.roleDice(t.dices);console.log(`attacks ${t.playerId}: ${this.clickedCluster.id} vs ${t.id} -> thrown dices: ${i} vs ${s}`);let r=this.clickedCluster.dices;if(this.clickedCluster.dices=1,b(this.clickedCluster.corners,this.id),E(this.clickedCluster),i>s){j.set.successfulAttacks();let e=t.playerId;return t.playerId=this.id,t.dices=r-1,b(t.corners,this.id),E(t),this.clickedCluster=void 0,e}j.set.unsuccessfulAttacks();let l=this.clickableClusters.findIndex((e=>e.id===this.clickedCluster.id));this.clickableClusters.splice(l,1),this.clickedCluster=void 0}}setClickables(e){this.clickableClusters=e.filter((e=>e.playerId===this.id&&e.dices>1&&e.adjacentClustersFromCluster().some((e=>e.playerId!==this.id))))}}class B extends D{static thresholdMighty;static thresholdVeryMighty;static thresholds(e){B.thresholdMighty=Math.ceil(e.length/3),B.thresholdVeryMighty=Math.ceil(e.length/2)}constructor(e){super(e)}async turn(e,t,i,s){super.turn();let r=this.path(e),l=this.mightyOthers(e,t);for(;r&&(0===l.length||l[0].dices<=B.thresholdVeryMighty||r.slice(1,-1).every((e=>e.playerId===l[0].id)));){let i=r.shift();for(let l of r.slice(0,-1)){let r=await this.attack(i,l);if(void 0===r)break;if(this.afterSuccessfulMove(e,t,r))return void await s(!1);i=l}r=this.path(e),l=this.mightyOthers(e,t)}let o=e.filter((e=>e.playerId===this.id&&e.dices>1)).sort(((e,t)=>t.dices-e.dices)),n=o.shift();for(;n;){l=this.dices>B.thresholdMighty?[]:this.mightyOthers(e,t);let i=this.target(n,l);if(!i){n=o.shift();continue}let r=await this.attack(n,i);if(void 0===r)n=o.shift();else{if(this.afterSuccessfulMove(e,t,r))return void await s(!1);n=i.dices>1?i:o.shift()}}i()}attack(e,t){return new Promise((i=>{let s=D.roleDice(e.dices),o=D.roleDice(t.dices);console.log(`attacks ${t.playerId}: ${e.id} vs ${t.id} -> thrown dices: ${s} vs ${o}`),b(e.corners),setTimeout((()=>{b(t.corners),setTimeout((()=>{let r=e.dices;if(e.dices=1,E(e),b(e.corners,this.id),s>o){let e=t.playerId;t.playerId=this.id,t.dices=r-1,E(t),b(t.corners,this.id),i(e)}else b(t.corners,t.playerId),i(void 0)}),r)}),l)}))}mightyOthers(e,t){return t.filter((e=>e.id!==this.id&&e.dices>B.thresholdMighty)).sort(((e,t)=>t.dices-e.dices))}target(e,t){let i=e.adjacentClustersFromCluster().filter((e=>e.playerId!==this.id));if(0===i.length)return;if(t.length>0){let e;for(let s of t)if(e=i.filter((e=>e.playerId===s.id)),e.length>0)break;i=e}if(i=i.filter((t=>e.dices>t.dices-(8===e.dices))),0===i.length)return;let s=i.reduce(((e,t)=>((e[t.dices]=e[t.dices]||[]).push(t),e)),{}),r=[...Array(e.dices-1).keys()].reverse();r[r.length-1]=e.dices-1,8===e.dices&&r.push(8);for(let e of r)if(e in s)return s[e][Math.floor(Math.random()*s[e].length)]}path(e){let t,i=[];for(let t of e.filter((e=>e.playerId===this.id)))i.flat().includes(t)||i.push(t.region());i=i.map((e=>e.filter((e=>e.adjacentClustersFromCluster().some((e=>e.playerId!==this.id))))));for(let[e,s]of i.entries())for(let r of s)for(let[l,o]of i.entries())if(s!==o)for(let n of o){let d=r.path(n);if(d)if(t){let r=s.length+o.length,n=i[t.from].length+i[t.to].length;(r>n||r===n&&d.length<t.path.length)&&(t={from:e,to:l,path:d})}else t={from:e,to:l,path:d}}return t?.path}}const[L,T]=function(){let s=[],r=0,l=0,o=0;for(let n=60,h=0;n+i<=t;n+=30,h++){o=0;for(let t=c+(h%2==0?0:19);t+i<=e;t+=c){let e=a(t,n);s.push(new d(r++,l,o,e)),o++}l++}for(let e of s)e.addNeighbours(s,l-1,o-1);return[s,s[Math.floor(r/2)]]}();let R,S,H,O,V=!0,Y=0;function q(i){S=function(e){[f,m,g]=[4,0,0];let t=0,i=[new h(t++,e)];for(;i.length<=f;){let e=y(i[0]);void 0!==e&&i.push(new h(t++,e))}for(;i.length<s&&f>=0;){let e=y(i[p()]);void 0!==e&&(i.push(new h(t++,e)),(i.length-1)%f==0&&(m+=f))}for(let e of i)e.neighbours();i.sort(((e,t)=>e.center.y-t.center.y));for(let[e,t]of i.entries()){t.id=e;for(let e of t.nodes)e.cluster=void 0;delete t.nodes}return function(e,t){let i,s;for(let t of e)(!i||t.center.x<i.x)&&(i=t.center),(!s||t.center.x>s.x)&&(s=t.center);let r=t.hex.center.x-i.x,l=s.x-t.hex.center.x,o=Math.floor(r>l?(r-l)/2:-(l-r)/2);for(let t of e){t.center.x+=o;for(let e of t.corners)e.x+=o}}(i,e),function(e){console.log(`${e.length} clusters created with ${e.reduce(((e,t)=>e+t.dices),0)} dices`)}(i),i}(T),[H,O]=function(e){B.thresholds(e);let t,i=[],s=.3;for(let e=0;e<o;e++)void 0===t&&i.length>0&&(Math.random()<s||e===o-1)?(i.push(new P(e)),t=e):(i.push(new B(e)),s+=.1);let r=0;for(let t of e)t.playerId=i[r++].id,r>=o&&(r=0);for(let t of i)t.setDices(e);let l=i[t];return l.clickableClusters=e.filter((e=>e.playerId===l.id&&e.dices>1)),function(e,t){console.log(`${e.length} players created:\n    ${e.map((e=>`- ${e instanceof P?"Human":"Comp"} with ${JSON.stringify({dices:e.dices,clusters:t.reduce(((t,i)=>i.playerId===e.id?++t:t),0),allDices:t.reduce(((t,i)=>i.playerId===e.id?t+i.dices:t),0)})}`)).join("\n\t")}`)}(i,e),[i,l]}(S),function(e,t){I&&(t=I);let i=k[e];k[e]=k[t],k[t]=i,I=e}(O.id,i),function(i,s,r){!function(i){x.clearRect(0,0,e,t);for(let i of M)i.clearRect(0,0,e,t);const s=document.getElementsByClassName("dices-player");for(;s.length>0;)s[0].parentNode.removeChild(s[0]);w=document.getElementById("dices-bar");for(let e of i){let t=document.createElement("div");t.className="dices-player",t.id=e.id;let i=document.createElement("div"),s=document.createElement("img");s.src=k[e.id].img.src;let r=document.createElement("span");r.innerHTML=e.dices;let l=document.createElement("p");i.append(s,r),t.append(i,l),w.appendChild(t)}w.children[0].style=C}(r),function(e){for(let t of e)F(t.corners,"black",v,k[t.playerId].color),$(M[t.id],t)}(s)}(0,S,H)}function J(e){e===O&&([V,R.disabled]=[!1,!1],O.setClickables(S),j.set.rounds()),e.turn(S,H,(async()=>await W(e)),X)}function W(e){return new Promise((t=>{setTimeout((()=>{let i=S.map((e=>e.dices));e.allocateNewDices(S);for(let[t,s]of S.entries())s.playerId===e.id&&s.dices!==i[t]&&E(s,i[t]);N(e),++Y>=H.length&&(Y=0);let s=H[Y];setTimeout((()=>{var i,r;i=e.id,r=s.id,w.children.namedItem(i).style="background-color:none",w.children.namedItem(r).style=C,console.log("...finished."),t(s)}),s.id!==O.id?r:0)}),e.id!==O.id?r:0)})).then((e=>J(e)))}function X(e){return new Promise((t=>{V=!0,R.disabled=!0,setTimeout((()=>{z(["main","end"]),document.getElementById("h-end").textContent=e?"You won!":"You lost.";for(let e in j.get)document.getElementById(`li-end-${e}`).textContent=j.get[e]();t()}),r)}))}function z(e){for(let t of e)document.getElementById(t).classList.toggle("hidden")}(async function(){let e=[];for(let t=0;t<k.length;t++)e.push(new Promise((e=>{let i=new Image;i.onload=()=>{k[t].img=i,e()},i.src=`img/cube-${t+1}.svg`})));await Promise.all(e)})().then((()=>{!function(){document.getElementById("btn-launch").addEventListener("click",(()=>{let e=document.forms["form-players"].getElementsByTagName("input");for(let t of e)if(t.checked){n(t.value);break}let t=document.forms["form-colors"].getElementsByTagName("input");for(let e of t)if(e.checked){q(e.value);break}z(["launch","main","main-play"])})),z(["main"]),document.getElementById("btn-yes").addEventListener("click",(()=>{z(["main-before","main-play"]),Y=0,j.reset(),J(H[0])})),document.getElementById("btn-no").addEventListener("click",(()=>q())),R=document.getElementById("btn-turn"),R.addEventListener("click",(async()=>{V=!0,R.disabled=!0,void 0!==O.clickedCluster&&b(O.clickedCluster.corners,O.id),await W(O)})),R.disabled=!0;let i,r=document.getElementById("stage");for(let o=0;o<=s;o++)i=document.createElement("canvas"),i.width=e,i.height=t,r.appendChild(i),0===o?x=i.getContext("2d"):(l=i,M.push(l.getContext("2d")));var l;i.addEventListener("click",(async e=>{if(e.stopPropagation(),V)return;let t=i.getBoundingClientRect(),s=O.click({x:e.clientX-t.left,y:e.clientY-t.top});if(void 0!==s){if(O.afterSuccessfulMove(S,H,s))return void await X(!0);O.setClickables(S)}}),!1),z(["end"]),document.getElementById("btn-restart").addEventListener("click",(()=>{q(),z(["end","main","main-before","main-play"])}))}()}))})();