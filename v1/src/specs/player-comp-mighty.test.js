import {createBoard} from "../js/board.js";
import {createTestComp} from "../js/players.js";
import {createTestClusters} from "./bootstrap.js";

let board, players, comp;

beforeAll(() => {
    board = createBoard()[0];
    comp = createTestComp(0);
    players = [comp, createTestComp(1), createTestComp(2)];
});

test('mighty other on small board', () => {
    let clusters = createTestClusters(board, 5);
    for (let player of players) player.setDices(clusters);

    let mighty = comp.mightyOther(clusters, players);

    expect(mighty?.id).toBe(2);
});

test('mighty other on big board', () => {
    let clusters = createTestClusters(board, 6);
    for (let player of players) player.setDices(clusters);

    let mighty = comp.mightyOther(clusters, players);

    expect(mighty?.id).toBe(2);
});
