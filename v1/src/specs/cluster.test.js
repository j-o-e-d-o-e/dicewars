import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";

let board, startNode, clusters, players, player;

beforeAll(() => {
    [board, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(startNode);
    [players, player] = createPlayers(clusters);

});

test('get region size with all clusters', () => {
    clusters.forEach(c => c.playerId = 0);
    let size = clusters[0].getRegionSize();
    expect(size).toBe(clusters.length);
});

test('get region size with first 5 clusters', () => {
    const EXP_SIZE = 5;
    clusters.forEach((c, i) => {
        if (i < EXP_SIZE) c.playerId = 0;
        else c.playerId = 1;
    });
    let size = clusters[0].getRegionSize();
    expect(size).toBe(EXP_SIZE);
});