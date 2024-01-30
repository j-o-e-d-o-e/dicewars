import {Human} from "./player-human.js";
import {drawDeletedPlayer, drawUpdatedDicesText} from "./draw.js";

export class Player {
    static count = 0;

    constructor() {
        this.id = Player.count++;
        this.dices = 0;
        this.additionalDices = 0;
    }

    move() {
        console.log(`${this instanceof Human ? "Human" : "Comp"}'s turn (id: ${this.id})...`);
    }

    static roleDice(dices) {
        let sum = 0;
        for (let i = 0; i < dices; i++) sum += Math.floor(Math.random() * 6) + 1;
        return sum;
    }

    afterSuccessfulMove(clusters, players, otherId) {
        this.setDices(clusters);
        drawUpdatedDicesText(this);
        let other = players.find(p => p.id === otherId)
        other.setDices(clusters);
        if (!clusters.some(c => c.playerId === other.id)) return Player.deletePlayer(players, other.id);
        else drawUpdatedDicesText(other);
    }

    static deletePlayer(players, playerId) {
        players.splice(playerId, 1);
        drawDeletedPlayer(playerId);
        return players.length === 1 || players.filter(p => p instanceof Human).length !== 1;
    }

    allocateNewDices(clusters) {
        let indicesAndClusters = [];
        for (let [index, cluster] of clusters.entries())
            if (cluster.playerId === this.id && cluster.dices < 8)
                indicesAndClusters.push(index);
        let dices = this.dices;
        while (dices > 0 && indicesAndClusters.length > 0) {
            let rand = Math.floor(Math.random() * indicesAndClusters.length)
            let i = indicesAndClusters[rand];
            clusters[i].dices++;
            if (clusters[i].dices === 8) indicesAndClusters.splice(rand, 1);
            if (this.additionalDices > 0) this.additionalDices--;
            else dices--;
        }
        if (dices > 0) {
            this.additionalDices += dices;
            if (this.additionalDices > clusters.length) this.additionalDices = clusters.length;
        }
    }

    setDices(clusters) {
        this.dices = 0;
        for (let cluster of clusters.filter(c => c.playerId === this.id)) {
            let size = cluster.getRegionSize();
            if (size > this.dices) this.dices = size;
        }
    }
}