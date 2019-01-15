function checkArray(array) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);
    for (let i = 0; i < length; i++) {
        if (!marks[i]) {
            continue;
        }
        
        if (array[i].length > 1) {
            marks[i] = false;
            continue
        }

        const v = array[i];


        if (!v) {
            marks[i] = false;
            continue
        }

        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false
            }
        }
    }
    return marks
}

const Tookit = require('./toolkit')
/**
 * 输入： matrix 数独数据
 * 处理： 对matrix 行/列/宫分别检查写入marks
 * 输出： 检查是否成功/marks
 */

module.exports = class Checker {
    constructor(matrix) {
        this._matrix = matrix;
        this._matrixMarks = Tookit.matrix.makeMatrix(true)
    }

    check() {
        console.log('check start ... ')
        this.checkRows();
        this.checkColums();
        this.checkCells();
    }

    checkRows() {
        console.log('checkRows ... ')
        this._matrix.forEach((element, i) => {
            this._matrixMarks[i] = checkArray(element);
        })
    }

    checkColums() {
        console.log('checkColums ... ')
        // var _result = [];
        for (let i = 0; i < 9; i++) {
            var col = [];
            for (let j = 0; j < 9; j++) {
                col.push(this._matrix[j][i]);
            }
            checkArray(col).forEach((element, n) => {
                if (!element) {
                    this._matrixMarks[n][i] = element
                }
            })
        }
        
    }

    checkCells() {
        console.log('check Cells ..... ');
        for (let i = 0; i < 9; i++) {
            checkArray(Tookit.box.getBoxCell(this._matrix, i)).forEach((element, n) => {
                if (!element) {
                    const arr = Tookit.box.convertfromBoxIndex(i, n)
                    this._matrixMarks[arr.rowIndex][arr.colIndex] = element
                }
            })
        }
    }

}


// const Generator = require('./generator')
// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
// matrix[0][0] = matrix[1][1];
// const checker = new Checker(matrix);
// checker.check();

// console.log('checker._matrix');
// console.log(checker._matrix);
// console.log('checker._matrixMarks')
// console.log(checker._matrixMarks)
// console.log(test1);