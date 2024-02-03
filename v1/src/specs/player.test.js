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

test('allocate dices to all clusters', () => {
    player.dices = clusters.length;
    let dicesBefore = 0;
    for (let c of clusters) {
        c.playerId = player.id;
        dicesBefore += c.dices;
    }

    player.allocateNewDices(clusters);

    let dicesAfter = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);
    expect(dicesAfter).toBe(dicesBefore + player.dices);
});

test('allocate dices to some clusters', () => {
    player.dices = 5;
    let dicesBefore = 0;
    for (let [i, c] of clusters.entries()) {
        if (i < player.dices) {
            c.playerId = player.id;
            dicesBefore += c.dices;
        } else c.playerId = undefined;
    }

    player.allocateNewDices(clusters);

    let dicesAfter = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);
    expect(dicesAfter).toBe(dicesBefore + player.dices);
});

test('allocate all dices', () => {
    player.dices = 5;
    const ADD_DICES = 4;
    player.additionalDices = ADD_DICES;
    let dicesBefore = 0;
    for (let [i, c] of clusters.entries()) {
        if (i < player.dices) {
            c.playerId = player.id;
            c.dices = 6;
            dicesBefore += c.dices;
        } else c.playerId = undefined;
    }

    player.allocateNewDices(clusters);

    let _clusters = clusters.filter(c => c.playerId === player.id)
    let dicesAfter = _clusters.reduce((acc, c) => acc + c.dices, 0);
    expect(dicesAfter).toBe(dicesBefore + player.dices + ADD_DICES);
    expect(player.additionalDices).toBe(0);
    expect(_clusters.filter(c => c.dices < 8).length).toBe(1)
});

test('allocate some dices, keep small surplus', () => {
    player.dices = 5;
    player.additionalDices = 12;
    let dicesBefore = 0;
    for (let [i, c] of clusters.entries()) {
        if (i < player.dices) {
            c.playerId = player.id;
            c.dices = 5;
            dicesBefore += c.dices
        } else c.playerId = undefined;
    }

    player.allocateNewDices(clusters);

    let dicesAfter = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);
    expect(dicesAfter).toBe(8 * player.dices);
    expect(player.additionalDices).toBe(2);
});

test('allocate some dices, keep big surplus', () => {
    player.dices = 5;
    player.additionalDices = 20;
    let dicesBefore = 0;
    for (let [i, c] of clusters.entries()) {
        if (i < player.dices) {
            c.playerId = player.id;
            c.dices = 5;
            dicesBefore += c.dices
        } else c.playerId = undefined;
    }

    player.allocateNewDices(clusters);

    let dicesAfter = clusters.filter(c => c.playerId === player.id)
        .reduce((acc, c) => acc + c.dices, 0);
    expect(dicesAfter).toBe(8 * player.dices);
    expect(player.additionalDices).toBe(20 - 15 + player.dices);
});
