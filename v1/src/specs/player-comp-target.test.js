import {createBoard} from "../js/board.js";
import {createTestClusters} from "./bootstrap.js";
// noinspection ES6UnusedImports: avoid 'ReferenceError: Cannot access 'Player' before initialization'
import {Human} from "../js/player-human.js";
import {Comp} from "../js/player-comp.js";

let clusters;

beforeAll(() => {
    let board = createBoard()[0];
    clusters = createTestClusters(board, 4);
});

test('target with 2 dices less is preferred', () => {
    let comp = new Comp(1);
    let cluster = clusters[10];

    let target = comp.target(cluster);

    expect(target.playerId).not.toBe(comp.id);
    expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
    expect(target.id).toBe(9);
});

test('target with more dices is preferred', () => {
    let comp = new Comp(2);
    let cluster = clusters[13];

    let target = comp.target(cluster);

    expect(target.playerId).not.toBe(comp.id);
    expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
    expect(target.id).toBe(15);
});
