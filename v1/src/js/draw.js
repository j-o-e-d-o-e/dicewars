import {CANVAS_WIDTH, CANVAS_HEIGHT, RADIUS_HEX, CLUSTERS_MAX, PLAYERS, TIMEOUT_DICES} from "./info.js"

let ctxBg, ctxFg = [], dicesTxt = [];
const COLORS = [
    ["#B37FFE", 1], ["#B3FF01", 2],
    ["#009302", 3], ["#FF7FFE", 4],
    ["#FF7F01", 5], ["#B3FFFE", 6],
    ["#FFFF01", 7], ["#FF5858", 8]
];
const LINE_WIDTH = 9;


function drawBoard(board) {
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

function drawClusters(clusters) {
    for (let cluster of clusters) {
        drawCluster(cluster.corners, "black", COLORS[cluster.playerId][0]);
        drawDices(cluster, COLORS[cluster.playerId][1], 0);
        // drawText(cluster);
    }
}

function drawCluster(corners, lineColor, fillColor) {
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

export function drawUpdatedCluster(corners, playerId) {
    if (playerId === undefined) drawCluster(corners, "red", "white");
    else drawCluster(corners, "black", COLORS[playerId][0]);
}

function drawText(cluster) {
    const xTextOffset = RADIUS_HEX / 2;
    const yTextOffset = RADIUS_HEX / 2 + 2;
    let x = cluster.centerPos.x - xTextOffset - 4 * Math.floor(cluster.id / 10);
    let y = cluster.centerPos.y + yTextOffset;
    ctxFg[cluster.id].fillStyle = "black";
    ctxFg[cluster.id].font = "40px Standard";
    ctxFg[cluster.id].fillText(cluster.id, x + 20, y - 20);
}

function drawDices(cluster, cubeColorId, timeout = TIMEOUT_DICES) {
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
            await new Promise(resolve => {
                setTimeout(() => {
                    ctx.drawImage(img, x, y - yOffset * (i % 4), size, size)
                    resolve();
                }, timeout);
            });
        }
    };
    img.src = `assets/cube-${cubeColorId}.svg`;
}

export function drawUpdatedDices(cluster) {
    ctxFg[cluster.id].clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawDices(cluster, COLORS[cluster.playerId][1]);
}

export function drawUpdatedDicesText(playerId, dices) {
    dicesTxt[playerId].innerHTML = dices;
    dicesTxt[playerId].parentNode.style = "background-color:none";
    dicesTxt[(playerId + 1) % PLAYERS].parentNode.style = "background-color:lightgrey";
}

export function drawDeletedPlayer(playerId) {
    COLORS.splice(playerId, 1);
    let dices = document.getElementById("dices");
    dices.removeChild(dices.children[playerId]);
}

export function draw(board, clusters) {
    drawBoard(board);
    drawClusters(clusters);
}

export function drawInit(players, humanPlayerId) {
    ctxBg = document.getElementById("canvas-0").getContext("2d")
    ctxBg.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 1; i <= CLUSTERS_MAX; i++) {
        let ctx = document.getElementById("canvas-" + i).getContext("2d")
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctxFg.push(ctx);
    }
    let tmp = COLORS[humanPlayerId];
    COLORS[humanPlayerId] = COLORS[0];
    COLORS[0] = tmp;
    let dices = document.getElementById("dices");
    for (let player of players) {
        let span = document.createElement("span");
        span.className = "dicesPlayer";
        let img = document.createElement("img");
        img.src = `assets/cube-${COLORS[player.id][1]}.svg`;
        let txt = document.createElement("span");
        txt.innerHTML = player.dices;
        span.append(img, txt);
        dices.appendChild(span);
        dicesTxt.push(txt);
    }
    dicesTxt[0].parentNode.style = "background-color:lightgrey";
}
