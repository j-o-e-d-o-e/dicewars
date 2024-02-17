import {RADIUS_HEX} from './info.js';
import {Node} from './node.js';

export function createBoard(width, height) {
    const ySpacing = RADIUS_HEX * 3 / 2;
    const xSpacing = RADIUS_HEX * Math.sqrt(3);
    let board = [];
    let index = 0, row = 0, col = 0;
    for (let y = ySpacing * 2, z = 0; y + RADIUS_HEX <= height; y += ySpacing, z++) {
        let xOffset = z % 2 === 0 ? 0 : RADIUS_HEX - 1;
        col = 0;
        for (let x = xSpacing + xOffset; x + RADIUS_HEX <= width; x += xSpacing) {
            let hex = createHexagon(x, y);
            board.push(new Node(index++, row, col, hex));
            col++;
        }
        row++;
    }
    for (let node of board) node.addNeighbours(board, row - 1, col - 1);
    return [board, board[Math.floor(index / 2)]];
}

function createHexagon(x, y) {
    let hexagon = {center: {x, y}, corners: []};
    for (let i = 0; i < 6; i++) {
        let angle = Math.PI / 180 * (60 * i - 30);
        hexagon.corners.push({x: x + RADIUS_HEX * Math.cos(angle), y: y + RADIUS_HEX * Math.sin(angle)})
    }
    return hexagon;
}
