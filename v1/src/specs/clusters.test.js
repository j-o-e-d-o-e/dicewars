import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {CANVAS_HEIGHT, CANVAS_WIDTH, CLUSTERS_MAX} from "../js/info.js";

test('create clusters', () => {
    const [_, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    let act = createClusters(startNode);
    expect(act).toHaveLength(CLUSTERS_MAX);
});