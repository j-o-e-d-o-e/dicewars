import {CLUSTER_MIN_SIZE, CLUSTERS_MAX} from "./info.js";

export class Cluster {

    constructor(id, start, test) {
        this.id = id;
        this.playerId = test ? test.playerId : undefined;
        this.dices = test ? test.dices : Math.floor(Math.random() * 6) + 1;
        this.nodes = [];
        this.addNodeAndItsNeighbours(start)
        if (!test) this.expand();
        this.corners = this.cornersPos();
        this.center = this.centerPos();
        this.adjacentClusters = undefined;
    }

    addNodeAndItsNeighbours(node) {
        node.cluster = this;
        this.nodes.push(node);
        node.adjacentNodesFromNode()
            .filter(n => n.cluster === undefined)
            .forEach(n => {
                n.cluster = this;
                this.nodes.push(n);
            });
    }

    expand() {
        while (this.nodes.length < CLUSTER_MIN_SIZE) {
            let candidates = this.adjacentNodesFromCluster().filter(n => n.cluster === undefined);
            if (candidates.length === 0) break;
            let rand = Math.floor(Math.random() * (candidates.length - 1));
            let node = candidates[rand];
            this.addNodeAndItsNeighbours(node);
        }
    }

    cornersPos() {
        let lines = [];
        for (let node of this.nodes) {
            for (let [i, neighbour] of ["upRight", "upLeft", "left", "downLeft", "downRight", "right"].entries()) {
                if (node[neighbour] === undefined || node[neighbour]?.cluster?.id !== this.id) {
                    let end = 5 - i, start = end === 5 ? 0 : end + 1;
                    lines.push({
                        start: {x: node.hex.corners[start].x, y: node.hex.corners[start].y},
                        end: {x: node.hex.corners[end].x, y: node.hex.corners[end].y}
                    });
                }
            }
        }
        lines.sort((a, b) => a.start.x - b.start.x);
        let current = lines.shift();
        let res = [current];
        while (lines.length !== 0) {
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                if (Math.sqrt((current.end.x - line.start.x) ** 2 + (current.end.y - line.start.y) ** 2) < 2) {
                    current = line;
                    lines.splice(i, 1);
                    res.push(current);
                    break;
                }
            }
        }
        return res.map(line => {
            return {x: Math.floor(line.start.x), y: line.start.y};
        });
    }

    centerPos() { // https://stackoverflow.com/a/9939071/9416041
        let corners = [...this.corners, this.corners[0]];
        let shoelace, doubleArea = 0, x = 0, y = 0;
        for (let i = 0, j = corners.length - 1; i < corners.length; j = i++) {
            let p1 = corners[i];
            let p2 = corners[j];
            shoelace = p1.x * p2.y - p2.x * p1.y;
            doubleArea += shoelace;
            x += (p1.x + p2.x) * shoelace;
            y += (p1.y + p2.y) * shoelace;
        }
        shoelace = doubleArea * 3;
        return {x: Math.floor(x / shoelace), y: Math.floor(y / shoelace)};
    }

    adjacentNodesFromCluster() {
        return Array.from(new Set(
            this.nodes.flatMap(n => n.adjacentNodesFromNode())
                .filter(n => !this.nodes.includes(n))
        ));
    }

    neighbours() {
        this.adjacentClusters = [...new Set(
            this.adjacentNodesFromCluster().filter(n => n.cluster !== undefined).map(n => n.cluster)
        )];
    }

    adjacentClustersFromCluster() {
        return this.adjacentClusters;
    }

    containsPoint(p) {
        let corners = this.corners;
        let odd = false; // wikipedia.org/wiki/Even%E2%80%93odd_rule
        for (let i = 0, j = corners.length - 1; i < corners.length; i++) {
            if (((corners[i].y > p.y) !== (corners[j].y > p.y))
                && (p.x < ((corners[j].x - corners[i].x) * (p.y - corners[i].y) / (corners[j].y - corners[i].y) + corners[i].x))) {
                odd = !odd;
            }
            j = i;
        }
        return odd;
    }

    region() {
        let cache = [this];
        let neighbours = this.adjacentClustersFromCluster().filter(c => c.playerId === this.playerId);
        while (neighbours.length > 0) {
            cache = cache.concat(neighbours);
            neighbours = [...new Set(neighbours.flatMap(n => n.adjacentClustersFromCluster()
                .filter(c => !cache.includes(c) && c.playerId === this.playerId)))];
        }
        return cache;
    }

    path(to) {
        let res;
        let queue = [this];
        let visited = Array(CLUSTERS_MAX).fill(false);
        visited[this.id] = true;
        let predecessors = Array(CLUSTERS_MAX);
        let distances = Array(CLUSTERS_MAX);
        distances[this.id] = 0;
        while (queue.length > 0) {
            let from = queue.shift();
            let neighbours = from.adjacentClustersFromCluster();
            for (let neighbour of neighbours) {
                let currentDices = this.dices - distances[from.id];
                if ((neighbour.id !== to.id && neighbour.playerId === this.playerId)
                    || (neighbour.playerId !== to.playerId && neighbour.dices - (currentDices === 8) >= currentDices)
                    || visited[neighbour.id]) continue;
                predecessors[neighbour.id] = from;
                distances[neighbour.id] = distances[from.id] + 1;
                if (neighbour.id !== to.id) {
                    visited[neighbour.id] = true;
                    queue.push(neighbour);
                } else {
                    let current = to, pre = predecessors[current.id];
                    let path = [current];
                    while (pre) {
                        path.push(pre);
                        current = pre;
                        pre = predecessors[current.id];
                    }
                    path.reverse();
                    if (res) {
                        let minDicesDiffP = Math.min(...path.slice(1, -1).map((c, i) => this.dices - i - c.dices));
                        let minDicesDiffR = Math.min(...res.slice(1, -1).map((c, i) => this.dices - i - c.dices));
                        if (minDicesDiffP > minDicesDiffR || (minDicesDiffP === minDicesDiffR && path.length < res.length)) res = path;
                    } else res = path
                }
            }
        }
        return res;
    }
}
