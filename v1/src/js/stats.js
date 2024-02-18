const stats = {
    startTime: undefined,
    rounds: 0,
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
        rounds() {
            return `Rounds: ${stats.rounds}`;
        },
        successRate() {
            let div = stats.successfulAttacks + stats.unsuccessfulAttacks;
            return `Success rate: ${div === 0 ? 0 : Math.round((stats.successfulAttacks / div) * 100)}%`;
        },
    },
    set: {
        startTime() {
            stats.startTime = new Date();
        },
        rounds() {
            stats.rounds++;
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
        stats.rounds = 0;
        stats.successfulAttacks = 0;
        stats.unsuccessfulAttacks = 0;
    }
}
