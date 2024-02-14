import {createBoard} from "../js/board.js";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createTestClusters1, createTestClusters2} from "./bootstrap.js";

let board;
beforeEach(() => {
    board = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[0];
});

test('path on small board', () => {
    let clusters = createTestClusters1(board);
    let from = clusters[0], to = clusters[5];

    let path = from.path(to);

    // log(path, from, to);
    expect(path.map(c => c.id)).toEqual([0, 1, 4, 5]);
});

test('path on big board', () => {
    let clusters = createTestClusters2(board);
    let from = clusters[0], to = clusters[6];

    let path = from.path(to);

    // log(path, from, to);
    expect(path.map(c => c.id)).toEqual([0, 9, 6]);
});

// noinspection JSUnusedLocalSymbols
function log(path, from, to) {
    if (path) console.log(`Path from ${from.id} to ${to.id}: ${path.map(c => c.id).join(', ')} (steps: ${path.length - 1})`);
    else console.log(`No path from ${from.id} to ${to.id}`);
}