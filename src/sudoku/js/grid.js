import Toolkit from './toolkit'
import Checker from './check'
const Sudoku = require('./sudoku')
const sudoku = new Sudoku();

class Grid {
    constructor(DOM) {
        this._DOM = DOM;
    }
    build(level = 2) {
        sudoku.make(level);
        const matrix = sudoku.puzzleMatrix;
        const cells = matrix.map(rowValues => rowValues
            .map(cellValue => {
                return $('<span>')
                    .text(cellValue == 0 ? '' : cellValue)
                    .addClass(cellValue == 0 ? '' : 'fixed');
            })
        )
        const DOMContent = cells.map(m => {
            return $('<div>').append(m)
        })
        this._DOM.empty().append(DOMContent)
    }
    fill(targetCell, e) {
        if (!targetCell) return;
        const $cell = targetCell;
        const $span = $(e.target);
        if ($span.hasClass('clear')) {
            $cell.text('');
            return
        }
        $cell.text($span.text())
    }
    check() {
        const data = this._DOM.children('div')
            .map((rowIndex, div) => {
                return $(div).children()
                    .map((colIndex, span) => $(span).text())
            })
            .toArray()
            .map($data => $data.toArray())
        const checker = new Checker(data);
        checker.check();
        const marks = checker._matrixMarks;
        let _boolean = true;
        marks.forEach((rows, i) => {
            rows.forEach((cell, j) => {
                // 检查不成功，进行标记
                if (!cell) {
                    this._DOM.children().eq(i).children().eq(j).addClass('focus');
                    _boolean = false;
                }
            })
        })
        if(_boolean) return _boolean
    }
    reset() {
        this._DOM.find("span:not(.fixed)").text('')
    }
    rebuild(level) {
        this.build(level);
    }
    help() {
        console.log('help start ...');
        const pm = sudoku.puzzleMatrix;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cellValue = pm[i][j];

                //对没有填数据的地方进行填充

                if (cellValue == 0) {
                    // 当前单元格可以填的数字
                    let possibleNumbers = []

                    const colArr = Toolkit.box.getColumn(pm, j)
                    const boxArr = Toolkit.box.getBoxCell(pm, Toolkit.box.convertToBoxIndex(i, j).box_x)

                    for (var x = 1; x <= 9; x++) {
                        // 非当前单元格所在行列宫的数字
                        if (colArr.indexOf(x) == -1 && boxArr.indexOf(x) == -1 && pm[i].indexOf(x) == -1) {
                            possibleNumbers.push(x);
                        }
                    }
                    if (possibleNumbers.length > 1) {

                        for (let _i = 0; _i < possibleNumbers.length; _i++) {
                            possibleNumbers[_i] = '<i class="pos_' + possibleNumbers[_i] + '" > ' + possibleNumbers[_i] + '</i>'
                        }
                    }
                    this._DOM.find('div').eq(i).find('span').eq(j).html(possibleNumbers.join(''))
                }
            }
        }

    }

}

export default Grid;