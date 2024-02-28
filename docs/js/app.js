(()=>{"use strict";const e=1280,t=32,i=600,s=60;let r=745,l=20,n=7;function o(e){n=e}class d{constructor(e,t,i,s){this.id=e,this.row=t,this.col=i,this.hex=s,this.cluster=void 0}addNeighbours(e,t,i){0!==this.row&&this.col!==i&&(this.upRight=e[this.id-i]),0===this.row||0===this.col&&this.row%2==0||(this.upLeft=e[this.id-i-1]),0!==this.col&&(this.left=e[this.id-1]),this.row===t||0===this.col&&this.row%2==0||(this.downLeft=e[this.id+i]),this.row!==t&&this.col!==i&&(this.downRight=e[this.id+i+1]),this.col===i||this.col===i-1&&this.row%2!=0||(this.right=e[this.id+1])}adjacentNodesFromNode(){return[this.upRight,this.upLeft,this.left,this.downLeft,this.downRight,this.right].filter((e=>void 0!==e))}}function c(e,t){let i={center:{x:e,y:t},corners:[]};for(let s=0;s<6;s++){let r=Math.PI/180*(60*s-30);i.corners.push({x:e+l*Math.cos(r),y:t+l*Math.sin(r)})}return i}class a{constructor(e,t,i){this.id=e,this.playerId=i?i.playerId:void 0,this.dices=i?i.dices:Math.floor(6*Math.random())+1,this.nodes=[],this.addNodeAndItsNeighbours(t),i||this.expand(),this.corners=this.cornersPos(),this.center=this.centerPos(),this.adjacentClusters=void 0}addNodeAndItsNeighbours(e){e.cluster=this,this.nodes.push(e),e.adjacentNodesFromNode().filter((e=>void 0===e.cluster)).forEach((e=>{e.cluster=this,this.nodes.push(e)}))}expand(){for(;this.nodes.length<10;){let e=this.adjacentNodesFromCluster().filter((e=>void 0===e.cluster));if(0===e.length)break;let t=e[Math.floor(Math.random()*(e.length-1))];this.addNodeAndItsNeighbours(t)}}cornersPos(){let e=[];for(let t of this.nodes)for(let[i,s]of["upRight","upLeft","left","downLeft","downRight","right"].entries())if(void 0===t[s]||t[s]?.cluster?.id!==this.id){let s=5-i,r=5===s?0:s+1;e.push({start:{x:t.hex.corners[r].x,y:t.hex.corners[r].y},end:{x:t.hex.corners[s].x,y:t.hex.corners[s].y}})}e.sort(((e,t)=>e.start.x-t.start.x));let t=e.shift(),i=[t];for(;0!==e.length;)for(let s=0;s<e.length;s++){let r=e[s];if(Math.sqrt((t.end.x-r.start.x)**2+(t.end.y-r.start.y)**2)<2){t=r,e.splice(s,1),i.push(t);break}}return i.map((e=>({x:Math.floor(e.start.x),y:e.start.y})))}centerPos(){let e,t=[...this.corners,this.corners[0]],i=0,s=0,r=0;for(let l=0,n=t.length-1;l<t.length;n=l++){let o=t[l],d=t[n];e=o.x*d.y-d.x*o.y,i+=e,s+=(o.x+d.x)*e,r+=(o.y+d.y)*e}return e=3*i,{x:Math.floor(s/e),y:Math.floor(r/e)}}adjacentNodesFromCluster(){return Array.from(new Set(this.nodes.flatMap((e=>e.adjacentNodesFromNode())).filter((e=>!this.nodes.includes(e)))))}neighbours(){this.adjacentClusters=[...new Set(this.adjacentNodesFromCluster().filter((e=>void 0!==e.cluster)).map((e=>e.cluster)))]}adjacentClustersFromCluster(){return this.adjacentClusters}containsPoint(e){let t=this.corners,i=!1;for(let s=0,r=t.length-1;s<t.length;s++)t[s].y>e.y!=t[r].y>e.y&&e.x<(t[r].x-t[s].x)*(e.y-t[s].y)/(t[r].y-t[s].y)+t[s].x&&(i=!i),r=s;return i}region(){let e=[this],t=this.adjacentClustersFromCluster().filter((e=>e.playerId===this.playerId));for(;t.length>0;)e=e.concat(t),t=[...new Set(t.flatMap((t=>t.adjacentClustersFromCluster().filter((t=>!e.includes(t)&&t.playerId===this.playerId)))))];return e}path(e){let i,s=[this],r=Array(t).fill(!1);r[this.id]=!0;let l=Array(t),n=Array(t);for(n[this.id]=0;s.length>0;){let t=s.shift(),o=t.adjacentClustersFromCluster();for(let d of o){let o=this.dices-n[t.id];if(!(d.id!==e.id&&d.playerId===this.playerId||d.playerId!==e.playerId&&d.dices-(8===o)>=o||r[d.id]))if(l[d.id]=t,n[d.id]=n[t.id]+1,d.id!==e.id)r[d.id]=!0,s.push(d);else{let t=e,s=l[t.id],r=[t];for(;s;)r.push(s),t=s,s=l[t.id];if(r.reverse(),i){let e=Math.min(...r.slice(1,-1).map(((e,t)=>this.dices-t-e.dices))),t=Math.min(...i.slice(1,-1).map(((e,t)=>this.dices-t-e.dices)));(e>t||e===t&&r.length<i.length)&&(i=r)}else i=r}}}return i}}const h=3;let u,f,m;function g(e){let t=e.adjacentNodesFromCluster().filter((e=>void 0===e.cluster&&e.adjacentNodesFromNode().filter((e=>void 0===e.cluster)).length>=h));return 0===t.length?(u--,void(++m>=u&&(m=0))):t[Math.floor(Math.random()*t.length)]}function y(){let e=f+m+++1;return m===u&&(m=0),e}const p=[{color:"#B37FFE",img:void 0},{color:"#B3FF01",img:void 0},{color:"#009302",img:void 0},{color:"#FF7FFE",img:void 0},{color:"#FF7F01",img:void 0},{color:"#B3FFFE",img:void 0},{color:"#FFFF01",img:void 0},{color:"#FF5858",img:void 0}],k="background-color:rgba(255, 165, 0, 0.5)";let v,C,I,x,w,b,M,F,E=[];function $(e,t){void 0===t?N(e,"red",v-1,"rgba(255, 255, 255, 0.8)"):N(e,"black",v,p[t].color)}function N(e,t,i,s){M.beginPath();for(let t of e)M.lineTo(t.x,t.y);M.closePath(),M.strokeStyle=t,M.lineWidth=i,M.stroke(),M.fillStyle=s,M.fill()}function D(e,t){let i=E[e.id];void 0===t&&i.clearRect(e.center.x-30,e.center.y-80,80,120),A(i,e,{startI:t}).then((()=>{}))}async function A(e,t,{timeout:i=s,startI:r=0}={}){let n=t.center.x-C,o=t.center.y-l;for(let s=0;s<t.dices;s++)4===s&&(n+=I,o+=w),s<r||await new Promise((r=>{setTimeout((()=>{e.drawImage(p[t.playerId].img,n,o-x*(s%4)),r()}),i)}))}function j(e){F.children.namedItem(e.id).children[0].children[1].innerHTML=e.dices,e.additionalDices>0?F.children.namedItem(e.id).children[1].innerHTML=`+${e.additionalDices}`:F.children.namedItem(e.id).children[1].innerHTML=""}class B{constructor(e){this.id=e,this.dices=0,this.additionalDices=0}static roleDice(e){let t=0;for(let i=0;i<e;i++)t+=Math.floor(6*Math.random())+1;return t}turn(){console.log(`${this instanceof L?"Human":"Comp"}'s turn (id: ${this.id})...`)}afterSuccessfulMove(e,t,i){this.setDices(e),j(this);let s=t.find((e=>e.id===i));if(s.setDices(e),e.some((e=>e.playerId===s.id)))j(s);else{let[e]=t.splice(t.findIndex((e=>e.id===s.id)),1);if(r=e.id,F.removeChild(F.children.namedItem(r)),console.log(`Deleted player (id: ${e.id}).`),e instanceof L)return console.log(`Human player (id: ${e.id}) has lost.`),!0;if(1===t.length)return console.log(`${this instanceof L?"Human":"Comp"} player (id: ${this.id}) has won.`),!0}var r}allocateNewDices(e){let t=e.filter((e=>e.playerId===this.id&&e.dices<8)),i=this.dices;for(;i>0&&t.length>0;){let e=Math.floor(Math.random()*t.length);t[e].dices++,8===t[e].dices&&t.splice(e,1),this.additionalDices>0?this.additionalDices--:i--}i>0&&(this.additionalDices+=i,this.additionalDices>2*e.length&&(this.additionalDices=2*e.length))}setDices(e){this.dices=0;for(let t of e.filter((e=>e.playerId===this.id))){let e=t.region().length;e>this.dices&&(this.dices=e)}}}const T={startTime:void 0,rounds:0,successfulAttacks:0,unsuccessfulAttacks:0},P={get:{time(){let e=new Date-T.startTime,t=Math.floor(e/6e4),i=(e%6e4/1e3).toFixed(0);return"Time played: "+t+":"+(i<10?"0":"")+i},rounds:()=>`Rounds: ${T.rounds}`,successRate(){let e=T.successfulAttacks+T.unsuccessfulAttacks;return`Success rate: ${0===e?0:Math.round(T.successfulAttacks/e*100)}%`}},set:{rounds(){T.rounds++},successfulAttacks(){T.successfulAttacks++},unsuccessfulAttacks(){T.unsuccessfulAttacks++}},reset(){T.startTime=new Date,T.rounds=0,T.successfulAttacks=0,T.unsuccessfulAttacks=0}};class L extends B{constructor(e){super(e),this.clickableClusters=void 0,this.clickedCluster=void 0}click(e){if(void 0===this.clickedCluster){let t=this.clickableClusters.find((t=>t.containsPoint(e)));if(void 0===t)return;this.clickedCluster=t,console.log(`selected=${this.clickedCluster.id} (dices: ${this.clickedCluster.dices})`),$(this.clickedCluster.corners)}else if(this.clickedCluster.containsPoint(e))$(this.clickedCluster.corners,this.id),this.clickedCluster=void 0;else{let t=this.clickedCluster.adjacentClustersFromCluster().filter((e=>e.playerId!==this.id)).find((t=>t.containsPoint(e)));if(void 0===t)return;let i=B.roleDice(this.clickedCluster.dices),s=B.roleDice(t.dices);console.log(`attacks ${t.playerId}: ${this.clickedCluster.id} vs ${t.id} -> thrown dices: ${i} vs ${s}`);let r=this.clickedCluster.dices;if(this.clickedCluster.dices=1,$(this.clickedCluster.corners,this.id),D(this.clickedCluster),i>s){P.set.successfulAttacks();let e=t.playerId;return t.playerId=this.id,t.dices=r-1,$(t.corners,this.id),D(t),this.clickedCluster=void 0,e}P.set.unsuccessfulAttacks();let l=this.clickableClusters.findIndex((e=>e.id===this.clickedCluster.id));this.clickableClusters.splice(l,1),this.clickedCluster=void 0}}setClickables(e){this.clickableClusters=e.filter((e=>e.playerId===this.id&&e.dices>1&&e.adjacentClustersFromCluster().some((e=>e.playerId!==this.id))))}}class R extends B{static thresholdMighty;static thresholdVeryMighty;static thresholds(e){R.thresholdMighty=Math.ceil(e.length/3),R.thresholdVeryMighty=Math.ceil(e.length/2)}constructor(e){super(e)}async turn(e,t,i,s){super.turn();let r=this.path(e),l=this.mightyOthers(e,t);for(;r&&(0===l.length||l[0].dices<=R.thresholdVeryMighty||r.slice(1,-1).every((e=>e.playerId===l[0].id)));){let i=r.shift();for(let l of r.slice(0,-1)){let r=await this.attack(i,l);if(void 0===r)break;if(this.afterSuccessfulMove(e,t,r))return void await s(!1);i=l}r=this.path(e),l=this.mightyOthers(e,t)}let n=e.filter((e=>e.playerId===this.id&&e.dices>1)).sort(((e,t)=>t.dices-e.dices)),o=n.shift();for(;o;){l=this.dices>R.thresholdMighty?[]:this.mightyOthers(e,t);let i=this.target(o,l);if(!i){o=n.shift();continue}let r=await this.attack(o,i);if(void 0===r)o=n.shift();else{if(this.afterSuccessfulMove(e,t,r))return void await s(!1);o=i.dices>1?i:n.shift()}}i()}attack(e,t){return new Promise((r=>{let l=B.roleDice(e.dices),n=B.roleDice(t.dices);console.log(`attacks ${t.playerId}: ${e.id} vs ${t.id} -> thrown dices: ${l} vs ${n}`),$(e.corners),setTimeout((()=>{$(t.corners),setTimeout((()=>{let i=e.dices;if(e.dices=1,D(e),$(e.corners,this.id),l>n){let e=t.playerId;t.playerId=this.id,t.dices=i-1,D(t),$(t.corners,this.id),r(e)}else $(t.corners,t.playerId),r(void 0)}),i)}),s)}))}mightyOthers(e,t){return t.filter((e=>e.id!==this.id&&e.dices>R.thresholdMighty)).sort(((e,t)=>t.dices-e.dices))}target(e,t){let i=e.adjacentClustersFromCluster().filter((e=>e.playerId!==this.id));if(0===i.length)return;if(t.length>0){let e;for(let s of t)if(e=i.filter((e=>e.playerId===s.id)),e.length>0)break;i=e}if(i=i.filter((t=>e.dices>t.dices-(8===e.dices))),0===i.length)return;let s=i.reduce(((e,t)=>((e[t.dices]=e[t.dices]||[]).push(t),e)),{}),r=[...Array(e.dices-1).keys()].reverse();r[r.length-1]=e.dices-1,8===e.dices&&r.push(8);for(let e of r)if(e in s)return s[e][Math.floor(Math.random()*s[e].length)]}path(e){let t,i=[];for(let t of e.filter((e=>e.playerId===this.id)))i.flat().includes(t)||i.push(t.region());i=i.map((e=>e.filter((e=>e.adjacentClustersFromCluster().some((e=>e.playerId!==this.id))))));for(let[e,s]of i.entries())for(let r of s)for(let[l,n]of i.entries())if(s!==n)for(let o of n){let d=r.path(o);if(d)if(t){let r=s.length+n.length,o=i[t.from].length+i[t.to].length;(r>o||r===o&&d.length<t.path.length)&&(t={from:e,to:l,path:d})}else t={from:e,to:l,path:d}}return t?.path}}let S,H,O,V,Y,q,J=!0,W=0;function X(i=0){V=function(e){[u,f,m]=[4,0,0];let i=0,s=[new a(i++,e)];for(;s.length<=u;){let e=g(s[0]);void 0!==e&&s.push(new a(i++,e))}for(;s.length<t&&u>=0;){let e=g(s[y()]);void 0!==e&&(s.push(new a(i++,e)),(s.length-1)%u==0&&(f+=u))}for(let e of s)e.neighbours();s.sort(((e,t)=>e.center.y-t.center.y));for(let[e,t]of s.entries()){t.id=e;for(let e of t.nodes)e.cluster=void 0;delete t.nodes}return function(e,t){let i,s;for(let t of e)(!i||t.center.x<i.x)&&(i=t.center),(!s||t.center.x>s.x)&&(s=t.center);let r=t.hex.center.x-i.x,l=s.x-t.hex.center.x,n=Math.floor(r>l?(r-l)/2:-(l-r)/2);for(let t of e){t.center.x+=n;for(let e of t.corners)e.x+=n}}(s,e),function(e){console.log(`${e.length} clusters created with ${e.reduce(((e,t)=>e+t.dices),0)} dices`)}(s),s}(H),[Y,q]=function(e){R.thresholds(e);let t,i=[],s=.3;for(let e=0;e<n;e++)void 0===t&&i.length>0&&(Math.random()<s||e===n-1)?(i.push(new L(e)),t=e):(i.push(new R(e)),s+=.1);let r=0;for(let t of e)t.playerId=i[r++].id,r>=n&&(r=0);for(let t of i)t.setDices(e);let l=i[t];return l.clickableClusters=e.filter((e=>e.playerId===l.id&&e.dices>1)),function(e,t){console.log(`${e.length} players created:\n    ${e.map((e=>`- ${e instanceof L?"Human":"Comp"} with ${JSON.stringify({dices:e.dices,clusters:t.reduce(((t,i)=>i.playerId===e.id?++t:t),0),allDices:t.reduce(((t,i)=>i.playerId===e.id?t+i.dices:t),0)})}`)).join("\n\t")}`)}(i,e),[i,l]}(V),function(e,t){b&&(t=b);let i=p[e];p[e]=p[t],p[t]=i,b=e}(q.id,i),function(t,i,s){M.clearRect(0,0,e,r);for(let t of E)t.clearRect(0,0,e,r);!function(){switch(l){case 20:case 18:v=20===l?9:8,C=30,I=16,x=20,w=8;break;case 13:v=6,C=20,I=10,x=13,w=5}}(),function(e){const t=document.getElementsByClassName("dices-player");for(;t.length>0;)t[0].parentNode.removeChild(t[0]);F=document.getElementById("dices-bar");for(let t of e){let e=document.createElement("div");e.className="dices-player",e.id=t.id;let i=document.createElement("div"),s=document.createElement("img");s.src=p[t.id].img.src;let r=document.createElement("span");r.innerHTML=t.dices;let l=document.createElement("p");i.append(s,r),e.append(i,l),F.appendChild(e)}F.children[0].style=k}(s),function(e){for(let t of e)N(t.corners,"black",v,p[t.playerId].color),A(E[t.id],t)}(i)}(0,V,Y)}function z(e){e===q&&([J,O.disabled]=[!1,!1],q.setClickables(V),P.set.rounds()),e.turn(V,Y,(async()=>await G(e)),K)}function G(e){return new Promise((t=>{setTimeout((()=>{let s=V.map((e=>e.dices));e.allocateNewDices(V);for(let[t,i]of V.entries())i.playerId===e.id&&i.dices!==s[t]&&D(i,s[t]);j(e),++W>=Y.length&&(W=0);let r=Y[W];setTimeout((()=>{var i,s;i=e.id,s=r.id,F.children.namedItem(i).style="background-color:none",F.children.namedItem(s).style=k,console.log("...finished."),t(r)}),r.id!==q.id?i:0)}),e.id!==q.id?i:0)})).then((e=>z(e)))}function K(e){return new Promise((t=>{J=!0,O.disabled=!0,setTimeout((()=>{Q(["main","main-play","end"]),document.getElementById("h-end").textContent=e?"You won!":"You lost.";for(let e in P.get)document.getElementById(`li-end-${e}`).textContent=P.get[e]();t()}),i)}))}function Q(e){for(let t of e)document.getElementById(t).classList.toggle("hidden")}var U;(U=window.innerHeight)<=750&&(r=U<=550?500:680,l=U<=550?13:18,document.getElementById("main-before").style.marginTop=r+"px",document.getElementById("main-play").style.marginTop=r+"px"),[S,H]=function(){const t=3*l/2,i=2*t,s=l*Math.sqrt(3);let n=[],o=0,a=0,h=0;for(let u=i,f=0;u+l<=r;u+=t,f++){h=0;for(let t=s+(f%2==0?0:l-1);t+l<=e;t+=s){let e=c(t,u);n.push(new d(o++,a,h,e)),h++}a++}for(let e of n)e.addNeighbours(n,a-1,h-1);return[n,n[Math.floor(o/2)]]}(),async function(){let e=[];for(let t=0;t<p.length;t++)e.push(new Promise((e=>{let i=new Image;i.onload=()=>{p[t].img=i,e()},i.src=`img/cube-${t+1}${13===l?"-sm":""}.svg`})));await Promise.all(e)}().then((()=>{!function(){document.getElementById("btn-launch").addEventListener("click",(()=>{let e=document.forms["form-players"].getElementsByTagName("input");for(let t of e)if(t.checked){o(t.value);break}let t=document.forms["form-colors"].getElementsByTagName("input");for(let e of t)if(e.checked){X(e.value);break}document.getElementById("launch").remove(),Q(["main","main-before"])})),Q(["main","main-before","main-play"]),document.getElementById("btn-yes").addEventListener("click",(()=>{Q(["main-before","main-play"]),W=0,P.reset(),z(Y[0])})),document.getElementById("btn-no").addEventListener("click",(()=>X())),O=document.getElementById("btn-turn"),O.addEventListener("click",(async()=>{J=!0,O.disabled=!0,void 0!==q.clickedCluster&&$(q.clickedCluster.corners,q.id),await G(q)})),O.disabled=!0;let i,s=document.getElementById("stage");for(let n=0;n<=t;n++)i=document.createElement("canvas"),i.width=e,i.height=r,s.appendChild(i),0===n?M=i.getContext("2d"):(l=i,E.push(l.getContext("2d")));var l;i.addEventListener("click",(async e=>{if(e.stopPropagation(),J)return;let t=i.getBoundingClientRect(),s=q.click({x:e.clientX-t.left,y:e.clientY-t.top});if(void 0!==s){if(q.afterSuccessfulMove(V,Y,s))return void await K(!0);q.setClickables(V)}}),!1),Q(["end"]),document.getElementById("btn-restart").addEventListener("click",(()=>{X(),Q(["end","main","main-before"])}))}()}))})();