export class Player {
    static count = 0;

    constructor() {
        this.id = Player.count++;
        this.clusters = [];
    }

    static roleDice(dices) {
        let sum = 0;
        for (let i = 0; i < dices; i++) sum += Math.floor(Math.random() * 5) + 1;
        return sum;
    }
}