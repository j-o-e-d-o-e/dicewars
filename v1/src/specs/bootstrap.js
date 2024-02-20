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
        new Cluster(board[400], 0, {playerId: 0, dices: 6}),
        new Cluster(board[295], 1, {playerId: 1, dices: 2}),
        new Cluster(board[403], 2, {playerId: 2, dices: 6}),
        new Cluster(board[508], 3, {playerId: 1, dices: 3}),
        new Cluster(board[298], 4, {playerId: 2, dices: 2}),
        new Cluster(board[406], 5, {playerId: 0, dices: 3}),
        new Cluster(board[511], 6, {playerId: 5, dices: 3}),
    ];
}

function createTestClusters2(board) {
    return [
        new Cluster(board[400], 0, {playerId: 0, dices: 8}),
        new Cluster(board[508], 1, {playerId: 1, dices: 1}),
        new Cluster(board[511], 2, {playerId: 2, dices: 1}),
        new Cluster(board[514], 3, {playerId: 3, dices: 1}),
        new Cluster(board[409], 4, {playerId: 1, dices: 1}),
        new Cluster(board[301], 5, {playerId: 2, dices: 1}),
        new Cluster(board[298], 6, {playerId: 0, dices: 7}),
        new Cluster(board[403], 7, {playerId: 3, dices: 8}),
        new Cluster(board[406], 8, {playerId: 1, dices: 8}),
        new Cluster(board[295], 9, {playerId: 2, dices: 1}),
        new Cluster(board[190], 10, {playerId: 3, dices: 8}),
    ];
}

// player-comp-path

function createTestClusters3(board) {
    return [
        new Cluster(board[505], 0, {playerId: 0, dices: 1}),
        new Cluster(board[400], 1, {playerId: 0, dices: 4}),
        new Cluster(board[295], 2, {playerId: 1, dices: 1}),
        new Cluster(board[298], 3, {playerId: 2, dices: 3}),
        new Cluster(board[301], 4, {playerId: 0, dices: 4}),
        new Cluster(board[508], 5, {playerId: 0, dices: 4}),
        new Cluster(board[511], 6, {playerId: 2, dices: 1}),
        new Cluster(board[514], 7, {playerId: 1, dices: 1}),
        new Cluster(board[409], 8, {playerId: 0, dices: 4}),
        new Cluster(board[304], 9, {playerId: 0, dices: 1}),
    ];
}

// player-comp-path, player-comp-target

function createTestClusters4(board) {
    return [
        new Cluster(board[505], 0, {playerId: 0, dices: 1}),
        new Cluster(board[400], 1, {playerId: 0, dices: 6}),
        new Cluster(board[508], 2, {playerId: 0, dices: 6}),
        new Cluster(board[295], 3, {playerId: 1, dices: 1}),
        new Cluster(board[403], 4, {playerId: 2, dices: 1}),
        new Cluster(board[149], 5, {playerId: 0, dices: 1}),
        new Cluster(board[222], 6, {playerId: 0, dices: 1}),
        new Cluster(board[116], 7, {playerId: 0, dices: 1}),
        new Cluster(board[298], 8, {playerId: 1, dices: 1}),
        new Cluster(board[193], 9, {playerId: 2, dices: 1}),
        new Cluster(board[301], 10, {playerId: 1, dices: 4}),
        new Cluster(board[409], 11, {playerId: 2, dices: 3}),
        new Cluster(board[196], 12, {playerId: 1, dices: 1}),
        new Cluster(board[304], 13, {playerId: 2, dices: 4}),
        new Cluster(board[199], 14, {playerId: 1, dices: 1}),
        new Cluster(board[307], 15, {playerId: 0, dices: 2}),
        new Cluster(board[415], 16, {playerId: 0, dices: 1}),
    ];
}

// player-comp-mighty

function createTestClusters5(board) {
    return [
        new Cluster(board[292], 0, {playerId: 0, dices: 1}),
        new Cluster(board[295], 1, {playerId: 1, dices: 1}),
        new Cluster(board[298], 2, {playerId: 2, dices: 1}),
        new Cluster(board[301], 3, {playerId: 2, dices: 1}),
        new Cluster(board[304], 4, {playerId: 2, dices: 1}),
        new Cluster(board[400], 5, {playerId: 2, dices: 1}),
        new Cluster(board[403], 6, {playerId: 2, dices: 1}),
        new Cluster(board[406], 7, {playerId: 2, dices: 1}),
        new Cluster(board[409], 8, {playerId: 2, dices: 1}),
        new Cluster(board[505], 9, {playerId: 2, dices: 1}),
        new Cluster(board[508], 10, {playerId: 0, dices: 1}),
        new Cluster(board[511], 11, {playerId: 1, dices: 1}),
        new Cluster(board[514], 12, {playerId: 0, dices: 1}),
        new Cluster(board[517], 13, {playerId: 1, dices: 1}),
    ];
}

function createTestClusters6(board) {
    let idCount = 0, playerCount = 0;
    return [
        new Cluster(board[79], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[82], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[85], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[88], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[91], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[187], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[190], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[193], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[196], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[292], idCount++, {playerId: ++playerCount, dices: 1}),
        new Cluster(board[295], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[298], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[301], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[304], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[400], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[403], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[406], idCount++, {playerId: ++playerCount, dices: 1}),
        new Cluster(board[409], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[505], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[508], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[511], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[514], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[517], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[613], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[616], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[619], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[622], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[718], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[721], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[724], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[727], idCount++, {playerId: playerCount, dices: 1}),
        new Cluster(board[730], idCount++, {playerId: playerCount, dices: 1}),
    ];
}