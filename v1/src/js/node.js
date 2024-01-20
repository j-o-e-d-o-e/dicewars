export class Node {
    constructor(index, row, col, hex) {
        this.id = index;
        this.row = row;
        this.col = col;
        this.hex = hex;
        this.cluster = undefined;
    }

    addNeighbours(board, rows, cols) {
        if (this.row !== 0 && this.col !== cols) this.upRight = board[this.id - cols];
        if (this.row !== 0 && !(this.col === 0 && this.row % 2 === 0)) this.upLeft = board[this.id - cols - 1];
        if (this.col !== 0) this.left = board[this.id - 1];
        if (this.row !== rows && !(this.col === 0 && this.row % 2 === 0)) this.downLeft = board[this.id + cols];
        if (this.row !== rows && this.col !== cols) this.downRight = board[this.id + cols + 1];
        if (this.col !== cols && !(this.col === cols - 1 && this.row % 2 !== 0)) this.right = board[this.id + 1];
    }

    getAdjacentNodesFromNode() {
        return [this.upRight, this.upLeft, this.left, this.downLeft, this.downRight, this.right].filter(n => n !== undefined);
    }
}
