import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";
import {Comp} from "../js/player-comp.js";

let clusters, players, comp;

beforeAll(() => {
    let [_, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(startNode);
    players = createPlayers(clusters)[0];
    comp = players[0];
});

test('mightyOther', () => {
    const THRESHOLD_FACTOR = 1.8;
    let other = players.find(p => p instanceof Comp && p.id !== comp.id);
    other.dices = clusters.reduce((acc, c) => acc + c.dices, 0)
        / players.length * THRESHOLD_FACTOR;
    clusters.forEach((c, i) => {
        if (i < clusters.length / players.length * THRESHOLD_FACTOR)
            c.playerId = other.id
    });
    let res = comp.mightyOther(clusters, players);
    expect(res).toBe(other);
});

test('target', () => {
    let cluster = clusters.find(c => c.playerId === comp.id);
    cluster.dices = 8;
    let res = comp.target(cluster);
    expect(res.playerId).not.toBe(comp.id);
    expect(res.dices).toBeLessThanOrEqual(cluster.dices);
});

test('paths', () => {
    let compClusters = clusters.filter(c => c.playerId === comp.id);
    // noinspection JSUnusedLocalSymbols
    let res = comp.paths(compClusters);
});