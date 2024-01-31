import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {Cluster} from "../js/cluster.js";

let board, startNode;

beforeEach(() => {
    [board, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
});

test('create clusters', () => {
    let clusters = createClusters(startNode);
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
    let cluster = new Cluster(startNode, 0);
    expect(cluster).toHaveProperty("id");
    expect([startNode, ...startNode.getAdjacentNodesFromNode()]
        .every(n => cluster.nodes.includes(n))).toBeTruthy();
    expect(cluster).toHaveProperty("centerPos");
    expect(cluster).toHaveProperty("corners");
});