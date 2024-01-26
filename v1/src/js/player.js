import {CLUSTERS_MAX} from "./info.js"

export class Player {
    static count = 0;

    constructor() {
        this.id = Player.count++;
        this.dices = undefined;
    }

    static roleDice(dices) {
        let sum = 0;
        for (let i = 0; i < dices; i++) sum += Math.floor(Math.random() * 5) + 1;
        return sum;
    }

    allocateNewDices(clusters) {
        let [newDices, indicesAndClusters] = this.getNewDices(clusters);
        let oldDices = this.dices;
        this.dices = newDices;
        indicesAndClusters = indicesAndClusters.filter(([_, c]) => c.dices < 8);
        if (indicesAndClusters.length === 0) this.dices += oldDices;
        else {
            while (newDices > 0 && indicesAndClusters.length > 0) {
                let rand = Math.floor(Math.random() * indicesAndClusters.length)
                let [i, _] = indicesAndClusters[rand];
                clusters[i].dices++;
                if (clusters[i].dices === 8) indicesAndClusters.splice(rand, 1);
                newDices--;
            }
            this.dices += newDices;
        }
        if (this.dices > CLUSTERS_MAX * 2) this.dices = CLUSTERS_MAX * 2;
    }

    getNewDices(clusters) {
        let indicesAndClusters = [];
        for (let [index, cluster] of clusters.entries()) {
            if (cluster.playerId === this.id) indicesAndClusters.push([index, cluster])
        }
        let newDices = 0;
        for (let [_, cluster] of indicesAndClusters) {
            let size = cluster.getRegionSize();
            if (size > newDices) newDices = size;
        }
        return [newDices, indicesAndClusters];
    }
}