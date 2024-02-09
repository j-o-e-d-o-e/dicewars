import {CANVAS_HEIGHT, CANVAS_WIDTH, CLUSTER_MIN_SIZE} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {Cluster} from "../js/cluster.js";

let clusters;

beforeEach(() => {
    let startNode = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT)[1];
    Cluster.count = 0;
    clusters = createClusters(startNode);
});

test('get adjacent nodes from cluster', () => {
    let cluster = clusters[0];

    let nodes = cluster.adjacentNodesFromCluster();

    expect(nodes.length).toBeGreaterThan(CLUSTER_MIN_SIZE);
    for (let node of nodes) {
        expect(cluster.nodes.includes(node)).toBeFalsy();
        expect(node.cluster?.id).not.toBe(cluster.id);
    }
});

test('get adjacent clusters from cluster', () => {
    const CLUSTERS_SIZE = 4;
    clusters.slice(CLUSTERS_SIZE).forEach(c => c.nodes.forEach(n => n.cluster = undefined));
    clusters = clusters.slice(0, CLUSTERS_SIZE);
    let cluster = clusters[0];

    let adjacentClusters = cluster.adjacentClustersFromCluster();

    expect(adjacentClusters.length).toBe(CLUSTERS_SIZE - 1);
    for (let adjacentCluster of adjacentClusters) {
        for (let node of cluster.nodes)
            expect(adjacentCluster.nodes.includes(node)).toBeFalsy();
    }
});

test('get region with all clusters', () => {
    clusters.forEach(c => c.playerId = 0);

    let region = clusters[0].region();

    expect(region.length).toBe(clusters.length);
});

test('get region with first 5 clusters', () => {
    const EXP_SIZE = 5;
    clusters.slice(0, EXP_SIZE).forEach(c => c.playerId = 1);

    let region = clusters[0].region();

    expect(region.length).toBe(EXP_SIZE);
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

test('path', () => {
    let from = clusters[0];
    from.dices = 8;
    let to = clusters[5];

    let paths = from.paths(to);
    console.log(paths);
});