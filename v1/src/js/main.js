import {CANVAS_WIDTH, CANVAS_HEIGHT, CLUSTERS_MAX, TIMEOUT_BG} from './info.js';
import {createBoard} from './board.js';
import {createClusters} from "./clusters.js";
import {createPlayers} from "./players.js";
import {drawInit, drawCluster, drawDices, drawDicesNums, drawDicesBar} from "./draw.js";

let canvas, btn, listenerDisabled = true;
let clusters, players, human, playerIndex = -1;

function main() {
    setup();
    nextTurn(players[0]);
}

function setup() {
    btn = document.getElementById("end-turn");
    btn.addEventListener("click", async () => {
        listenerDisabled = true;
        btn.disabled = true;
        if (human.clickedCluster !== undefined) drawCluster(human.clickedCluster.corners, human.id);
        await afterTurn(human);
    });
    btn.disabled = true;
    let div = document.getElementById("stage");
    for (let i = 0; i <= CLUSTERS_MAX; i++) {
        canvas = document.createElement("canvas");
        canvas.id = "canvas-" + i;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        if (i === 0) canvas.style.background = "#eee"; // background-canvas
        div.appendChild(canvas);
    }
    canvas.addEventListener("click", clickListener, false);
    const [board, centerNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(centerNode);
    [players, human] = createPlayers(clusters);
    drawInit(board, clusters, players, human.id);
}

function nextTurn(player) {
    if (player === human) [listenerDisabled, btn.disabled] = [false, false];
    player.turn(clusters, players, async () => {
        await afterTurn(player);
    });
}

function afterTurn(player) {
    return new Promise(resolve => {
        let dicesBefore = clusters.map(c => c.dices);
        player.allocateNewDices(clusters);
        for (let [index, cluster] of clusters.entries()) {
            if (cluster.playerId !== player.id || cluster.dices === dicesBefore[index]) continue;
            drawDices(cluster, dicesBefore[index]);
        }
        drawDicesNums(player);
        if (++playerIndex >= players.length) playerIndex = 0;
        let next = players[playerIndex];
        setTimeout(() => {
            drawDicesBar(player.id, next.id);
            console.log("...finished.");
            resolve(next);
        }, next === human ? 0 : TIMEOUT_BG);
    }).then((next) => nextTurn(next));
}

function clickListener(event) {
    if (listenerDisabled) return;
    let otherId = human.click({x: event.clientX, y: event.clientY});
    if (otherId !== undefined) {
        let gameEnded = human.afterSuccessfulMove(clusters, players, otherId);
        if (gameEnded) {
            listenerDisabled = true;
            btn.disabled = true;
            return;
        }
    }
    human.clickableClusters = clusters.filter(c => c.playerId === human.id && c.dices > 1
        && c.getAdjacentClustersFromCluster().some(c => c.playerId !== human.id));
}

main();
