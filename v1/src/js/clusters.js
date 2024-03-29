import {CLUSTERS_MAX} from "./info.js";
import {Cluster} from "./cluster.js";

const MIN_NEIGHBOURS_NODE = 3;
let paths, bigCount, smallCount;

export function createClusters(centerNode) {
    [paths, bigCount, smallCount] = [4, 0, 0];
    let id = 0;
    let clusters = [new Cluster(id++, centerNode)];
    while (clusters.length <= paths) {
        let node = getRandomAdjacentNodeFromCluster(clusters[0]);
        if (node === undefined) continue;
        clusters.push(new Cluster(id++, node));
    }
    while (clusters.length < CLUSTERS_MAX && paths >= 0) {
        let index = getNextClusterIndex();
        let node = getRandomAdjacentNodeFromCluster(clusters[index]);
        if (node === undefined) continue;
        clusters.push(new Cluster(id++, node));
        if ((clusters.length - 1) % paths === 0) bigCount += paths;
    }
    for (let cluster of clusters) cluster.neighbours();
    clusters.sort((a, b) => a.center.y - b.center.y);
    for (let [i, cluster] of clusters.entries()) {
        cluster.id = i;
        for (let node of cluster.nodes) node.cluster = undefined;
        delete cluster.nodes;
    }
    transpose(clusters, centerNode);
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

function transpose(clusters, centerNode) {
    let mostLeftPos, mostRightPos;
    for (let cluster of clusters) {
        if (!mostLeftPos || cluster.center.x < mostLeftPos.x) mostLeftPos = cluster.center;
        if (!mostRightPos || cluster.center.x > mostRightPos.x) mostRightPos = cluster.center;
    }
    let diffL = centerNode.hex.center.x - mostLeftPos.x;
    let diffR = mostRightPos.x - centerNode.hex.center.x;
    let diffV = Math.floor(diffL > diffR ? (diffL - diffR) / 2 : -(diffR - diffL) / 2);
    for (let cluster of clusters) {
        cluster.center.x += diffV
        for (let corner of cluster.corners) corner.x += diffV
    }
}

function log(clusters) {
    console.log(`${clusters.length} clusters created with ${clusters.reduce((acc, current) => acc + current.dices, 0)} dices`);
}
