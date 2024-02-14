import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createTestClusters3, createTestClusters4} from "./bootstrap.js";
import {createComp} from "../js/players.js";

let board, comp;

beforeEach(() => {
    board = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[0];
    comp = createComp(0);
});

test('paths on small board', () => {
    let clusters = createTestClusters3(board);

    let path = comp.path(clusters);

    // log(path);
    expect(path.map(c => c.id)).toEqual([5, 6, 7, 8]);
});

test('paths on big board', () => {
    let clusters = createTestClusters4(board);

    let path = comp.path(clusters);

    log(path);
    expect(path.map(c => c.id)).toEqual([1, 3, 6]);
});

function log(path) {
    if (path) console.log(`Path from ${path[0].id} to ${path[0].id}: `
        + `${path.map(c => c.id).join(', ')} (steps: ${path.length - 1})`);
    else console.log("No path found.");
}