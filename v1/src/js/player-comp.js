import {Player} from "./player.js";

export class Comp extends Player {

    constructor() {
        super();
    }

    moveComp() {
    }

    move(cb) {
        console.log(`Comp's turn (id: ${this.id})...`);
        setTimeout(() => {
            this.moveComp();
            cb();
        }, 1000);
    }
}