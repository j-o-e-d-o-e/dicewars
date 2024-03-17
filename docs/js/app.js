(()=>{"use strict";const e=1280,t=32,s=600,i=60;let r=745,l=20,n=7;function o(e){n=e}class c{constructor(e,t,s,i){this.id=e,this.row=t,this.col=s,this.hex=i,this.cluster=void 0}addNeighbours(e,t,s){0!==this.row&&this.col!==s&&(this.upRight=e[this.id-s]),0===this.row||0===this.col&&this.row%2==0||(this.upLeft=e[this.id-s-1]),0!==this.col&&(this.left=e[this.id-1]),this.row===t||0===this.col&&this.row%2==0||(this.downLeft=e[this.id+s]),this.row!==t&&this.col!==s&&(this.downRight=e[this.id+s+1]),this.col===s||this.col===s-1&&this.row%2!=0||(this.right=e[this.id+1])}adjacentNodesFromNode(){return[this.upRight,this.upLeft,this.left,this.downLeft,this.downRight,this.right].filter((e=>void 0!==e))}}const d=e=>e%2==0?0:l-1,a=(t,s)=>t+l<=e&&s+l<=r;function h(e,t){let s={center:{x:e,y:t},corners:[]};for(let i=0;i<6;i++){let r=Math.PI/180*(60*i-30);s.corners.push({x:e+l*Math.cos(r),y:t+l*Math.sin(r)})}return s}class u{constructor(e,t,s){this.id=e,this.playerId=s?s.playerId:void 0,this.dices=s?s.dices:Math.floor(6*Math.random())+1,this.nodes=[],this.addNodeAndItsNeighbours(t),s||this.expand(),this.corners=this.cornersPos(),this.center=this.centerPos(),this.adjacentClusters=void 0}addNodeAndItsNeighbours(e){e.cluster=this,this.nodes.push(e),e.adjacentNodesFromNode().filter((e=>void 0===e.cluster)).forEach((e=>{e.cluster=this,this.nodes.push(e)}))}expand(){for(;this.nodes.length<10;){let e=this.adjacentNodesFromCluster().filter((e=>void 0===e.cluster));if(0===e.length)break;let t=e[Math.floor(Math.random()*(e.length-1))];this.addNodeAndItsNeighbours(t)}}cornersPos(){let e=[];for(let t of this.nodes)for(let[s,i]of["upRight","upLeft","left","downLeft","downRight","right"].entries())if(void 0===t[i]||t[i]?.cluster?.id!==this.id){let i=5-s,r=5===i?0:i+1;e.push({start:{x:t.hex.corners[r].x,y:t.hex.corners[r].y},end:{x:t.hex.corners[i].x,y:t.hex.corners[i].y}})}e.sort(((e,t)=>e.start.x-t.start.x));let t=e.shift(),s=[t];for(;0!==e.length;)for(let i=0;i<e.length;i++){let r=e[i];if(Math.sqrt((t.end.x-r.start.x)**2+(t.end.y-r.start.y)**2)<2){t=r,e.splice(i,1),s.push(t);break}}return s.map((e=>({x:Math.floor(e.start.x),y:e.start.y})))}centerPos(){let e,t=[...this.corners,this.corners[0]],s=0,i=0,r=0;for(let l=0,n=t.length-1;l<t.length;n=l++){let o=t[l],c=t[n];e=o.x*c.y-c.x*o.y,s+=e,i+=(o.x+c.x)*e,r+=(o.y+c.y)*e}return e=3*s,{x:Math.floor(i/e),y:Math.floor(r/e)}}adjacentNodesFromCluster(){return Array.from(new Set(this.nodes.flatMap((e=>e.adjacentNodesFromNode())).filter((e=>!this.nodes.includes(e)))))}neighbours(){this.adjacentClusters=[...new Set(this.adjacentNodesFromCluster().filter((e=>void 0!==e.cluster)).map((e=>e.cluster)))]}adjacentClustersFromCluster(){return this.adjacentClusters}containsPoint(e){let t=this.corners,s=!1;for(let i=0,r=t.length-1;i<t.length;i++)t[i].y>e.y!=t[r].y>e.y&&e.x<(t[r].x-t[i].x)*(e.y-t[i].y)/(t[r].y-t[i].y)+t[i].x&&(s=!s),r=i;return s}region(){let e=[this],t=this.adjacentClustersFromCluster().filter((e=>e.playerId===this.playerId));for(;t.length>0;)e=e.concat(t),t=[...new Set(t.flatMap((t=>t.adjacentClustersFromCluster().filter((t=>!e.includes(t)&&t.playerId===this.playerId)))))];return e}path(e){let s,i=[this],r=Array(t).fill(!1);r[this.id]=!0;let l=Array(t),n=Array(t);n[this.id]=0;const o=(e,t)=>{let s=[],i=e;for(;i;)s.push(i),i=t[i.id];return s.reverse()},c=(e,t)=>{let s=Math.min(...e.map(((e,t)=>this.dices-t-e.dices))),i=Math.min(...t.map(((e,t)=>this.dices-t-e.dices)));return i>s||i===s&&t.length<e.length?t:e};for(;i.length>0;){let t=i.shift(),d=t.adjacentClustersFromCluster();for(let a of d){let d=this.dices-n[t.id];if(!(a.id!==e.id&&a.playerId===this.playerId||a.playerId!==e.playerId&&a.dices-(8===d)>=d||r[a.id]))if(l[a.id]=t,n[a.id]=n[t.id]+1,a.id!==e.id)r[a.id]=!0,i.push(a);else{let t=o(e,l);s=s?c(s,t):t}}}return s}}const f=3;let m,g,y;function p(e){let t=e.adjacentNodesFromCluster().filter((e=>void 0===e.cluster&&e.adjacentNodesFromNode().filter((e=>void 0===e.cluster)).length>=f));return 0===t.length?(m--,void(++y>=m&&(y=0))):t[Math.floor(Math.random()*t.length)]}function k(){let e=g+y+++1;return y===m&&(y=0),e}const C=[{color:"#B37FFE",img:void 0},{color:"#B3FF01",img:void 0},{color:"#009302",img:void 0},{color:"#FF7FFE",img:void 0},{color:"#FF7F01",img:void 0},{color:"#B3FFFE",img:void 0},{color:"#FFFF01",img:void 0},{color:"#FF5858",img:void 0}],v="background-color:rgba(255, 165, 0, 0.5)";let I,x,w,M,b,F,E,T,A=[];function N(e){A.push(e.getContext("2d"))}function B(e,t){void 0===t?D(e,"red",I-1,"rgba(255, 255, 255, 0.8)"):D(e,"black",I,C[t].color)}function D(e,t,s,i){E.beginPath();for(let t of e)E.lineTo(t.x,t.y);E.closePath(),E.strokeStyle=t,E.lineWidth=s,E.stroke(),E.fillStyle=i,E.fill()}function P(e,t){let s=A[e.id];void 0===t&&s.clearRect(e.center.x-l-5,e.center.y-4*l,3*l,6*l),$(s,e,{startI:t}).then((()=>{}))}async function $(e,t,{timeout:s=i,startI:r=0}={}){let n=t.center.x-x,o=t.center.y-l;e.beginPath();for(let i=0;i<t.dices;i++)4===i&&(n+=w,o+=b),i<r||await new Promise((r=>{setTimeout((()=>{e.drawImage(C[t.playerId].img,n,o-M*(i%4)),r()}),s)}));e.closePath()}function j(e){T.children.namedItem(e.id).children[0].children[1].innerHTML=e.dices,e.additionalDices>0?T.children.namedItem(e.id).children[1].innerHTML=`+${e.additionalDices}`:T.children.namedItem(e.id).children[1].innerHTML=""}class L{constructor(e){this.id=e,this.dices=0,this.additionalDices=0}static roleDice(e){let t=0;for(let s=0;s<e;s++)t+=Math.floor(6*Math.random())+1;return t}turn(){console.log(`${this instanceof O?"Human":"Comp"}'s turn (id: ${this.id})...`)}attacking(e,t){let s=L.roleDice(e.dices),i=L.roleDice(t.dices);return console.log(`attacks ${t.playerId}: ${e.id} vs ${t.id} -> thrown dices: ${s} vs ${i}`),{sumPlayer:s,sumOther:i}}successfulAttack(e,t){let s=t.playerId;return t.playerId=this.id,t.dices=e-1,B(t.corners,this.id),P(t),s}afterSuccessfulAttack(e,t,s){this.setDices(e),j(this);let i=t.find((e=>e.id===s));if(i.setDices(e),!e.some((e=>e.playerId===i.id)))return this.deleteOther(i,t);j(i)}deleteOther(e,t){let[s]=t.splice(t.findIndex((t=>t.id===e.id)),1);var i;return i=s.id,T.removeChild(T.children.namedItem(i)),console.log(`Deleted player (id: ${s.id}).`),s instanceof O?(console.log(`Human player (id: ${s.id}) has lost.`),!0):1===t.length?(console.log(`${this instanceof O?"Human":"Comp"} player (id: ${this.id}) has won.`),!0):void 0}allocateNewDices(e){let t=e.filter((e=>e.playerId===this.id&&e.dices<8)),s=this.dices;for(;s>0&&t.length>0;){let e=Math.floor(Math.random()*t.length);t[e].dices++,8===t[e].dices&&t.splice(e,1),this.additionalDices>0?this.additionalDices--:s--}s>0&&(this.additionalDices+=s,this.additionalDices>2*e.length&&(this.additionalDices=2*e.length))}setDices(e){this.dices=0;for(let t of e.filter((e=>e.playerId===this.id))){let e=t.region().length;e>this.dices&&(this.dices=e)}}}const R={startTime:void 0,rounds:0,successfulAttacks:0,unsuccessfulAttacks:0},S={get:{time(){let e=new Date-R.startTime,t=Math.floor(e/6e4),s=(e%6e4/1e3).toFixed(0);return"Time played: "+t+":"+(s<10?"0":"")+s},rounds:()=>`Rounds: ${R.rounds}`,successRate(){let e=R.successfulAttacks+R.unsuccessfulAttacks;return`Success rate: ${0===e?0:Math.round(R.successfulAttacks/e*100)}%`}},set:{rounds(){R.rounds++},successfulAttacks(){R.successfulAttacks++},unsuccessfulAttacks(){R.unsuccessfulAttacks++}},reset(){R.startTime=new Date,R.rounds=0,R.successfulAttacks=0,R.unsuccessfulAttacks=0}};class O extends L{constructor(e){super(e),this.clickableClusters=void 0,this.clickedCluster=void 0}click(e){if(void 0===this.clickedCluster)this.selectCluster(e);else{if(!this.clickedCluster.containsPoint(e))return this.selectTarget(e);this.undoSelection()}}selectCluster(e){let t=this.clickableClusters.find((t=>t.containsPoint(e)));void 0!==t&&(this.clickedCluster=t,B(this.clickedCluster.corners),console.log(`selected=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`))}undoSelection(){B(this.clickedCluster.corners,this.id),this.clickedCluster=void 0}selectTarget(e){let t=this.clickedCluster.adjacentClustersFromCluster().filter((e=>e.playerId!==this.id)).find((t=>t.containsPoint(e)));if(void 0!==t)return this.attack(t)}attack(e){let{sumPlayer:t,sumOther:s}=super.attacking(this.clickedCluster,e),i=this.clickedCluster.dices;if(this.clickedCluster.dices=1,B(this.clickedCluster.corners,this.id),P(this.clickedCluster),t>s)return S.set.successfulAttacks(),this.clickedCluster=void 0,super.successfulAttack(i,e);{S.set.unsuccessfulAttacks();let e=this.clickableClusters.findIndex((e=>e.id===this.clickedCluster.id));this.clickableClusters.splice(e,1),this.clickedCluster=void 0}}setClickables(e){this.clickableClusters=e.filter((e=>e.playerId===this.id&&e.dices>1&&e.adjacentClustersFromCluster().some((e=>e.playerId!==this.id))))}}class H extends L{static thresholdMighty;static thresholdVeryMighty;static thresholds(e){H.thresholdMighty=Math.ceil(e.length/3),H.thresholdVeryMighty=Math.ceil(e.length/2)}constructor(e,t=!1){super(e),this.cautious=t}async turn(e,t,s,i){super.turn();for(const s of[this.attackByPath,this.attackRandomly])if(await s.call(this,e,t))return void await i(!1);s()}async attackByPath(e,t){let s=this.path(e),i=this.mightyOthers(e,t);for(;s&&(0===i.length||i[0].dices<=H.thresholdVeryMighty||s.slice(1,-1).every((e=>e.playerId===i[0].id)));){let r=s.shift();for(let i of s.slice(0,-1)){let s=await this.attack(r,i);if(void 0===s)break;if(super.afterSuccessfulAttack(e,t,s))return!0;r=i}s=this.path(e),i=this.mightyOthers(e,t)}}async attackRandomly(e,t){let s=e.filter((e=>e.playerId===this.id&&e.dices>1)).sort(((e,t)=>t.dices-e.dices)),i=s.shift();for(;i;){let r=this.dices>H.thresholdMighty?[]:this.mightyOthers(e,t),l=this.target(i,r);if(!l){i=s.shift();continue}let n=await this.attack(i,l);if(void 0===n)i=s.shift();else{if(super.afterSuccessfulAttack(e,t,n))return!0;i=l.dices>1?l:s.shift()}}}attack(e,t){return new Promise((r=>{let{sumPlayer:l,sumOther:n}=super.attacking(e,t);B(e.corners),setTimeout((()=>{B(t.corners),setTimeout((()=>{let s=e.dices;e.dices=1,P(e),B(e.corners,this.id),l>n?r(super.successfulAttack(s,t)):(B(t.corners,t.playerId),r(void 0))}),s)}),i)}))}mightyOthers(e,t){return t.filter((e=>e.id!==this.id&&e.dices>H.thresholdMighty)).sort(((e,t)=>t.dices-e.dices))}filterTargetsByMightyOthers(e,t){let s;for(const i of t)if(s=e.filter((e=>e.playerId===i.id)),s.length>0)break;return s}target(e,t){let s=e.adjacentClustersFromCluster().filter((e=>e.playerId!==this.id));if(0===s.length)return;if(t.length>0&&(s=this.filterTargetsByMightyOthers(s,t)),s=s.filter((t=>e.dices>t.dices-(8===e.dices))),0===s.length)return;let{groupedTargets:i,dices:r}=this.groupTargetsByDices(e,s);return this.cautious&&0===t.length?this.chooseTargetCautiously(i,r,e):this.chooseTargetAggressively(i,r)}groupTargetsByDices(e,t){let s=t.reduce(((e,t)=>((e[t.dices]=e[t.dices]||[]).push(t),e)),{}),i=[...Array(e.dices-1).keys()].reverse();return i[i.length-1]=e.dices-1,8===e.dices&&i.push(8),{groupedTargets:s,dices:i}}chooseTargetAggressively(e,t){for(let s of t)if(s in e)return e[s][Math.floor(Math.random()*e[s].length)]}chooseTargetCautiously(e,t,s){if(!(0===this.additionalDices&&s.dices>2&&s.dices<8&&s.adjacentClusters.some((e=>e.dices-s.dices>2))))for(let i of t){if(!(i in e))continue;let t=[];for(let r of e[i])r.adjacentClustersFromCluster().filter((e=>e.playerId!==this.id)).every((e=>s.dices>=e.dices))&&t.push(r);if(t.length>0)return t[Math.floor(Math.random()*t.length)]}}path(e){let t,s=[];for(let t of e.filter((e=>e.playerId===this.id)))s.flat().includes(t)||s.push(t.region());s=s.map((e=>e.filter((e=>e.adjacentClustersFromCluster().some((e=>e.playerId!==this.id))))));for(let[e,i]of s.entries())for(let r of i)for(let[l,n]of s.entries())if(i!==n)for(let o of n){let c=r.path(o);if(c)if(t){let r=i.length+n.length,o=s[t.from].length+s[t.to].length;(r>o||r===o&&c.length<t.path.length)&&(t={from:e,to:l,path:c})}else t={from:e,to:l,path:c}}return t?.path}}let V,Y,q,J,W,X,z=!0,G=0;function K(){let e=document.forms["form-players"].getElementsByTagName("input");for(let t of e)if(t.checked){o(t.value);break}let t=document.forms["form-colors"].getElementsByTagName("input");for(let e of t)if(e.checked){_(e.value);break}document.getElementById("launch").remove(),ie(["main","main-before"])}function Q(){ie(["main-before","main-play"]),G=0,S.reset(),ee(W[0])}async function U(){z=!0,q.disabled=!0,void 0!==X.clickedCluster&&B(X.clickedCluster.corners,X.id),await te(X)}function Z(){_(),ie(["end","main","main-before"])}function _(s=0){J=function(e){let s=function(e){[m,g,y]=[4,0,0];let s=0,i=[new u(s++,e)];for(;i.length<=m;){let e=p(i[0]);void 0!==e&&i.push(new u(s++,e))}for(;i.length<t&&m>=0;){let e=p(i[k()]);void 0!==e&&(i.push(new u(s++,e)),(i.length-1)%m==0&&(g+=m))}return i}(e);return function(e,t){for(let t of e)t.neighbours();e.sort(((e,t)=>e.center.y-t.center.y));for(let[t,s]of e.entries()){s.id=t;for(let e of s.nodes)e.cluster=void 0;delete s.nodes}!function(e,t){let s,i;for(let t of e)(!s||t.center.x<s.x)&&(s=t.center),(!i||t.center.x>i.x)&&(i=t.center);let r=t.hex.center.x-s.x,l=i.x-t.hex.center.x,n=Math.floor(r>l?(r-l)/2:-(l-r)/2);for(let t of e){t.center.x+=n;for(let e of t.corners)e.x+=n}}(e,t)}(s,e),function(e){console.log(`${e.length} clusters created with ${e.reduce(((e,t)=>e+t.dices),0)} dices`)}(s),s}(Y),[W,X]=function(e){H.thresholds(e);let{players:t,playerIndex:s}=function(){let e,t=[],s=.3;for(let i=0;i<n;i++)void 0===e&&t.length>0&&(Math.random()<s||i===n-1)?(t.push(new O(i)),e=i):(t.push(new H(i,Math.random()>.6)),s+=.1);return{players:t,playerIndex:e}}();!function(e,t){let s=0;for(let i of t)i.playerId=e[s++].id,s>=n&&(s=0)}(t,e);for(let s of t)s.setDices(e);let i=t[s];return i.clickableClusters=e.filter((e=>e.playerId===i.id&&e.dices>1)),function(e,t){console.log(`${e.length} players created:\n    ${e.map((e=>"- "+(e instanceof O?`Human with ${JSON.stringify({dices:e.dices,clusters:t.reduce(((t,s)=>s.playerId===e.id?++t:t),0),allDices:t.reduce(((t,s)=>s.playerId===e.id?t+s.dices:t),0)})}`:`Comp with ${JSON.stringify({dices:e.dices,clusters:t.reduce(((t,s)=>s.playerId===e.id?++t:t),0),allDices:t.reduce(((t,s)=>s.playerId===e.id?t+s.dices:t),0),cautious:e.cautious})}`))).join("\n\t")}`)}(t,e),[t,i]}(J),function(e,t){F&&(t=F);let s=C[e];C[e]=C[t],C[t]=s,F=e}(X.id,s),function(t,s,i){E.clearRect(0,0,e,r);for(let t of A)t.clearRect(0,0,e,r);!function(){switch(l){case 20:case 18:I=20===l?9:8,x=30,w=16,M=20,b=8;break;case 13:I=6,x=20,w=10,M=13,b=5}}(),function(e){const t=document.getElementsByClassName("dices-player");for(;t.length>0;)t[0].parentNode.removeChild(t[0]);T=document.getElementById("dices-bar");for(let t of e){let e=document.createElement("div");e.className="dices-player",e.id=t.id;let s=document.createElement("div"),i=document.createElement("img");i.src=C[t.id].img.src,i.width=50,i.height=50;let r=document.createElement("span");r.innerHTML=t.dices;let l=document.createElement("p");s.append(i,r),e.append(s,l),T.appendChild(e)}T.children[0].style=v}(i),function(e){for(let t of e)D(t.corners,"black",I,C[t.playerId].color),$(A[t.id],t).then((()=>{}))}(s)}(0,J,W)}function ee(e){e===X&&([z,q.disabled]=[!1,!1],X.setClickables(J),S.set.rounds()),e.turn(J,W,(async()=>await te(e)),se)}function te(e){return new Promise((t=>{setTimeout((()=>{let i=J.map((e=>e.dices));e.allocateNewDices(J);for(let[t,s]of J.entries())s.playerId===e.id&&s.dices!==i[t]&&P(s,i[t]);j(e),++G>=W.length&&(G=0);let r=W[G];setTimeout((()=>{var s,i;s=e.id,i=r.id,T.children.namedItem(s).style="background-color:none",T.children.namedItem(i).style=v,console.log("...finished."),t(r)}),r.id!==X.id?s:0)}),e.id!==X.id?s:0)})).then((e=>ee(e)))}function se(e){return new Promise((t=>{z=!0,q.disabled=!0,setTimeout((()=>{ie(["main","main-play","end"]),document.getElementById("h-end").textContent=e?"You won!":"You lost.";for(let e in S.get)document.getElementById(`li-end-${e}`).textContent=S.get[e]();t()}),s)}))}function ie(e){for(let t of e)document.getElementById(t).classList.toggle("hidden")}var re;(re=screen.height)<=750&&(r=re<=550?500:680,l=re<=550?13:18,document.getElementById("main-before").style.marginTop=r+"px",document.getElementById("main-play").style.marginTop=r+"px"),[V,Y]=function(){const e=3*l/2,t=2*e,s=l*Math.sqrt(3);let i=[],r=0,n=0,o=0;for(let l=t,u=0;a(s+d(u),l);l+=e,u++){o=0;for(let e=s+d(u);a(e,l);e+=s){let t=h(e,l);i.push(new c(r++,n,o,t)),o++}n++}for(let e of i)e.addNeighbours(i,n-1,o-1);return[i,i[Math.floor(r/2)]]}(),async function(){let e=[];for(let t=0;t<C.length;t++)e.push(new Promise((e=>{let s=new Image;s.onload=()=>{C[t].img=s,e()},s.src=`img/cube-${t+1}${13===l?"-sm":""}.svg`})));await Promise.all(e)}().then((()=>{document.getElementById("btn-launch").addEventListener("click",K),document.getElementById("btn-yes").addEventListener("click",Q),document.getElementById("btn-no").addEventListener("click",(()=>_())),q=document.getElementById("btn-turn"),q.addEventListener("click",U),q.disabled=!0,function(){let s,i=document.getElementById("stage");for(let l=0;l<=t;l++)s=document.createElement("canvas"),s.width=e,s.height=r,i.appendChild(s),0===l?E=s.getContext("2d"):N(s);return s}().addEventListener("click",(e=>async function(e){if(e.preventDefault(),e.stopPropagation(),z)return;let t=e.target.getBoundingClientRect(),s=X.click({x:e.clientX-t.left,y:e.clientY-t.top});if(void 0!==s){if(X.afterSuccessfulAttack(J,W,s))return void await se(!0);X.setClickables(J)}}(e)),!1),document.getElementById("btn-restart").addEventListener("click",Z)}))})();