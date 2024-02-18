import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {Cluster} from "../js/cluster.js";

let clusters;

beforeEach(() => {
    let startNode = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[1];
    Cluster.count = 0;
    clusters = createClusters(startNode);
});

test('get adjacent clusters from cluster', () => {
    let adjacentClusters = clusters[0].adjacentClustersFromCluster();

    expect(adjacentClusters.length).toBeGreaterThanOrEqual(1);
});

test('get region with all clusters', () => {
    clusters.forEach(c => c.playerId = 0);

    let region = clusters[0].region();

    expect(region.length).toBe(clusters.length);
});

test('two regions do not overlap', () => {
    clusters.slice(0, 5).forEach(c => c.playerId = 1);
    let cluster1 = clusters[0];
    clusters.slice(-5).forEach(c => c.playerId = 2);
    let cluster2 = clusters.find(c => c.playerId === 2)

    let region1 = cluster1.region();
    let region2 = cluster2.region();

    for (let cluster of region1) expect(region2.includes(cluster)).toBeFalsy();
});
