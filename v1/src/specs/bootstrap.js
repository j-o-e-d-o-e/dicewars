import {Cluster} from "../js/cluster.js";

const testClusters = [
    createTestClusters1,
    createTestClusters2,
    createTestClusters3,
    createTestClusters4,
    createTestClusters5,
    createTestClusters6
];

export function createTestClusters(board, num) {
    let clusters = testClusters[num - 1](board);
    for (let cluster of clusters) cluster.neighbours();
    return clusters;
}

// cluster-path

function createTestClusters1(board) {
    return [
        new Cluster(0, board[400], {playerId: 0, dices: 6}),
        new Cluster(1, board[295], {playerId: 1, dices: 2}),
        new Cluster(2, board[403], {playerId: 2, dices: 6}),
        new Cluster(3, board[508], {playerId: 1, dices: 3}),
        new Cluster(4, board[298], {playerId: 2, dices: 2}),
        new Cluster(5, board[406], {playerId: 0, dices: 3}),
        new Cluster(6, board[511], {playerId: 5, dices: 3}),
    ];
}

function createTestClusters2(board) {
    return [
        new Cluster(0, board[400], {playerId: 0, dices: 8}),
        new Cluster(1, board[508], {playerId: 1, dices: 8}),
        new Cluster(2, board[511], {playerId: 2, dices: 6}),
        new Cluster(3, board[514], {playerId: 3, dices: 5}),
        new Cluster(4, board[409], {playerId: 1, dices: 4}),
        new Cluster(5, board[301], {playerId: 0, dices: 8}),
        new Cluster(6, board[298], {playerId: 1, dices: 8}),
        new Cluster(7, board[403], {playerId: 3, dices: 8}),
        new Cluster(8, board[406], {playerId: 1, dices: 8}),
        new Cluster(9, board[295], {playerId: 2, dices: 8}),
        new Cluster(10, board[190], {playerId: 3, dices: 8}),
    ];
}

// player-comp-path

function createTestClusters3(board) {
    return [
        new Cluster(0, board[505], {playerId: 0, dices: 1}),
        new Cluster(1, board[400], {playerId: 0, dices: 4}),
        new Cluster(2, board[295], {playerId: 1, dices: 1}),
        new Cluster(3, board[298], {playerId: 2, dices: 3}),
        new Cluster(4, board[301], {playerId: 0, dices: 4}),
        new Cluster(5, board[508], {playerId: 0, dices: 4}),
        new Cluster(6, board[511], {playerId: 2, dices: 1}),
        new Cluster(7, board[514], {playerId: 1, dices: 1}),
        new Cluster(8, board[409], {playerId: 0, dices: 4}),
        new Cluster(9, board[304], {playerId: 0, dices: 1}),
    ];
}

// player-comp-path, player-comp-target

function createTestClusters4(board) {
    return [
        new Cluster(0, board[505], {playerId: 0, dices: 1}),
        new Cluster(1, board[400], {playerId: 0, dices: 6}),
        new Cluster(2, board[508], {playerId: 0, dices: 6}),
        new Cluster(3, board[295], {playerId: 1, dices: 1}),
        new Cluster(4, board[403], {playerId: 2, dices: 1}),
        new Cluster(5, board[149], {playerId: 0, dices: 1}),
        new Cluster(6, board[222], {playerId: 0, dices: 1}),
        new Cluster(7, board[116], {playerId: 0, dices: 1}),
        new Cluster(8, board[298], {playerId: 1, dices: 1}),
        new Cluster(9, board[193], {playerId: 2, dices: 1}),
        new Cluster(10, board[301], {playerId: 1, dices: 4}),
        new Cluster(11, board[409], {playerId: 2, dices: 3}),
        new Cluster(12, board[196], {playerId: 1, dices: 1}),
        new Cluster(13, board[304], {playerId: 2, dices: 4}),
        new Cluster(14, board[199], {playerId: 1, dices: 1}),
        new Cluster(15, board[307], {playerId: 0, dices: 2}),
        new Cluster(16, board[415], {playerId: 0, dices: 1}),
    ];
}

// player-comp-mighty

function createTestClusters5(board) {
    return [
        new Cluster(0, board[292], {playerId: 0, dices: 1}),
        new Cluster(1, board[295], {playerId: 1, dices: 1}),
        new Cluster(2, board[298], {playerId: 2, dices: 1}),
        new Cluster(3, board[301], {playerId: 2, dices: 1}),
        new Cluster(4, board[304], {playerId: 2, dices: 1}),
        new Cluster(5, board[400], {playerId: 2, dices: 1}),
        new Cluster(6, board[403], {playerId: 2, dices: 1}),
        new Cluster(7, board[406], {playerId: 2, dices: 1}),
        new Cluster(8, board[409], {playerId: 2, dices: 1}),
        new Cluster(9, board[505], {playerId: 2, dices: 1}),
        new Cluster(10, board[508], {playerId: 0, dices: 1}),
        new Cluster(11, board[511], {playerId: 1, dices: 1}),
        new Cluster(12, board[514], {playerId: 0, dices: 1}),
        new Cluster(13, board[517], {playerId: 1, dices: 1}),
    ];
}

function createTestClusters6(board) {
    let idCount = 0, playerCount = 0;
    return [
        new Cluster(idCount++, board[79], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[82], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[85], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[88], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[91], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[187], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[190], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[193], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[196], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[292], {playerId: ++playerCount, dices: 1}),
        new Cluster(idCount++, board[295], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[298], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[301], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[304], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[400], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[403], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[406], {playerId: ++playerCount, dices: 1}),
        new Cluster(idCount++, board[409], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[505], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[508], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[511], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[514], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[517], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[613], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[616], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[619], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[622], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[718], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[721], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[724], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[727], {playerId: playerCount, dices: 1}),
        new Cluster(idCount++, board[730], {playerId: playerCount, dices: 1}),
    ];
}