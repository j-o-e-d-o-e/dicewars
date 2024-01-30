import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";
import {Comp} from "../js/player-comp.js";

let clusters, players;

beforeAll(() => {
    let [_, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(startNode);
    players = createPlayers(clusters)[0];
});

test('test', () => {
    expect(players[0] instanceof Comp).toBeTruthy();
});