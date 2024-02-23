import{CANVAS_WIDTH,CANVAS_HEIGHT,RADIUS_HEX,CLUSTERS_MAX,TIMEOUT_SM,COLORS}from"./info.js";let ctxBg,ctxFg,dicesBar;const LINE_WIDTH=9;function drawInit(e,t,r){init(r),_drawClusters(t)}function init(e){(ctxBg=document.getElementById("canvas-0").getContext("2d")).clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),ctxFg=[];for(let e=1;e<=CLUSTERS_MAX;e++){var t=document.getElementById("canvas-"+e).getContext("2d");t.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),ctxFg.push(t)}for(var r,c=document.getElementsByClassName("dices-player");0<c.length;)c[0].parentNode.removeChild(c[0]);dicesBar=document.getElementById("dices-bar");for(r of e){var d=document.createElement("div"),n=(d.className="dices-player",d.id=r.id,document.createElement("div")),i=document.createElement("img"),a=(i.src=`assets/cube-${COLORS[r.id].cubeId}.svg`,document.createElement("span")),l=(a.innerHTML=r.dices,document.createElement("p"));n.append(i,a),d.append(n,l),dicesBar.appendChild(d)}dicesBar.children[0].style="background-color:rgba(255, 165, 0, 0.5)"}function _drawBoard(e){ctxBg.fillStyle="grey",ctxBg.strokeStyle="grey",ctxBg.lineWidth=1;for(var t of e){ctxBg.fillText(String(t.id),t.hex.center.x-2,t.hex.center.y+4),ctxBg.beginPath();for(var r of t.hex.corners)ctxBg.lineTo(r.x,r.y);ctxBg.closePath(),ctxBg.stroke()}}function _drawClusters(e){for(var t of e)_drawCluster(t.corners,"black",COLORS[t.playerId].color),_drawDices(t,COLORS[t.playerId].cubeId)}function drawCluster(e,t){void 0===t?_drawCluster(e,"red","rgba(255, 255, 255, 0.8)"):_drawCluster(e,"black",COLORS[t].color)}function _drawCluster(e,t,r){ctxBg.beginPath();for(var c of e)ctxBg.lineTo(c.x,c.y);ctxBg.lineTo(e[0].x,e[0].y),ctxBg.lineTo(e[1].x,e[1].y),ctxBg.strokeStyle=t,ctxBg.lineWidth=LINE_WIDTH,ctxBg.stroke(),ctxBg.fillStyle=r,ctxBg.fill()}function drawDices(e,t){void 0===t&&ctxFg[e.id].clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),_drawDices(e,COLORS[e.playerId].cubeId,{startI:t})}function _drawDices(e,t,{timeout:c=TIMEOUT_SM,startI:d=0}={}){let n=e.center.x-30,i=e.center.y-20,a=new Image;a.onload=async()=>{let r=ctxFg[e.id];for(let t=0;t<e.dices;t++)4===t&&(n+=16,i+=8),t<d||await new Promise(e=>{setTimeout(()=>{r.drawImage(a,n,i-t%4*20,50,50),e()},c)})},a.src=`assets/cube-${t}.svg`}function _drawText(e){var t=RADIUS_HEX/2+2,r=e.center.x-RADIUS_HEX/2-4*Math.floor(e.id/10),t=e.center.y+t;ctxFg[e.id].fillStyle="black",ctxFg[e.id].font="40px Standard",ctxFg[e.id].fillText(e.id,20+r,t-20)}function drawDicesNums(e){dicesBar.children.namedItem(e.id).children[0].children[1].innerHTML=e.dices,0<e.additionalDices?dicesBar.children.namedItem(e.id).children[1].innerHTML="+"+e.additionalDices:dicesBar.children.namedItem(e.id).children[1].innerHTML=""}function drawDicesBar(e,t){dicesBar.children.namedItem(e).style="background-color:none",dicesBar.children.namedItem(t).style="background-color:rgba(255, 165, 0, 0.5)"}function deletePlayerFromDicesBar(e){dicesBar.removeChild(dicesBar.children.namedItem(e))}export{drawInit,drawCluster,drawDices,drawDicesNums,drawDicesBar,deletePlayerFromDicesBar};