export class Player {
    static count = 0;

    constructor() {
        this.id = Player.count++;
    }

    static roleDice(dices) {
        let sum = 0;
        for (let i = 0; i < dices; i++) sum += Math.floor(Math.random() * 5) + 1;
        return sum;
    }

    allocateNewDices(clusters) {
        let indicesAndClusters = [];
        for (let [index, cluster] of clusters.entries()) {
            if (cluster.playerId === this.id) indicesAndClusters.push([index, cluster])
        }
        let newDices = 0;
        for (let [_, cluster] of indicesAndClusters) {
            let size = cluster.getRegionSize();
            if (size > newDices) newDices = size;
        }
        while (newDices > 0) {
            let [index, _] = indicesAndClusters[Math.floor(Math.random() * indicesAndClusters.length)];
            clusters[index].dices++;
            newDices--;
        }
    }
}