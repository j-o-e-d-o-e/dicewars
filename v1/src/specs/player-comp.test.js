import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";
import {Comp} from "../js/player-comp.js";
import {Cluster} from "../js/cluster.js";
import {Player} from "../js/player.js";

let clusters, players, comp;

beforeEach(() => {
    let startNode = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[1];
    Cluster.count = 0;
    clusters = createClusters(startNode);
    Player.count = 0;
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
    clusters.slice(0, Math.floor(clusters.length / players.length * Comp.THRESHOLD_FACTOR))
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
