import {CANVAS_WIDTH, CANVAS_HEIGHT, CLUSTERS_MAX, TIMEOUT_BG} from './info.js';
import {createBoard} from './board.js';
import {createClusters} from "./clusters.js";
import {createPlayers} from "./players.js";
import {Human} from "./player-human.js";
import {draw, drawInit, drawUpdatedCluster, drawUpdatedDices, drawUpdatedDicesText, drawDeletedPlayer} from "./draw.js";

let canvas, btn;
let clusters, players, player, playerIndex = -1;

function main() {
    setup();
    nextTurn();
}

function nextTurn() {
    if (++playerIndex >= players.length) playerIndex = 0;
    let current = players[playerIndex];
    if (current instanceof Human) {
        canvas.addEventListener("click", clickListener, false);
        btn.disabled = false;
    }
    current.move(clusters, async () => {
        await afterTurn(current);
    });
}

function afterTurn(player, timeout = TIMEOUT_BG) {
    return new Promise(resolve => {
        let dicesBefore = clusters.map(c => c.dices);
        player.allocateNewDices(clusters);
        for (let [index, cluster] of clusters.entries()) {
            if (cluster.playerId !== player.id || cluster.dices === dicesBefore[index]) continue;
            drawUpdatedDices(cluster);
        }
        setTimeout(() => {
            drawUpdatedDicesText(player.id, player.dices);
            console.log("...finished.");
            resolve(gameEnd());
        }, timeout);
    }).then(end => {
        if (!end) nextTurn();
    });
}

function gameEnd() {
    for (let i = 0; i < players.length; i++) {
        if (!clusters.some(c => c.playerId === i)) {
            players.splice(i, 1);
            drawDeletedPlayer(i++);
            if (players.length === 1) {
                console.log(`Player(id=${players[0].id}) has won.`);
                return true;
            }
        }
    }
    return false;
}

function setup() {
    btn = document.getElementById("end-turn");
    btn.addEventListener("click", async () => {
        canvas.removeEventListener("click", clickListener);
        btn.disabled = true;
        if (player.clickedCluster !== undefined) drawUpdatedCluster(player.clickedCluster.corners, player.id);
        await afterTurn(player);
    });
    btn.disabled = true;
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
    drawInit(players, player.id);
    draw(board, clusters);
}

function clickListener(event) {
    player.click({x: event.clientX, y: event.clientY});
    player.clickableClusters = clusters.filter(c => c.playerId === player.id && c.dices > 1);
}

main();
