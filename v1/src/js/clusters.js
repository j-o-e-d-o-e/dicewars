import {CLUSTERS_MAX} from "./info.js";
import {Cluster} from "./cluster.js";

const MIN_NEIGHBOURS_NODE = 3;
let paths, bigCount, smallCount;

export function createClusters(startNode) {
    [paths, bigCount, smallCount] = [4, 0, 0];
    let clusters = [new Cluster(startNode)];
    while (clusters.length <= paths) {
        let node = getRandomAdjacentNodeFromCluster(clusters[0]);
        if (node === undefined) continue;
        clusters.push(new Cluster(node));
    }
    while (clusters.length < CLUSTERS_MAX && paths >= 0) {
        let index = getNextClusterIndex();
        let node = getRandomAdjacentNodeFromCluster(clusters[index]);
        if (node === undefined) continue;
        clusters.push(new Cluster(node));
        if ((clusters.length - 1) % paths === 0) bigCount += paths;
    }
    log(clusters);
    return clusters;
}

function getRandomAdjacentNodeFromCluster(cluster) {
    let candidates = cluster.getAdjacentNodesFromCluster().filter(n => n.cluster === undefined
        && n.getAdjacentNodesFromNode().filter(n => n.cluster === undefined).length >= MIN_NEIGHBOURS_NODE);
    if (candidates.length === 0) {
        paths--;
        if (++smallCount >= paths) smallCount = 0;
        return;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
}

function getNextClusterIndex() {
    let res = bigCount + smallCount++ + 1;
    if (smallCount === paths) smallCount = 0;
    return res;
}

function log(clusters) {
    console.log(`${clusters.length} clusters created with ${JSON.stringify(clusters.reduce((acc, current) => {
        acc.nodes += current.nodes.length;
        acc.dices += current.dices;
        return acc;
    }, {nodes: 0, dices: 0}))}`);
}
