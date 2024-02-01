import{CANVAS_WIDTH,CANVAS_HEIGHT,RADIUS_HEX,CLUSTERS_MAX,TIMEOUT_SM}from"./info.js";let ctxBg,ctxFg=[],dicesBar;const COLORS=[["#B37FFE",1],["#B3FF01",2],["#009302",3],["#FF7FFE",4],["#FF7F01",5],["#B3FFFE",6],["#FFFF01",7],["#FF5858",8]],LINE_WIDTH=9;function drawInit(e,t,r,c){setup(r,c),_drawClusters(t)}function setup(e,t){(ctxBg=document.getElementById("canvas-0").getContext("2d")).clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);for(let e=1;e<=CLUSTERS_MAX;e++){var r=document.getElementById("canvas-"+e).getContext("2d");r.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),ctxFg.push(r)}var c,d=COLORS[t];COLORS[t]=COLORS[0],COLORS[0]=d,dicesBar=document.getElementById("dices-bar");for(c of e){var i=document.createElement("div"),n=(i.className="dices-player",i.id=c.id,document.createElement("div")),a=document.createElement("img"),l=(a.src=`assets/cube-${COLORS[c.id][1]}.svg`,document.createElement("span")),o=(l.innerHTML=c.dices,document.createElement("p"));n.append(a,l),i.append(n,o),dicesBar.appendChild(i)}dicesBar.children[0].style="background-color:lightgrey"}function _drawBoard(e){ctxBg.fillStyle="grey",ctxBg.strokeStyle="grey";for(var t of e){ctxBg.fillText(String(t.id),t.hex.center.x-2,t.hex.center.y+4),ctxBg.beginPath();for(var r of t.hex.corners)ctxBg.lineTo(r.x,r.y);ctxBg.closePath(),ctxBg.stroke()}}function _drawClusters(e){for(var t of e)_drawCluster(t.corners,"black",COLORS[t.playerId][0]),_drawDices(t,COLORS[t.playerId][1],{timeout:0})}function _drawCluster(e,t,r){ctxBg.beginPath();for(var c of e)ctxBg.lineTo(c.x,c.y);ctxBg.lineTo(e[0].x,e[0].y),ctxBg.lineTo(e[1].x,e[1].y),ctxBg.strokeStyle=t,ctxBg.lineWidth=LINE_WIDTH,ctxBg.stroke(),ctxBg.fillStyle=r,ctxBg.fill()}function _drawDices(e,t,{timeout:c=TIMEOUT_SM,startI:d=0}={}){let i=e.centerPos.x-30,n=e.centerPos.y-20,a=new Image;a.onload=async()=>{let r=ctxFg[e.id];for(let t=0;t<e.dices;t++)4===t&&(i+=16,n+=8),t<d||await new Promise(e=>{setTimeout(()=>{r.drawImage(a,i,n-t%4*20,50,50),e()},c)})},a.src=`assets/cube-${t}.svg`}function _drawText(e){var t=RADIUS_HEX/2+2,r=e.centerPos.x-RADIUS_HEX/2-4*Math.floor(e.id/10),t=e.centerPos.y+t;ctxFg[e.id].fillStyle="black",ctxFg[e.id].font="40px Standard",ctxFg[e.id].fillText(e.id,20+r,t-20)}function drawCluster(e,t){void 0===t?_drawCluster(e,"red","ghostwhite"):_drawCluster(e,"black",COLORS[t][0])}function drawDices(e,t){void 0===t&&ctxFg[e.id].clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),_drawDices(e,COLORS[e.playerId][1],{startI:t})}function drawDicesNums(e){dicesBar.children.namedItem(e.id).children[0].children[1].innerHTML=e.dices,0<e.additionalDices?dicesBar.children.namedItem(e.id).children[1].innerHTML="+"+e.additionalDices:dicesBar.children.namedItem(e.id).children[1].innerHTML=""}function drawDicesBar(e,t){dicesBar.children.namedItem(e).style="background-color:none",dicesBar.children.namedItem(t).style="background-color:lightgrey"}function drawRemovePlayer(e){dicesBar.removeChild(dicesBar.children.namedItem(e))}export{drawInit,drawCluster,drawDices,drawDicesNums,drawDicesBar,drawRemovePlayer};