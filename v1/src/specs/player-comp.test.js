import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../js/info.js";
import {createBoard} from "../js/board.js";
import {createClusters} from "../js/clusters.js";
import {createPlayers} from "../js/players.js";
import {Comp} from "../js/player-comp.js";

let clusters, players, comp;

beforeAll(() => {
    let [_, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    clusters = createClusters(startNode);
    players = createPlayers(clusters)[0];
    comp = players[0];
});

test('test', () => {
    let other = players.find(p => p instanceof Comp && p.id !== comp.id);
    clusters.forEach((c, i) => {
        if (i % 2 === 0) c.playerId = other.id
    });
    let res = comp.mightiestOther(clusters, players);
    expect(res).toBe(other);
});