import {PLAYERS} from "./info.js";
import {Human} from "./player-human.js";
import {Comp} from "./player-comp.js";

export function createPlayers(clusters) {
    let players = [];
    let playerProb = 0.3, playerIndex;
    for (let i = 0; i < PLAYERS; i++) {
        if (playerIndex === undefined && players.length > 0 && (Math.random() < playerProb || i === PLAYERS - 1)) {
            players.push(new Human());
            playerIndex = i;
        } else {
            players.push(new Comp());
            playerProb += 0.1;
        }
    }
    let index = 0;
    for (let cluster of clusters) {
        cluster.playerId = players[index++].id;
        if (index >= PLAYERS) index = 0;
    }
    for (let player of players) player.setDices(clusters);
    log(players)
    return [players, players[playerIndex]];
}

function log(players) {
    console.log(`${players.length} players created:
    ${players.map(p => "- " + `${p instanceof Human ? "Human" : "Comp"}` + JSON.stringify(p)).join("\n\t")}`);
}