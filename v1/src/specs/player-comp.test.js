import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";
import {Comp} from "../js/player-comp.js";

let clusters, player;

beforeAll(() => {
    let [_, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(startNode);
    player = createPlayers(clusters)[0][0];
});

test('test', () => {
    player.move(clusters);
    expect(player instanceof Comp).toBeTruthy();
});