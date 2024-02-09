import {Cluster} from "../js/cluster.js";

export function createTestClusters1(board) {
    return [
        new Cluster(board[400], {id: 0, playerId: 0, dices: 6}),
        new Cluster(board[295], {id: 1, playerId: 1, dices: 3}),
        new Cluster(board[403], {id: 2, playerId: 2, dices: 6}),
        new Cluster(board[508], {id: 3, playerId: 1, dices: 3}),
        new Cluster(board[298], {id: 4, playerId: 2, dices: 3}),
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