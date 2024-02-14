import {RADIUS_HEX, CLUSTER_MIN_SIZE, CLUSTERS_MAX} from "./info.js";

export class Cluster {
    static count = 0;

    constructor(start, test) {
        this.id = test ? test.id : Cluster.count++;
        this.playerId = test ? test.playerId : undefined;
        this.dices = test ? test.dices : Math.floor(Math.random() * 6) + 1;
        this.nodes = [];
        this.addNodeAndItsNeighbours(start)
        if (!test) this.expand();
        this.centerPos = this.centerPos();
        this.corners = this.cornersPos();
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

    centerPos() {
        let centerNode = this.nodes.find(n => {
            let neighbours = n.adjacentNodesFromNode();
            return neighbours.length === 6 && neighbours.every(n => n.cluster?.id === this.id);
        });
        if (centerNode === undefined) centerNode = this.nodes[0];
        return centerNode.hex.center;
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
        return res.map(l => l.start);
    }

    adjacentNodesFromCluster() {
        return Array.from(new Set(
            this.nodes.flatMap(n => n.adjacentNodesFromNode())
                .filter(n => !this.nodes.includes(n))
        ));
    }

    adjacentClustersFromCluster() {
        return [...new Set(
            this.adjacentNodesFromCluster().filter(n => n.cluster !== undefined).map(n => n.cluster)
        )];
    }

    containsPoint(p) {
        return this.nodes.some(n => Math.pow(p.x - n.hex.center.x, 2) + Math.pow(p.y - n.hex.center.y, 2) < Math.pow(RADIUS_HEX, 2));
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
                if ((neighbour.id !== to.id && neighbour.playerId === this.playerId)
                    || (neighbour.playerId !== to.playerId && neighbour.dices >= this.dices - distances[from.id])
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
