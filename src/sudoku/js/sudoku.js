const Generator = require('./generator')
module.exports = class sudoku {
    constructor() {
        const gen = new Generator();
        gen.generate();
        this.solutionMatrix = gen.matrix
    }

    make(level = 2) {
        const pullMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level*2 ? '0' : cell)
        });
        this.puzzleMatrix = pullMatrix
    }
}