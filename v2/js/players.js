import {PLAYERS} from "./info.js";
import {Human} from "./player-human.js";
import {Comp} from "./player-comp.js";

export function createPlayers(clusters) {
    Comp.thresholds(clusters);
    let players = [];
    let playerProb = 0.3, playerIndex;
    for (let i = 0; i < PLAYERS; i++) {
        if (playerIndex === undefined && players.length > 0 && (Math.random() < playerProb || i === PLAYERS - 1)) {
            players.push(new Human(i));
            playerIndex = i;
        } else {
            players.push(new Comp(i));
            playerProb += 0.1;
        }
    }
    let index = 0;
    for (let cluster of clusters) {
        cluster.playerId = players[index++].id;
        if (index >= PLAYERS) index = 0;
    }
    for (let player of players) player.setDices(clusters);
    let human = players[playerIndex];
    human.clickableClusters = clusters.filter(c => c.playerId === human.id && c.dices > 1);
    log(players, clusters);
    return [players, human];
}

function log(players, clusters) {
    console.log(`${players.length} players created:
    ${players.map(p => `- ${p instanceof Human ? "Human" : "Comp"} with ${JSON.stringify({
        dices: p.dices,
        clusters: clusters.reduce((acc, c) => c.playerId === p.id ? ++acc : acc, 0),
        allDices: clusters.reduce((acc, c) => c.playerId === p.id ? acc + c.dices : acc, 0)
    })}`).join("\n\t")}`);
}
