import {CANVAS_WIDTH, CANVAS_HEIGHT, CLUSTERS_MAX, TIMEOUT_BG, setPlayers} from './info.js';
import {createBoard} from './board.js';
import {createClusters} from "./clusters.js";
import {createPlayers} from "./players.js";
import {
    loadImages, setColor, setBackgroundCtx, setForegroundCtx,
    drawInit, drawCluster, drawDices, drawDicesNums, drawDicesBar,
} from "./draw.js";
import Stats from "./stats.js";

const [board, centerNode] = createBoard();
let btn, listenerDisabled = true;
let clusters, players, human, playerIndex = 0;

function main() {
    loadImages().then(() => {
        init();
        // testDisplay();
    });
}

// noinspection JSUnusedLocalSymbols
function testDisplay() {
    init();
    createGame();
    document.getElementById("launch").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("main-before").style.display = "none";
    clusters.forEach(c => {
        c.dices = 8;
        drawCluster(c.corners, c.playerId);
    });
    players.forEach(p => {
        p.additionalDices = CLUSTERS_MAX * 2;
        drawDicesNums(p);
    });
}

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
        createGame(colorI);
        document.getElementById("launch").remove();
        document.getElementById("main").style.display = "block";
        document.getElementById("main-before").style.display = "block";
        document.getElementById("main-play").style.display = "none";
    });

    document.getElementById("main").style.display = "none";
    document.getElementById("btn-yes").addEventListener("click", () => {
        document.getElementById("main-before").style.display = "none";
        document.getElementById("main-play").style.display = "block";
        playerIndex = 0;
        Stats.reset();
        nextTurn(players[0]);
    });
    document.getElementById("btn-no").addEventListener("click", () => createGame());
    btn = document.getElementById("btn-turn");
    btn.addEventListener("click", async () => {
        listenerDisabled = true;
        btn.disabled = true;
        if (human.clickedCluster !== undefined) drawCluster(human.clickedCluster.corners, human.id);
        await afterTurn(human);
    });
    btn.disabled = true;
    let div = document.getElementById("stage"), canvas;
    for (let i = 0; i <= CLUSTERS_MAX; i++) {
        canvas = document.createElement("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        div.appendChild(canvas);
        if (i === 0) setBackgroundCtx(canvas);
        else setForegroundCtx(canvas);
    }
    canvas.addEventListener("click", async event => {
        event.stopPropagation();
        if (listenerDisabled) return;
        let rect = canvas.getBoundingClientRect();
        let otherId = human.click({x: event.clientX - rect.left, y: event.clientY - rect.top});
        if (otherId !== undefined && human.afterSuccessfulMove(clusters, players, otherId)) await end(true);
    }, false);

    document.getElementById("end").style.display = "none";
    document.getElementById("btn-restart").addEventListener("click", () => {
        createGame();
        document.getElementById("end").style.display = "none";
        document.getElementById("main").style.display = "block";
        document.getElementById("main-before").style.display = "block";
        document.getElementById("main-play").style.display = "none";
    });
}

function createGame(colorI = 0) {
    clusters = createClusters(centerNode);
    [players, human] = createPlayers(clusters);
    setColor(human.id, colorI);
    drawInit(board, clusters, players);
}

function nextTurn(player) {
    if (player === human) {
        [listenerDisabled, btn.disabled] = [false, false];
        human.clickableClusters = clusters.filter(c => c.playerId === human.id && c.dices > 1
            && c.adjacentClustersFromCluster().some(c => c.playerId !== human.id));
        Stats.set.rounds();
    }
    player.turn(clusters, players, async () => await afterTurn(player), end);
}

function afterTurn(player) {
    return new Promise(resolve => {
        setTimeout(() => {
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
            }, next.id !== human.id ? TIMEOUT_BG : 0);
        }, player.id !== human.id ? TIMEOUT_BG : 0);
    }).then((next) => nextTurn(next));
}

function end(won) {
    return new Promise(resolve => {
        listenerDisabled = true;
        btn.disabled = true;
        setTimeout(() => {
            document.getElementById("main").style.display = "none";
            document.getElementById("end").style.display = "block";
            if (won) document.getElementById("h-end").textContent = "You won!";
            else document.getElementById("h-end").textContent = "You lost.";
            for (let key in Stats.get) document.getElementById(`li-end-${key}`).textContent = Stats.get[key]();
            resolve();
        }, TIMEOUT_BG);
    });
}

main();
