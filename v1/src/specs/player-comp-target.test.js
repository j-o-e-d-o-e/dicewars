import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createComp} from "../js/players.js";
import {createTestClusters} from "./bootstrap.js";

let clusters;

beforeAll(() => {
    let board = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[0];
    clusters = createTestClusters(board, 4);
});

test('target with 2 dices less is preferred', () => {
    let comp = createComp(1);
    let cluster = clusters[10];

    let target = comp.target(cluster);

    expect(target.playerId).not.toBe(comp.id);
    expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
    expect(target.id).toBe(9);
});

test('target with more dices is preferred', () => {
    let comp = createComp(2);
    let cluster = clusters[13];

    let target = comp.target(cluster);

    expect(target.playerId).not.toBe(comp.id);
    expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
    expect(target.id).toBe(15);
});
