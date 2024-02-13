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

    let paths = comp.pathsBetweenRegions(clusters);

    // log(paths);
    const exp = [
        {from: 5, to: 8, path: [5, 6, 7, 8]},
        {from: 4, to: 1, path: [4, 3, 2, 1]},
        {from: 8, to: 5, path: [8, 7, 6, 5]}
    ];
    expect(paths).toHaveLength(exp.length);
    for (let [index, pathsBetweenTwoRegions] of paths.entries()) {
        expect(pathsBetweenTwoRegions.from.cluster.id).toBe(exp[index].from)
        expect(pathsBetweenTwoRegions.to.cluster.id).toBe(exp[index].to)
        expect(pathsBetweenTwoRegions.paths[0].path.map(c => c.id)).toEqual(exp[index].path);
    }
});

test('paths on big board', () => {
    let clusters = createTestClusters4(board);

    let paths = comp.pathsBetweenRegions(clusters);

    // log(paths);
    const exp = [
        {from: 1, to: 6, path: [1, 3, 6]},
        {from: 1, to: 15, path: [1, 3, 8, 9, 12, 14, 15]},
        {from: 2, to: 6, path: [2, 4, 3, 6]},
        {from: 2, to: 15, path: [2, 4, 8, 9, 12, 14, 15]}
    ];
    expect(paths).toHaveLength(exp.length);
    for (let [index, pathsBetweenTwoRegions] of paths.entries()) {
        expect(pathsBetweenTwoRegions.from.cluster.id).toBe(exp[index].from)
        expect(pathsBetweenTwoRegions.to.cluster.id).toBe(exp[index].to)
        expect(pathsBetweenTwoRegions.paths[0].path.map(c => c.id)).toEqual(exp[index].path);
    }
});

// noinspection JSUnusedLocalSymbols
function log(paths) {
    // noinspection DuplicatedCode
    for (let pathsBetweenTwoRegions of paths) {
        let from = pathsBetweenTwoRegions.from;
        let to = pathsBetweenTwoRegions.to;
        if (pathsBetweenTwoRegions.paths.length === 0) console.log(`no path found: ${from.cluster.id} (region: ${from.region}) -> ${to.cluster.id} (region: ${to.region})`);
        for (let path of pathsBetweenTwoRegions.paths) {
            console.log(`Path from ${from.cluster.id} (region: ${from.region}) to ${to.cluster.id} (region: ${to.region}): `
                + `${path.path.map(c => c.id).join(', ')} (steps: ${path.path.length - 1})`
                + `\nMoves:\n\t- ${path.moves.join('\n\t- ')}`);
        }
    }
}