export class Node {
    constructor(index, row, col, hex) {
        this.index = index;
        this.row = row;
        this.col = col;
        this.hex = hex;
    }

    addNeighbours(board, rows, cols) {
        if (this.row !== 0 && this.col !== cols) this.upRight = board[this.index - cols];
        if (this.row !== 0 && !(this.col === 0 && this.row % 2 === 0)) this.upLeft = board[this.index - cols - 1];
        if (this.col !== 0) this.left = board[this.index - 1];
        if (this.row !== rows && !(this.col === 0 && this.row % 2 === 0)) this.downLeft = board[this.index + cols];
        if (this.row !== rows && this.col !== cols) this.downRight = board[this.index + cols + 1];
        if (this.col !== cols && !(this.col === cols - 1 && this.row % 2 !== 0)) this.right = board[this.index + 1];
    }

    getAdjacentNodesFromNode() {
        let nodes = [];
        if (this.upRight !== undefined) nodes.push(this.upRight);
        if (this.upLeft !== undefined) nodes.push(this.upLeft);
        if (this.left !== undefined) nodes.push(this.left);
        if (this.downLeft !== undefined) nodes.push(this.downLeft);
        if (this.downRight !== undefined) nodes.push(this.downRight);
        if (this.right !== undefined) nodes.push(this.right);
        return nodes;
    }
}
