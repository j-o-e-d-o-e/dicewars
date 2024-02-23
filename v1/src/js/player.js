import {Human} from "./player-human.js";
import {deletePlayerFromDicesBar, drawDicesNums} from "./draw.js";

export class Player {

    constructor(id) {
        this.id = id;
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
            deletePlayerFromDicesBar(deleted.id);
            console.log(`Deleted player (id: ${deleted.id}).`);
            if (deleted instanceof Human) {
                console.log(`Human player (id: ${deleted.id}) has lost.`);
                return true;
            } else if (players.length === 1) {
                console.log(`Comp player (id: ${this.id}) has won.`);
                return true;
            }
        } else drawDicesNums(other);
    }

    allocateNewDices(clusters) {
        let _clusters = clusters.filter(c => c.playerId === this.id && c.dices < 8);
        let dices = this.dices;
        while (dices > 0 && _clusters.length > 0) {
            let i = Math.floor(Math.random() * _clusters.length)
            _clusters[i].dices++;
            if (_clusters[i].dices === 8) _clusters.splice(i, 1);
            if (this.additionalDices > 0) this.additionalDices--;
            else dices--;
        }
        if (dices > 0) {
            this.additionalDices += dices;
            if (this.additionalDices > clusters.length * 2) this.additionalDices = clusters.length * 2;
        }
    }

    setDices(clusters) {
        this.dices = 0;
        for (let cluster of clusters.filter(c => c.playerId === this.id)) {
            let size = cluster.region().length;
            if (size > this.dices) this.dices = size;
        }
    }
}