import {Cluster} from "../js/cluster.js";

// cluster-path

export function createTestClusters1(board) {
    return [
        new Cluster(board[400], {id: 0, playerId: 0, dices: 6}),
        new Cluster(board[295], {id: 1, playerId: 1, dices: 2}),
        new Cluster(board[403], {id: 2, playerId: 2, dices: 6}),
        new Cluster(board[508], {id: 3, playerId: 1, dices: 3}),
        new Cluster(board[298], {id: 4, playerId: 2, dices: 2}),
        new Cluster(board[406], {id: 5, playerId: 0, dices: 3}),
        new Cluster(board[511], {id: 6, playerId: 5, dices: 3}),
    ];
}

export function createTestClusters2(board) {
    return [
        new Cluster(board[400], {id: 0, playerId: 0, dices: 8}),
        new Cluster(board[508], {id: 1, playerId: 1, dices: 1}),
        new Cluster(board[511], {id: 2, playerId: 2, dices: 1}),
        new Cluster(board[514], {id: 3, playerId: 3, dices: 1}),
        new Cluster(board[409], {id: 4, playerId: 1, dices: 1}),
        new Cluster(board[301], {id: 5, playerId: 2, dices: 1}),
        new Cluster(board[298], {id: 6, playerId: 0, dices: 7}),
        new Cluster(board[403], {id: 7, playerId: 3, dices: 8}),
        new Cluster(board[406], {id: 8, playerId: 1, dices: 8}),
        new Cluster(board[295], {id: 9, playerId: 2, dices: 1}),
        new Cluster(board[190], {id: 10, playerId: 3, dices: 8}),
    ];
}

// player-comp-path

export function createTestClusters3(board) {
    return [
        new Cluster(board[505], {id: 0, playerId: 0, dices: 1}),
        new Cluster(board[400], {id: 1, playerId: 0, dices: 4}),
        new Cluster(board[295], {id: 2, playerId: 1, dices: 1}),
        new Cluster(board[298], {id: 3, playerId: 2, dices: 3}),
        new Cluster(board[301], {id: 4, playerId: 0, dices: 4}),
        new Cluster(board[508], {id: 5, playerId: 0, dices: 4}),
        new Cluster(board[511], {id: 6, playerId: 2, dices: 1}),
        new Cluster(board[514], {id: 7, playerId: 1, dices: 1}),
        new Cluster(board[409], {id: 8, playerId: 0, dices: 4}),
        new Cluster(board[304], {id: 9, playerId: 0, dices: 1}),
    ];
}

// player-comp-path, player-comp-target

export function createTestClusters4(board) {
    return [
        new Cluster(board[505], {id: 0, playerId: 0, dices: 1}),
        new Cluster(board[400], {id: 1, playerId: 0, dices: 6}),
        new Cluster(board[508], {id: 2, playerId: 0, dices: 6}),
        new Cluster(board[295], {id: 3, playerId: 1, dices: 1}),
        new Cluster(board[403], {id: 4, playerId: 2, dices: 1}),
        new Cluster(board[149], {id: 5, playerId: 0, dices: 1}),
        new Cluster(board[222], {id: 6, playerId: 0, dices: 1}),
        new Cluster(board[116], {id: 7, playerId: 0, dices: 1}),
        new Cluster(board[298], {id: 8, playerId: 1, dices: 1}),
        new Cluster(board[193], {id: 9, playerId: 2, dices: 1}),
        new Cluster(board[301], {id: 10, playerId: 1, dices: 4}),
        new Cluster(board[409], {id: 11, playerId: 2, dices: 3}),
        new Cluster(board[196], {id: 12, playerId: 1, dices: 1}),
        new Cluster(board[304], {id: 13, playerId: 2, dices: 4}),
        new Cluster(board[199], {id: 14, playerId: 1, dices: 1}),
        new Cluster(board[307], {id: 15, playerId: 0, dices: 2}),
        new Cluster(board[415], {id: 16, playerId: 0, dices: 1}),
    ];
}

// player-comp-mighty

export function createTestClusters5(board) {
    return [
        new Cluster(board[292], {id: 0, playerId: 0, dices: 1}),
        new Cluster(board[295], {id: 1, playerId: 1, dices: 1}),
        new Cluster(board[298], {id: 2, playerId: 2, dices: 1}),
        new Cluster(board[301], {id: 3, playerId: 2, dices: 1}),
        new Cluster(board[304], {id: 4, playerId: 2, dices: 1}),
        new Cluster(board[400], {id: 5, playerId: 2, dices: 1}),
        new Cluster(board[403], {id: 6, playerId: 2, dices: 1}),
        new Cluster(board[406], {id: 7, playerId: 2, dices: 1}),
        new Cluster(board[409], {id: 8, playerId: 2, dices: 1}),
        new Cluster(board[505], {id: 9, playerId: 2, dices: 1}),
        new Cluster(board[508], {id: 10, playerId: 0, dices: 1}),
        new Cluster(board[511], {id: 11, playerId: 1, dices: 1}),
        new Cluster(board[514], {id: 12, playerId: 0, dices: 1}),
        new Cluster(board[517], {id: 13, playerId: 1, dices: 1}),
    ];
}

export function createTestClusters6(board) {
    let idCount = 0, playerCount = 0;
    return [
        new Cluster(board[79], {id: idCount++, playerId:  playerCount, dices: 1}),
        new Cluster(board[82], {id: idCount++, playerId:  playerCount, dices: 1}),
        new Cluster(board[85], {id: idCount++, playerId:  playerCount, dices: 1}),
        new Cluster(board[88], {id: idCount++, playerId:  playerCount, dices: 1}),
        new Cluster(board[91], {id: idCount++, playerId:  playerCount, dices: 1}),
        new Cluster(board[187], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[190], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[193], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[196], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[292], {id: idCount++, playerId: ++playerCount, dices: 1}),
        new Cluster(board[295], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[298], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[301], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[304], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[400], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[403], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[406], {id: idCount++, playerId: ++playerCount, dices: 1}),
        new Cluster(board[409], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[505], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[508], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[511], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[514], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[517], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[613], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[616], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[619], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[622], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[718], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[721], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[724], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[727], {id: idCount++, playerId: playerCount, dices: 1}),
        new Cluster(board[730], {id: idCount++, playerId: playerCount, dices: 1}),
    ];
}