import {CANVAS_WIDTH, CANVAS_HEIGHT} from '../js/info.js';
import {createBoard} from '../js/board';

test('create board default', () => {
    const nodesTotal = 817;
    let act = createBoard(CANVAS_WIDTH, CANVAS_HEIGHT);
    expect(act[0]).toHaveLength(nodesTotal);
    expect(act[1]).toMatchObject({index: Math.floor(nodesTotal / 2)})
});

test('create board 1280x720', () => {
    const nodesTotal = 817;
    let act = createBoard(1280, 720);
    expect(act[0]).toHaveLength(nodesTotal);
    expect(act[1]).toMatchObject({index: Math.floor(nodesTotal / 2)})
});
