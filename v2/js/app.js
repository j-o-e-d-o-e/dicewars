import {CANVAS_WIDTH, CANVAS_HEIGHT, CLUSTERS_MAX, TIMEOUT_BG, setPlayers, setSizes} from './info.js';
import {createBoard} from './board.js';
import {createClusters} from "./clusters.js";
import {createPlayers} from "./players.js";
import {
  loadImages, setColor, setBackgroundCtx, addDicesCtx,
  drawInit, drawCluster, drawDices, drawDicesNums, drawDicesBar,
} from "./draw.js";
import Stats from "./stats.js";

let board, centerNode;
let btn, listenerDisabled = true;
let clusters, players, human, playerIndex = 0;

function main() {
  setSizes(screen.height);
  [board, centerNode] = createBoard();
  loadImages().then(() => {
    init();
    // testDisplay();
  });
}

// noinspection JSUnusedLocalSymbols
function testDisplay() {
  createGame();
  toggleHidden(["launch", "main", "main-play"]);
  // end(false).then(()=> toggleHidden(["launch", "main"]));
}

function init() {
  document.getElementById("btn-launch").addEventListener("click", handleLaunchClick);
  document.getElementById("btn-yes").addEventListener("click", handleYesClick);
  document.getElementById("btn-no").addEventListener("click", () => createGame());
  btn = document.getElementById("btn-turn");
  btn.addEventListener("click", handleTurnClick);
  btn.disabled = true;
  const foregroundCanvas = stageCanvases();
  foregroundCanvas.addEventListener("click", event => handleCanvasClick(event), false);
  document.getElementById("btn-restart").addEventListener("click", handleRestartClick);
}

function stageCanvases() {
  let div = document.getElementById("stage"), canvas;
  for (let i = 0; i <= CLUSTERS_MAX; i++) {
    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    div.appendChild(canvas);
    if (i === 0) setBackgroundCtx(canvas);
    else addDicesCtx(canvas);
  }
  return canvas;
}

function handleLaunchClick() {
  let players = document.forms["form-players"].getElementsByTagName("input");
  for (let player of players) {
    if (player.checked) {
      setPlayers(player.value);
      break;
    }
  }
  let colors = document.forms["form-colors"].getElementsByTagName("input");
  for (let color of colors) {
    if (color.checked) {
      createGame(color.value);
      break;
    }
  }
  document.getElementById("launch").remove();
  toggleHidden(["main", "main-before"]);
}

function handleYesClick() {
  toggleHidden(["main-before", "main-play"]);
  playerIndex = 0;
  Stats.reset();
  nextTurn(players[0]);
}

async function handleCanvasClick(event) {
  event.preventDefault();
  event.stopPropagation();
  if (listenerDisabled) return;
  let rect = event.target.getBoundingClientRect();
  let otherId = human.click({x: event.clientX - rect.left, y: event.clientY - rect.top});
  if (otherId !== undefined) {
    if (human.afterSuccessfulAttack(clusters, players, otherId)) {
      await end(true);
      return;
    }
    human.setClickables(clusters);
  }
}

async function handleTurnClick() {
  listenerDisabled = true;
  btn.disabled = true;
  if (human.clickedCluster !== undefined) drawCluster(human.clickedCluster.corners, human.id);
  await afterTurn(human);
}

function handleRestartClick() {
  createGame();
  toggleHidden(["end", "main", "main-before"])
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
    human.setClickables(clusters);
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
      toggleHidden(["main", "main-play", "end"]);
      if (won) document.getElementById("h-end").textContent = "You won!";
      else document.getElementById("h-end").textContent = "You lost.";
      for (let key in Stats.get) document.getElementById(`li-end-${key}`).textContent = Stats.get[key]();
      resolve();
    }, TIMEOUT_BG);
  });
}

function toggleHidden(ids) {
  for (let id of ids) document.getElementById(id).classList.toggle("hidden");
}

main();
