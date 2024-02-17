const stats = {
    startTime: undefined,
    turns: 0,
    successfulAttacks: 0,
    unsuccessfulAttacks: 0
}

export default {
    get: {
        time() {
            let millis = new Date() - stats.startTime;
            let minutes = Math.floor(millis / 60000);
            let seconds = ((millis % 60000) / 1000).toFixed(0);
            return `Time played: ${minutes + ":" + (seconds < 10 ? '0' : '') + seconds}`;
        },
        turns() {
            return `Turns: ${stats.turns}`;
        },
        successRate() {
            return `Success rate: ${stats.successfulAttacks === 0 && stats.unsuccessfulAttacks === 0 ? 0 :
                Math.round((stats.successfulAttacks / (stats.successfulAttacks + stats.unsuccessfulAttacks)) * 100)}%`;
        },
    },
    set: {
        startTime() {
            stats.startTime = new Date();
        },
        turns() {
            stats.turns++;
        },
        successfulAttacks() {
            stats.successfulAttacks++;
        },
        unsuccessfulAttacks() {
            stats.unsuccessfulAttacks++;
        }
    },
    reset() {
        stats.startTime = new Date();
        stats.turns = 0;
        stats.successfulAttacks = 0;
        stats.unsuccessfulAttacks = 0;
    }
}
