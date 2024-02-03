import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";
import {Comp} from "../js/player-comp.js";

let clusters, players, comp;

beforeEach(() => {
    let startNode = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[1];
    clusters = createClusters(startNode);
    players = createPlayers(clusters)[0];
    comp = players[0];
});

test('mightyOther by clusters', () => {
    let other = players.find(p => p.id !== comp.id);
    clusters.slice(0, Math.floor(clusters.length / players.length * Comp.THRESHOLD_FACTOR))
        .forEach(c => [c.playerId, c.dices] = [other.id, 1]);

    let res = comp.mightyOther(clusters, players);

    expect(res).toBe(other);
});

test('mightyOther by dices', () => {
    let other = players.find(p => p.id !== comp.id);
    clusters.slice(0, Math.floor(clusters.length / players.length * Comp.THRESHOLD_FACTOR / 2))
        .forEach(c => [c.playerId, c.dices] = [other.id, 8]);

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
    let cluster = clusters[0];
    cluster.playerId = comp.id;
    cluster.getAdjacentClustersFromCluster().forEach(c => c.playerId = cluster.playerId);

    let res = comp.paths(clusters);
    res.sort((a, b) => b.length - a.length);
    console.log(res.map(r => r.map(c => c.id).sort()).join("\n"));

    expect(res[0].length).toBeGreaterThanOrEqual(4);
    for (let clusters of res.slice(1)) {
        for (let cluster of clusters)
            expect(res[0].includes(cluster)).toBeFalsy();
    }
});