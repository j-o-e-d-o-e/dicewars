import {CANVAS_WIDTH, CANVAS_HEIGHT, CLUSTERS_MAX} from './info.js';
import {createBoard} from './board.js';
import {createClusters} from "./clusters.js";
import {createPlayers} from "./players.js";
import {draw, drawInit, drawUpdatedCluster, drawUpdatedDices} from "./draw.js";
import {Human} from "./player-human.js";

let canvas, btn;
let clusters, players, player, playerIndex = -1;

function main() {
    setup();
    nextMove();
}

export function nextMove() {
    if (++playerIndex === players.length) playerIndex = 0;
    let current = players[playerIndex];
    if (current instanceof Human) {
        canvas.addEventListener("click", clickListener, false);
        btn.disabled = false;
    }
    players[playerIndex].move(nextMove);
}

function setup() {
    btn = document.getElementById("end-turn");
    btn.addEventListener("click", () => {
        canvas.removeEventListener("click", clickListener);
        btn.disabled = true;
        if (player.clickedCluster !== undefined) drawUpdatedCluster(player.clickedCluster.corners, player.id);
        player.allocateNewDices(clusters);
        clusters.filter(c => c.playerId === player.id).forEach(c => drawUpdatedDices(c));
        nextMove();
    });
    let div = document.getElementById("stage");
    for (let i = 0; i <= CLUSTERS_MAX; i++) {
        canvas = document.createElement("canvas");
        canvas.id = "canvas-" + i;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        if (i === 0) canvas.style.background = "#eee"; // background
        div.appendChild(canvas);
    }
    const [board, centerNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(centerNode);
    [players, player] = createPlayers(clusters);
    player.clickableClusters = clusters.filter(c => c.playerId === player.id && c.dices > 1);
    drawInit(player.id);
    draw(board, clusters);
}

function clickListener(event) {
    player.click({x: event.clientX, y: event.clientY});
    player.clickableClusters = clusters.filter(c => c.playerId === player.id && c.dices > 1);
}

main();
