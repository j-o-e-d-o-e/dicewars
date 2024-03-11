import {createBoard} from "../js/board.js";
import {createTestClusters} from "./bootstrap.js";
// noinspection ES6UnusedImports: avoid 'ReferenceError: Cannot access 'Player' before initialization'
import {Human} from "../js/player-human.js";
import {Comp} from "../js/player-comp.js";

let board, comp;

beforeEach(() => {
    board = createBoard()[0];
    comp = new Comp(0);
});

test('paths on small board', () => {
    let clusters = createTestClusters(board, 3);

    let path = comp.path(clusters);

    // log(path);
    expect(path.map(c => c.id)).toEqual([5, 6, 7, 8]);
});

test('paths on big board', () => {
    let clusters = createTestClusters(board, 4);

    let path = comp.path(clusters);

    log(path);
    expect(path.map(c => c.id)).toEqual([1, 3, 6]);
});

function log(path) {
    if (path) console.log(`Path from ${path[0].id} to ${path[0].id}: `
        + `${path.map(c => c.id).join(', ')} (steps: ${path.length - 1})`);
    else console.log("No path found.");
}
