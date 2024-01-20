import {CANVAS_WIDTH, CANVAS_HEIGHT, RADIUS_HEX} from "./info.js"

let ctxBg, ctxFg = [];
const COLORS = [
    "#B37FFE", "#B3FF01",
    "#009302", "#FF7FFE",
    "#FF7F01", "#B3FFFE",
    "#FFFF01", "#FF5858"
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
        drawCluster(cluster.corners, "black", COLORS[cluster.playerId]);
        drawDices(cluster);
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
    else drawCluster(corners, "black", COLORS[playerId]);
}

function drawText(cluster) {
    const xTextOffset = RADIUS_HEX / 2;
    const yTextOffset = RADIUS_HEX / 2 + 2;
    let x = cluster.centerPos.x - xTextOffset - 4 * Math.floor(cluster.id / 10);
    let y = cluster.centerPos.y + yTextOffset;
    ctxFg[cluster.id].fillStyle = "black";
    ctxFg[cluster.id].font = "40px Standard";
    ctxFg[cluster.id].fillText(cluster.id, x, y);
}

function drawDices(cluster) {
    let x = cluster.centerPos.x - 30;
    let y = cluster.centerPos.y - 20;
    let size = 50;
    let xOffset = 16;
    let yOffset = 20;
    let img = new Image();
    img.onload = () => {
        for (let i = 0; i < cluster.dices; i++) {
            if (i === 4) {
                x += xOffset;
                y += 8;
            }
            ctxFg[cluster.id].drawImage(img, x, y - yOffset * (i % 4), size, size);
        }
    };
    img.src = `assets/cube.svg`;
}

export function drawUpdatedDices(cluster) {
    ctxFg[cluster.id].clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawDices(cluster);
}

export function draw(board, clusters) {
    drawBoard(board);
    drawClusters(clusters);
}

export function drawInit(playerId) {
    ctxBg = document.getElementById("canvas-0").getContext("2d")
    ctxBg.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let i = 1; i <= 32; i++) {
        let ctx = document.getElementById("canvas-" + i).getContext("2d")
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctxFg.push(ctx);
    }
    let tmp = COLORS[playerId];
    COLORS[playerId] = COLORS[0];
    COLORS[0] = tmp;
}
