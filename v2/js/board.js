import {CANVAS_WIDTH, CANVAS_HEIGHT, RADIUS_HEX} from './info.js';
import {Node} from './node.js';

const calculateYSpacing = () => RADIUS_HEX * 3 / 2;
const calculateXSpacing = () => RADIUS_HEX * Math.sqrt(3);
const calculateXOffset = (z) => z % 2 === 0 ? 0 : RADIUS_HEX - 1;
const isWithinCanvas = (x, y) => x + RADIUS_HEX <= CANVAS_WIDTH && y + RADIUS_HEX <= CANVAS_HEIGHT;

export function createBoard() {
    const ySpacing = calculateYSpacing();
    const topPadding = ySpacing * 2;
    const xSpacing = calculateXSpacing();
    let board = [];
    let index = 0, row = 0, col = 0;
    for (let y = topPadding, z = 0; isWithinCanvas(xSpacing + calculateXOffset(z), y); y += ySpacing, z++) {
        let xOffset = calculateXOffset(z);
        col = 0;
        for (let x = xSpacing + xOffset; isWithinCanvas(x, y); x += xSpacing) {
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
