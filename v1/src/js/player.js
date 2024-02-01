import {Human} from "./player-human.js";
import {drawRemovePlayer, drawDicesNums} from "./draw.js";

export class Player {
    static count = 0;

    constructor() {
        this.id = Player.count++;
        this.dices = 0;
        this.additionalDices = 0;
    }

    static roleDice(dices) {
        let sum = 0;
        for (let i = 0; i < dices; i++) sum += Math.floor(Math.random() * 6) + 1;
        return sum;
    }

    turn() {
        console.log(`${this instanceof Human ? "Human" : "Comp"}'s turn (id: ${this.id})...`);
    }

    afterSuccessfulMove(clusters, players, otherId) {
        this.setDices(clusters);
        drawDicesNums(this);
        let other = players.find(p => p.id === otherId)
        other.setDices(clusters);
        if (!clusters.some(c => c.playerId === other.id)) {
            let [deleted] = players.splice(players.findIndex(p => p.id === other.id), 1);
            drawRemovePlayer(deleted.id);
            console.log(`Deleted player (id: ${deleted.id}).`);
            if (deleted instanceof Human) {
                console.log(`Human player (id: ${deleted.id}) has lost.`);
                return true;
            } else if (players.length === 1) {
                console.log(`${this instanceof Human ? "Human" : "Comp"} player (id: ${this.id}) has won.`);
                return true;
            }
        } else drawDicesNums(other);
    }

    allocateNewDices(clusters) {
        let indices = clusters.map((c, i) => c.playerId === this.id && c.dices < 8 ? i : undefined).filter(i => i);
        let dices = this.dices;
        while (dices > 0 && indices.length > 0) {
            let rand = Math.floor(Math.random() * indices.length)
            let i = indices[rand];
            clusters[i].dices++;
            if (clusters[i].dices === 8) indices.splice(rand, 1);
            if (this.additionalDices > 0) this.additionalDices--;
            else dices--;
        }
        if (dices > 0) {
            this.additionalDices += dices;
            if (this.additionalDices > clusters.length * 2) this.additionalDices = clusters.length;
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