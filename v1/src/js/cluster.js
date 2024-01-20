import {RADIUS_HEX, CLUSTER_MIN_SIZE} from "./info.js";

export class Cluster {
    static COUNT = 0;

    constructor(start) {
        this.id = Cluster.COUNT++;
        start.clusterId = this.id;
        this.nodes = [start];
        this.addNeighbours(start);
        this.expand();
        this.center = this.center();
        this.corners = this.corners();
    }

    addNeighbours(node) {
        node.getAdjacentNodesFromNode()
            .filter(n => n.clusterId === undefined)
            .forEach(n => {
                n.clusterId = this.id;
                this.nodes.push(n)
            });
    }

    expand() {
        while (this.nodes.length < CLUSTER_MIN_SIZE) {
            let candidates = this.getAdjacentNodesFromCluster().filter(n => n.clusterId === undefined);
            if (candidates.length === 0) break;
            let rand = Math.floor(Math.random() * (candidates.length - 1));
            let node = candidates[rand];
            node.clusterId = this.id;
            this.nodes.push(node);
            this.addNeighbours(node);
        }
    }

    center() {
        let center = this.nodes.find(n => {
            let neighbours = n.getAdjacentNodesFromNode();
            return neighbours.length === 6 && neighbours.every(n => n.clusterId === this.id);
        });
        if (center === undefined) center = this.nodes[0];
        this.centerNodeId = center.index;
        return center.hex.center;
    }

    getAdjacentNodesFromCluster() {
        return Array.from(new Set(this.nodes.filter(n => n !== this.center)
            .flatMap(n => n.getAdjacentNodesFromNode())
            .filter(n => !this.nodes.includes(n))));
    }

    getAdjacentClusterIds() {
        return [...new Set(this.getAdjacentNodesFromCluster().map(n => n.clusterId).filter(id => id !== undefined))];
    }

    corners() {
        let lines = [];
        for (let node of this.nodes) {
            if (node.upRight === undefined || node.upRight.clusterId !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[0].x, y: node.hex.corners[0].y},
                    end: {x: node.hex.corners[5].x, y: node.hex.corners[5].y}
                });
            }
            if (node.upLeft === undefined || node.upLeft.clusterId !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[5].x, y: node.hex.corners[5].y},
                    end: {x: node.hex.corners[4].x, y: node.hex.corners[4].y}
                });
            }
            if (node.left === undefined || node.left?.clusterId !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[4].x, y: node.hex.corners[4].y},
                    end: {x: node.hex.corners[3].x, y: node.hex.corners[3].y}
                });
            }
            if (node.downLeft === undefined || node.downLeft.clusterId !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[3].x, y: node.hex.corners[3].y},
                    end: {x: node.hex.corners[2].x, y: node.hex.corners[2].y}
                });
            }
            if (node.downRight === undefined || node.downRight.clusterId !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[2].x, y: node.hex.corners[2].y},
                    end: {x: node.hex.corners[1].x, y: node.hex.corners[1].y}
                });
            }
            if (node.right === undefined || node.right.clusterId !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[1].x, y: node.hex.corners[1].y},
                    end: {x: node.hex.corners[0].x, y: node.hex.corners[0].y}
                });
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

    containsPoint(point) {
        for (let node of this.nodes) if (Math.pow(point.x - node.hex.center.x, 2) + Math.pow(point.y - node.hex.center.y, 2) < Math.pow(RADIUS_HEX, 2)) return true;
        return false;
    }

    toString() {
        return `Cluster(id=${this.id},start=${this.nodes[0].index}, center=${this.centerNodeId}, nodes=${this.nodes.length})`;
    }
}
