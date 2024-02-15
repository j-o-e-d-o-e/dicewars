import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createTestClusters5, createTestClusters6} from "./bootstrap.js";
import {createComp} from "../js/players.js";

let board, players, comp;

beforeAll(() => {
    board = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[0];
    comp = createComp(0);
    players = [comp, createComp(1), createComp(2)];
});

test('mighty other on small board', () => {
    let clusters = createTestClusters5(board);
    for (let player of players) player.setDices(clusters);

    let mighty = comp.mightyOther(clusters, players);

    expect(mighty?.id).toBe(2);
});

test('mighty other on big board', () => {
    let clusters = createTestClusters6(board);
    for (let player of players) player.setDices(clusters);

    let mighty = comp.mightyOther(clusters, players);

    expect(mighty?.id).toBe(2);
});
