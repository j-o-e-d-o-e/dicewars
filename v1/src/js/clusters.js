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
    Cluster.count = 0;
    clusters.sort((a, b) => a.centerPos.y - b.centerPos.y);
    for (let cluster of clusters) {
        cluster.id = Cluster.count++
        cluster.neighbours();
        delete cluster.nodes;
    }
    log(clusters);
    return clusters;
}

function getRandomAdjacentNodeFromCluster(cluster) {
    let candidates = cluster.adjacentNodesFromCluster().filter(n => n.cluster === undefined
        && n.adjacentNodesFromNode().filter(n => n.cluster === undefined).length >= MIN_NEIGHBOURS_NODE);
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
    console.log(`${clusters.length} clusters created with ${clusters.reduce((acc, current) => acc + current.dices, 0)} dices`);
}
