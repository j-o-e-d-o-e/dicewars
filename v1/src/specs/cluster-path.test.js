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

    let paths = from.paths(to);

    log(paths, from, to);
});
test('path on big board', () => {
    let clusters = createTestClusters2(board);
    let from = clusters[0], to = clusters[6];

    let paths = from.paths(to);

    log(paths, from, to);
});

function log(paths, from, to) {
    if (paths.length === 0) console.log(`no path found: ${from.id} -> ${to.id}`);
    else
        for (let path of paths) {
            console.log(`Path from ${from.id} to ${to.id}: ${path.path.map(c => c.id).join(', ')} (steps: ${path.path.length - 1})\nMoves:\n\t- ${path.moves.join('\n\t- ')}`);
        }
}