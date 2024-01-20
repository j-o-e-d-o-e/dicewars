import {RADIUS_HEX, CLUSTER_MIN_SIZE} from "./info.js";

export class Cluster {
    static COUNT = 0;

    constructor(start) {
        this.id = Cluster.COUNT++;
        this.dices = Math.floor(Math.random() * 6) + 1;
        this.nodes = [];
        this.addNodeAndItsNeighbours(start)
        this.expand();
        this.centerPos = this.centerPos();
        this.corners = this.cornersPos();
    }

    addNodeAndItsNeighbours(node) {
        node.cluster = this;
        this.nodes.push(node);
        node.getAdjacentNodesFromNode()
            .filter(n => n.cluster === undefined)
            .forEach(n => {
                n.cluster = this;
                this.nodes.push(n);
            });
    }

    expand() {
        while (this.nodes.length < CLUSTER_MIN_SIZE) {
            let candidates = this.getAdjacentNodesFromCluster().filter(n => n.cluster === undefined);
            if (candidates.length === 0) break;
            let rand = Math.floor(Math.random() * (candidates.length - 1));
            let node = candidates[rand];
            this.addNodeAndItsNeighbours(node);
        }
    }

    centerPos() {
        let centerNode = this.nodes.find(n => {
            let neighbours = n.getAdjacentNodesFromNode();
            return neighbours.length === 6 && neighbours.every(n => n.cluster?.id === this.id);
        });
        if (centerNode === undefined) centerNode = this.nodes[0];
        return centerNode.hex.center;
    }

    cornersPos() {
        let lines = [];
        for (let node of this.nodes) {
            if (node.upRight === undefined || node.upRight?.cluster?.id !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[0].x, y: node.hex.corners[0].y},
                    end: {x: node.hex.corners[5].x, y: node.hex.corners[5].y}
                });
            }
            if (node.upLeft === undefined || node.upLeft?.cluster?.id !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[5].x, y: node.hex.corners[5].y},
                    end: {x: node.hex.corners[4].x, y: node.hex.corners[4].y}
                });
            }
            if (node.left === undefined || node.left?.cluster?.id !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[4].x, y: node.hex.corners[4].y},
                    end: {x: node.hex.corners[3].x, y: node.hex.corners[3].y}
                });
            }
            if (node.downLeft === undefined || node.downLeft?.cluster?.id !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[3].x, y: node.hex.corners[3].y},
                    end: {x: node.hex.corners[2].x, y: node.hex.corners[2].y}
                });
            }
            if (node.downRight === undefined || node.downRight?.cluster?.id !== this.id) {
                lines.push({
                    start: {x: node.hex.corners[2].x, y: node.hex.corners[2].y},
                    end: {x: node.hex.corners[1].x, y: node.hex.corners[1].y}
                });
            }
            if (node.right === undefined || node.right?.cluster?.id !== this.id) {
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

    getAdjacentNodesFromCluster() {
        return Array.from(new Set(
            this.nodes.flatMap(n => n.getAdjacentNodesFromNode())
                .filter(n => !this.nodes.includes(n))
        ));
    }

    getAdjacentClustersFromCluster() {
        return [...new Set(
            this.getAdjacentNodesFromCluster().filter(n => n.cluster !== undefined).map(n => n.cluster)
        )];
    }

    containsPoint(point) {
        for (let node of this.nodes) if (Math.pow(point.x - node.hex.center.x, 2) + Math.pow(point.y - node.hex.center.y, 2) < Math.pow(RADIUS_HEX, 2)) return true;
        return false;
    }
}
