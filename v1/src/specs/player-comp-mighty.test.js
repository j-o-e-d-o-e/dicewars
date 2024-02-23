import {createBoard} from "../js/board.js";
import {createTestClusters} from "./bootstrap.js";
// noinspection ES6UnusedImports: avoid 'ReferenceError: Cannot access 'Player' before initialization'
import {Human} from "../js/player-human.js";
import {Comp} from "../js/player-comp.js";

let board, players, comp;

beforeAll(() => {
    board = createBoard()[0];
    comp = new Comp(0);
    players = [comp, new Comp(1), new Comp(2)];
});

test('mighty other on small board', () => {
    let clusters = createTestClusters(board, 5);
    for (let player of players) player.setDices(clusters);

    let  [mighty] = comp.mightyOthers(clusters, players);

    expect(mighty.id).toBe(2);
});

test('mighty other on big board', () => {
    let clusters = createTestClusters(board, 6);
    for (let player of players) player.setDices(clusters);

    let [mighty] = comp.mightyOthers(clusters, players);

    expect(mighty.id).toBe(2);
});
