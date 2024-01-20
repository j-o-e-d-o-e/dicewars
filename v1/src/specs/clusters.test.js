import {CANVAS_HEIGHT, CANVAS_WIDTH, CLUSTERS_MAX} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {Cluster} from "../js/cluster.js";

let board, startNode;

beforeEach(() => {
    [board, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
});

test('create clusters', () => {
    let act = createClusters(startNode);
    expect(act).toHaveLength(CLUSTERS_MAX);
});

test('create single cluster', () => {
    let act = new Cluster(startNode, 0);
    expect(act).toHaveProperty("id");
    expect([startNode, ...startNode.getAdjacentNodesFromNode()]
        .every(n => act.nodes.includes(n))).toBeTruthy();
    expect(act).toHaveProperty("centerPos");
    expect(act).toHaveProperty("corners");
});