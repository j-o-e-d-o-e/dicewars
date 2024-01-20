import {Cluster} from "./cluster.js";
import {CLUSTERS_MAX} from "./info.js";

let directions = [...Array(4).keys()]; // [0, 1, 2, 3]
let count = 0;
let counter = 0;

export function createClusters(startNode) {
    let clusters = [];
    let cluster = new Cluster(startNode);
    clusters.push(cluster);
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
    addDices(clusters);
    return clusters;
}

function getRandomAdjacentNodeFromCluster(clusters, index) {
    let candidates = clusters[index].getAdjacentNodesFromCluster().filter(n => n.clusterId === undefined);
    if (candidates.length === 0) {
        directions.splice(index % directions.length, 1);
        count = Math.ceil(count);
        return;
    }
    let rand = Math.floor(Math.random() * (candidates.length));
    let candidate = candidates[rand];
    let availableNeighbours = candidate.getAdjacentNodesFromNode().filter(n => n.clusterId === undefined);
    if (availableNeighbours.length < 3) return;
    return candidate;
}

function getNextClusterIndex(count) {
    let res = directions.length * count + counter + 1;
    counter++;
    if (counter === directions.length) counter = 0;
    return res;
}

function addDices(clusters) {
    for (let cluster of clusters) {
        cluster.dices = Math.floor(Math.random() * 6) + 1;
    }
}

export function getCluster(clusters, point) {
    for (let cluster of clusters) if (cluster.containsPoint(point)) return cluster;
}

function getRandomClusterIndex(count) {
    let rand = Math.floor(Math.random() * directions.length);
    return directions.length * count + rand + 1;
}
