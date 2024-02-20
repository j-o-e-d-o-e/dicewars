import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {Cluster} from "../js/cluster.js";

let centerNode;

beforeEach(() => {
    centerNode = createBoard()[1];
});

test('create clusters', () => {
    let clusters = createClusters(centerNode);
    for (let cluster of clusters) {
        expect(cluster.id).toBeDefined();
        expect(cluster.dices).toBeGreaterThanOrEqual(0);
        expect(cluster.dices).toBeLessThanOrEqual(6);
        expect(cluster.centerPos).toHaveProperty("x");
        expect(cluster.centerPos).toHaveProperty("y");
        expect(cluster.corners[0]).toHaveProperty("x");
        expect(cluster.corners[0]).toHaveProperty("y");
    }
});

test('create single cluster', () => {
    let cluster = new Cluster(centerNode, 0);
    expect(cluster).toHaveProperty("id");
    expect([centerNode, ...centerNode.adjacentNodesFromNode()]
        .every(n => cluster.nodes.includes(n))).toBeTruthy();
    expect(cluster).toHaveProperty("centerPos");
    expect(cluster).toHaveProperty("corners");
});