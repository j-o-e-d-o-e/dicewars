import {Player} from "./player.js";

export class Comp extends Player {

    constructor() {
        super();
    }

    moveComp() {
        // TODO: valid moves, exit-condition, update state, draw, ...
    }

    move(cb) {
        console.log(`Comp's turn (id: ${this.id})...`);
        setTimeout(() => {
            this.moveComp();
            cb();
        }, 1000);
    }
}