import {CANVAS_WIDTH, CANVAS_HEIGHT} from '../js/info.js';
import {createBoard} from '../js/board';

let board, startNode;

beforeAll(() => {
    [board, startNode] = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
});

test('create board', () => {
    const nodesTotal = 817;
    expect(board).toHaveLength(nodesTotal);
    expect(startNode).toMatchObject({id: Math.floor(nodesTotal / 2)});
});

test('get adjacent nodes from start-node', () => {
    expect(startNode.adjacentNodesFromNode()).toHaveLength(6);
});

