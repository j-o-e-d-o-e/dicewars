import {CLUSTERS_MAX} from "./info.js";
import {Cluster} from "./cluster.js";

let directions = [...Array(4).keys()]; // [0, 1, 2, 3]
let count = 0, counter = 0;

export function createClusters(startNode) {
    let clusters = [new Cluster(startNode)];
    while (clusters.length <= directions.length) {
        let node = getRandomAdjacentNodeFromCluster(clusters, 0);
        if (node === undefined) continue;
        clusters.push(new Cluster(node));
    }
    while (clusters.length < CLUSTERS_MAX && directions.length > 0) {
        let index = getNextClusterIndex(Math.floor(count));
        let node = getRandomAdjacentNodeFromCluster(clusters, index);
        if (node === undefined) continue;
        clusters.push(new Cluster(node));
        count += 1 / directions.length;
    }
    return clusters;
}

function getRandomAdjacentNodeFromCluster(clusters, index) {
    let candidates = clusters[index].getAdjacentNodesFromCluster().filter(n => n.cluster === undefined);
    if (candidates.length === 0) {
        directions.splice(index % directions.length, 1);
        count = Math.ceil(count);
        return;
    }
    let candidate = candidates[Math.floor(Math.random() * candidates.length)];
    let availableNeighbours = candidate.getAdjacentNodesFromNode().filter(n => n.cluster === undefined);
    if (availableNeighbours.length < 3) return; // possibly infinity source!
    return candidate;
}

function getNextClusterIndex(count) {
    let res = directions.length * count + counter + 1;
    counter++;
    if (counter === directions.length) counter = 0;
    return res;
}

function getRandomClusterIndex(count) {
    let rand = Math.floor(Math.random() * directions.length);
    return directions.length * count + rand + 1;
}
