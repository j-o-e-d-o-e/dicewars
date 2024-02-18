import {CANVAS_WIDTH, CANVAS_HEIGHT, CLUSTERS_MAX, TIMEOUT_BG, setPlayers, setColor} from './info.js';
import {createBoard} from './board.js';
import {createClusters} from "./clusters.js";
import {createPlayers} from "./players.js";
import {drawInit, drawDices, drawDicesNums, drawDicesBar, drawCluster} from "./draw.js";
import {Cluster} from "./cluster.js";
import {Player} from "./player.js";
import Stats from "./stats.js";
// import {createTestClusters5} from "../specs/bootstrap.js";

let canvas, btn, listenerDisabled = true;
let clusters, players, human, playerIndex = -1;

function main() {
    init();
    // testDisplay();
}

// noinspection JSUnusedLocalSymbols
// function testDisplay() {
//     init()
//     document.getElementById("launch").style.display = "none";
//     document.getElementById("main").style.display = "block";
//     let [board, _] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
//     clusters = createTestClusters5(board);
//     players = [new Comp(), new Comp(), new Human()];
//     for (let player of players) player.setDices(clusters);
//     human = players[players.length - 1];
//     drawInit(board, clusters, players);
//     let res = players[0].mightyOther(clusters, players);
//     if (res) console.log(`Mighty: ${res.id} (dices: ${res.dices})`);
// }

function init() {
    document.getElementById("launch").style.display = "block";
    document.getElementById("btn-launch").addEventListener("click", () => {
        for (let i = 3; i <= 8; i++) {
            let radio = document.getElementById("p" + i);
            if (radio.checked) {
                setPlayers(i);
                break;
            }
        }
        let colorI;
        for (let i = 1; i <= 8; i++) {
            let radio = document.getElementById("c" + i);
            if (radio.checked) {
                colorI = i - 1;
                break;
            }
        }
        document.getElementById("launch").remove();
        document.getElementById("main").style.display = "block";
        const [board, centerNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
        clusters = createClusters(centerNode);
        [players, human] = createPlayers(clusters);
        setColor(human.id, colorI);
        drawInit(board, clusters, players);
        Stats.set.startTime();
        nextTurn(players[0]);
    });

    document.getElementById("main").style.display = "none";
    btn = document.getElementById("btn-turn");
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
        div.appendChild(canvas);
    }
    canvas.addEventListener("click", event => {
        if (listenerDisabled) return;
        let rect = canvas.getBoundingClientRect();
        let otherId = human.click({x: event.clientX - rect.left, y: event.clientY - rect.top});
        if (otherId !== undefined) {
            let gameEnded = human.afterSuccessfulMove(clusters, players, otherId);
            if (gameEnded) {
                listenerDisabled = true;
                btn.disabled = true;
                end(true);
                return;
            }
        }
        human.clickableClusters = clusters.filter(c => c.playerId === human.id && c.dices > 1
            && c.adjacentClustersFromCluster().some(c => c.playerId !== human.id));
    }, false);

    document.getElementById("end").style.display = "none";
    document.getElementById("btn-restart").addEventListener("click", () => {
        document.getElementById("end").style.display = "none";
        document.getElementById("main").style.display = "block";
        const dicesPlayers = document.getElementsByClassName("dices-player");
        while (dicesPlayers.length > 0) dicesPlayers[0].parentNode.removeChild(dicesPlayers[0]);
        btn.disabled = true;
        const [board, centerNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
        Cluster.count = 0;
        clusters = createClusters(centerNode);
        Player.count = 0;
        [players, human] = createPlayers(clusters);
        setColor(human.id);
        drawInit(board, clusters, players);
        Stats.reset();
        playerIndex = -1;
        nextTurn(players[0]);
    });
}

function nextTurn(player) {
    if (player === human) {
        [listenerDisabled, btn.disabled] = [false, false];
        Stats.set.turns();
    }
    player.turn(clusters, players, async () => {
        await afterTurn(player);
    }, end);
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

function end(won) {
    document.getElementById("main").style.display = "none";
    document.getElementById("end").style.display = "block";
    if (won) document.getElementById("h-end").textContent = "You won!";
    else document.getElementById("h-end").textContent = "You lost.";
    for (let key in Stats.get) document.getElementById(`li-end-${key}`).textContent = Stats.get[key]();
}

main();
