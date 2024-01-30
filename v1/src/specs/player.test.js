import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";

let clusters, player;

beforeAll(() => {
    let [_, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(startNode);
    player = createPlayers(clusters)[1];
});

test('allocate new dices for all clusters', () => {
    clusters.forEach(c => c.playerId = player.id);
    let dicesBefore = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);

    player.setDices(clusters);
    player.allocateNewDices(clusters);

    let dicesAfter = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);
    expect(dicesAfter).toBe(dicesBefore + clusters.length);
});

test('allocate new dices for first 5 clusters', () => {
    const EXP_NEW_DICES = 5;
    clusters.forEach((c, i) => {
        if (i < EXP_NEW_DICES) c.playerId = player.id;
        else c.playerId = -1;
    });
    let dicesBefore = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);

    player.setDices(clusters);
    player.allocateNewDices(clusters);

    let dicesAfter = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);
    expect(dicesAfter).toBe(dicesBefore + EXP_NEW_DICES);
});
