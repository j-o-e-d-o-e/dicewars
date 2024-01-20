import {CANVAS_WIDTH, CANVAS_HEIGHT, CLUSTERS_MAX} from './info.js';
import {createBoard} from './board.js';
import {createClusters} from "./clusters.js";
import {createPlayers} from "./players.js";
import {draw, drawInit} from "./draw.js";

let clusters, players, player;

function main() {
    setup();
    // TODO: 1. no infinite loop during setup 2. game-loop
    // for (let player of players) {
    //     if (player instanceof Human) {
    //         console.log(`Human's turn...`);
    //         return;
    //     }
    //     console.log(`${player.id}'s turn...`);
    // }
}

function setup() {
    let div = document.getElementById("stage");
    for (let i = 0; i <= CLUSTERS_MAX; i++) {
        let canvas = document.createElement("canvas");
        canvas.id = "canvas-" + i;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        if (i === 0) canvas.style.background = "#eee"; // background
        if (i === CLUSTERS_MAX) canvas.addEventListener("click", (event) => {
            player.turn({x: event.clientX, y: event.clientY}, clusters);
            // let point = {x: event.clientX, y: event.clientY};
            // console.log(`clicked ${JSON.stringify(point)}`);
            // let ctx = document.getElementById("canvas-2").getContext("2d")
            // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            // ctx.beginPath();
            // ctx.strokeStyle = "green";
            // ctx.arc(point.x, point.y, RADIUS_IN_HEX, 0, Math.PI * 2);
            // ctx.stroke();
            // for (let node of board) if (Math.pow(point.x - node.hex.center.x, 2) + Math.pow(point.y - node.hex.center.y, 2) < Math.pow(RADIUS_IN_HEX, 2)){
            //     console.log(`hit ${node.id}: ${JSON.stringify(node.hex)}`);
            //     console.log(node.hex)
            //     break;
            // }
        }, false); // foreground
        div.appendChild(canvas);
    }
    const [board, centerNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(centerNode);
    console.log(`${clusters.length} clusters created with ${JSON.stringify(clusters.reduce((acc, current) => {
        acc.nodes += current.nodes.length;
        acc.dices += current.dices;
        return acc;
    }, {nodes: 0, dices: 0}))}`);
    [players, player] = createPlayers(clusters);
    player.clickableClusters = clusters.filter(c => c.playerId === player.id && c.dices > 1);
    drawInit(player.id);
    draw(board, clusters);
}

main();
