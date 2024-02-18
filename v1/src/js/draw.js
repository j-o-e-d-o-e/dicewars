import {CANVAS_WIDTH, CANVAS_HEIGHT, RADIUS_HEX, CLUSTERS_MAX, TIMEOUT_SM, COLORS} from "./info.js"

let ctxBg, ctxFg, dicesBar;

const LINE_WIDTH = 9;

export function drawInit(board, clusters, players) {
    init(players)
    // _drawBoard(board);
    _drawClusters(clusters);
}

function init(players) {
    ctxBg = document.getElementById("canvas-0").getContext("2d");
    ctxBg.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctxFg = [];
    for (let i = 1; i <= CLUSTERS_MAX; i++) {
        let ctx = document.getElementById("canvas-" + i).getContext("2d")
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctxFg.push(ctx);
    }
    const dicesPlayers = document.getElementsByClassName("dices-player");
    while (dicesPlayers.length > 0) dicesPlayers[0].parentNode.removeChild(dicesPlayers[0]);
    dicesBar = document.getElementById("dices-bar");
    for (let player of players) {
        let parentDiv = document.createElement("div");
        parentDiv.className = "dices-player";
        parentDiv.id = player.id;
        let childDiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = `assets/cube-${COLORS[player.id].cubeId}.svg`;
        let span = document.createElement("span");
        span.innerHTML = player.dices;
        let p = document.createElement("p");
        childDiv.append(img, span);
        parentDiv.append(childDiv, p);
        dicesBar.appendChild(parentDiv);
    }
    dicesBar.children[0].style = "background-color:rgba(255, 165, 0, 0.5)";
}

// noinspection JSUnusedLocalSymbols
function _drawBoard(board) {
    ctxBg.fillStyle = "grey";
    ctxBg.strokeStyle = "grey";
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
        _drawCluster(cluster.corners, "black", COLORS[cluster.playerId].color);
        _drawDices(cluster, COLORS[cluster.playerId].cubeId, {timeout: 0});
        // _drawText(cluster);
    }
}

function _drawCluster(corners, lineColor, fillColor) {
    ctxBg.beginPath();
    for (let corner of corners) ctxBg.lineTo(corner.x, corner.y);
    ctxBg.lineTo(corners[0].x, corners[0].y)
    ctxBg.lineTo(corners[1].x, corners[1].y)
    ctxBg.strokeStyle = lineColor;
    ctxBg.lineWidth = LINE_WIDTH;
    ctxBg.stroke();
    ctxBg.fillStyle = fillColor;
    ctxBg.fill();
}

function _drawDices(cluster, colorId, {timeout = TIMEOUT_SM, startI = 0} = {}) {
    let x = cluster.centerPos.x - 30;
    let y = cluster.centerPos.y - 20;
    let size = 50;
    let xOffset = 16;
    let yOffset = 20;
    let img = new Image();
    img.onload = async () => {
        let ctx = ctxFg[cluster.id];
        for (let i = 0; i < cluster.dices; i++) {
            if (i === 4) {
                x += xOffset;
                y += 8;
            }
            if (i < startI) continue;
            await new Promise(resolve => {
                setTimeout(() => {
                    ctx.drawImage(img, x, y - yOffset * (i % 4), size, size)
                    resolve();
                }, timeout);
            });
        }
    };
    img.src = `assets/cube-${colorId}.svg`;
}

// noinspection JSUnusedLocalSymbols
function _drawText(cluster) {
    const xTextOffset = RADIUS_HEX / 2;
    const yTextOffset = RADIUS_HEX / 2 + 2;
    let x = cluster.centerPos.x - xTextOffset - 4 * Math.floor(cluster.id / 10);
    let y = cluster.centerPos.y + yTextOffset;
    ctxFg[cluster.id].fillStyle = "black";
    ctxFg[cluster.id].font = "40px Standard";
    ctxFg[cluster.id].fillText(cluster.id, x + 20, y - 20);
}

export function drawCluster(corners, playerId) {
    if (playerId === undefined) _drawCluster(corners, "red", "rgba(239, 236, 236, 0.8)");
    else _drawCluster(corners, "black", COLORS[playerId].color);
}

export function drawDices(cluster, dicesBefore) {
    if (dicesBefore === undefined) ctxFg[cluster.id].clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    _drawDices(cluster, COLORS[cluster.playerId].cubeId, {startI: dicesBefore});
    // _drawText(cluster);
}

export function drawDicesNums(player) {
    dicesBar.children.namedItem(player.id).children[0].children[1].innerHTML = player.dices;
    if (player.additionalDices > 0) dicesBar.children.namedItem(player.id).children[1].innerHTML = `+${player.additionalDices}`;
    else dicesBar.children.namedItem(player.id).children[1].innerHTML = "";
}

export function drawDicesBar(lastPlayerId, nextPlayerId) {
    dicesBar.children.namedItem(lastPlayerId).style = "background-color:none";
    dicesBar.children.namedItem(nextPlayerId).style = "background-color:rgba(255, 165, 0, 0.5)";
}

export function drawRemovePlayer(playerId) {
    dicesBar.removeChild(dicesBar.children.namedItem(playerId));
}
