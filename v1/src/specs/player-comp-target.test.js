import {createBoard} from "../js/board.js";
import {createTestClusters} from "./bootstrap.js";
import {createTestComp} from "../js/players.js";

let clusters;

beforeAll(() => {
    let board = createBoard()[0];
    clusters = createTestClusters(board, 4);
});

test('target with 2 dices less is preferred', () => {
    let comp = createTestComp(1);
    let cluster = clusters[10];

    let target = comp.target(cluster);

    expect(target.playerId).not.toBe(comp.id);
    expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
    expect(target.id).toBe(9);
});

test('target with more dices is preferred', () => {
    let comp = createTestComp(2);
    let cluster = clusters[13];

    let target = comp.target(cluster);

    expect(target.playerId).not.toBe(comp.id);
    expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
    expect(target.id).toBe(15);
});
