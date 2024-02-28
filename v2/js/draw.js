import {CANVAS_WIDTH, CANVAS_HEIGHT, RADIUS_HEX, TIMEOUT_SM} from "./info.js"

const COLORS = [
  {color: "#B37FFE", img: undefined}, {color: "#B3FF01", img: undefined},
  {color: "#009302", img: undefined}, {color: "#FF7FFE", img: undefined},
  {color: "#FF7F01", img: undefined}, {color: "#B3FFFE", img: undefined},
  {color: "#FFFF01", img: undefined}, {color: "#FF5858", img: undefined}
];
const DICES_BAR_COLOR = "background-color:rgba(255, 165, 0, 0.5)";
let lineWidth, xOffset, xOffsetIncr, yOffset, yOffsetIncr;
let colorIndex, ctxBg, ctxFg = [], dicesBar;

export async function loadImages() {
  let promises = [];
  for (let i = 0; i < COLORS.length; i++) {
    promises.push(new Promise(resolve => {
      let img = new Image();
      img.onload = () => {
        COLORS[i].img = img;
        resolve();
      };
      img.src = `img/cube-${i + 1}${RADIUS_HEX === 13 ? "-sm" : ""}.svg`;
    }));
  }
  await Promise.all(promises);
}

export function setColor(humanId, colorI) {
  if (colorIndex) colorI = colorIndex;
  let tmp = COLORS[humanId];
  COLORS[humanId] = COLORS[colorI];
  COLORS[colorI] = tmp;
  colorIndex = humanId;
}

export function setBackgroundCtx(ctx) {
  ctxBg = ctx.getContext("2d");
}

export function setForegroundCtx(ctx) {
  ctxFg.push(ctx.getContext("2d"));
}

export function drawInit(board, clusters, players) {
  ctxBg.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let ctx of ctxFg) ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  _setSizes();
  _setDicesBar(players);
  // _drawBoard(board);
  _drawClusters(clusters);
}

function _setSizes() {
  switch (RADIUS_HEX) {
    case 20:
    case 18:
      lineWidth = RADIUS_HEX === 20 ? 9 : 8;
      xOffset = 30;
      xOffsetIncr = 16;
      yOffset = 20;
      yOffsetIncr = 8;
      break;
    case 13:
      lineWidth = 6;
      xOffset = 20;
      xOffsetIncr = 10;
      yOffset = 13;
      yOffsetIncr = 5;
  }
}

function _setDicesBar(players) {
  const dicesPlayers = document.getElementsByClassName("dices-player");
  while (dicesPlayers.length > 0) dicesPlayers[0].parentNode.removeChild(dicesPlayers[0]);
  dicesBar = document.getElementById("dices-bar");
  for (let player of players) {
    let parentDiv = document.createElement("div");
    parentDiv.className = "dices-player";
    parentDiv.id = player.id;
    let childDiv = document.createElement("div");
    let img = document.createElement("img");
    img.src = COLORS[player.id].img.src;
    let span = document.createElement("span");
    span.innerHTML = player.dices;
    let p = document.createElement("p");
    childDiv.append(img, span);
    parentDiv.append(childDiv, p);
    dicesBar.appendChild(parentDiv);
  }
  dicesBar.children[0].style = DICES_BAR_COLOR;
}

// noinspection JSUnusedLocalSymbols
function _drawBoard(board) {
  ctxBg.fillStyle = "grey";
  ctxBg.strokeStyle = "grey";
  ctxBg.lineWidth = 1;
  for (let node of board) {
    ctxBg.fillText(String(node.id), node.hex.center.x - 2, node.hex.center.y + 4);
    ctxBg.beginPath();
    for (let corner of node.hex.corners) ctxBg.lineTo(corner.x, corner.y);
    ctxBg.closePath();
    ctxBg.stroke();
  }
}

function _drawClusters(clusters) {
  for (let cluster of clusters) {
    _drawCluster(cluster.corners, "black", lineWidth, COLORS[cluster.playerId].color);
    // noinspection JSIgnoredPromiseFromCall
    _drawDices(ctxFg[cluster.id], cluster);
    // _drawText(ctxFg[cluster.id], cluster);
  }
}

export function drawCluster(corners, playerId) {
  if (playerId === undefined) _drawCluster(corners, "red", lineWidth - 1, "rgba(255, 255, 255, 0.8)");
  else _drawCluster(corners, "black", lineWidth, COLORS[playerId].color);
}

function _drawCluster(corners, lineColor, lineWidth, fillColor) {
  ctxBg.beginPath();
  for (let corner of corners) ctxBg.lineTo(corner.x, corner.y);
  ctxBg.closePath();
  ctxBg.strokeStyle = lineColor;
  ctxBg.lineWidth = lineWidth;
  ctxBg.stroke();
  ctxBg.fillStyle = fillColor;
  ctxBg.fill();
}

export function drawDices(cluster, dicesBefore) {
  let ctx = ctxFg[cluster.id];
  if (dicesBefore === undefined) ctx.clearRect(cluster.center.x - 30, cluster.center.y - 80, 80, 120);
  _drawDices(ctx, cluster, {startI: dicesBefore}).then(() => {
    // _drawText(ctx, cluster);
  });
}

async function _drawDices(ctx, cluster, {timeout = TIMEOUT_SM, startI = 0} = {}) {
  let x = cluster.center.x - xOffset;
  let y = cluster.center.y - RADIUS_HEX;
  for (let i = 0; i < cluster.dices; i++) {
    if (i === 4) {
      x += xOffsetIncr;
      y += yOffsetIncr;
    }
    if (i < startI) continue;
    await new Promise(resolve => {
      setTimeout(() => {
        ctx.drawImage(COLORS[cluster.playerId].img, x, y - yOffset * (i % 4))
        resolve();
      }, timeout);
    });
  }
}

// noinspection JSUnusedLocalSymbols
function _drawText(ctx, cluster) {
  const xTextOffset = RADIUS_HEX / 2;
  const yTextOffset = RADIUS_HEX / 2 + 2;
  let x = cluster.center.x - xTextOffset - 4 * Math.floor(cluster.id / 10);
  let y = cluster.center.y + yTextOffset;
  ctx.fillStyle = "black";
  ctx.font = "40px Standard";
  ctx.fillText(cluster.id, x + 20, y - 20);
}

export function drawDicesNums(player) {
  dicesBar.children.namedItem(player.id).children[0].children[1].innerHTML = player.dices;
  if (player.additionalDices > 0) dicesBar.children.namedItem(player.id).children[1].innerHTML = `+${player.additionalDices}`;
  else dicesBar.children.namedItem(player.id).children[1].innerHTML = "";
}

export function drawDicesBar(lastPlayerId, nextPlayerId) {
  dicesBar.children.namedItem(lastPlayerId).style = "background-color:none";
  dicesBar.children.namedItem(nextPlayerId).style = DICES_BAR_COLOR;
}

export function deletePlayerFromDicesBar(playerId) {
  dicesBar.removeChild(dicesBar.children.namedItem(playerId));
}
