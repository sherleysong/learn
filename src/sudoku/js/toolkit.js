/**
 * 
 */

const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        return array.fill(v)
    },
    makeMatrix(v = 0) {
        return Array.from({
            length: 9
        }, () => this.makeRow(v))
    },
    shuffle(array) {
        for (let i = 0; i < array.length; i++) {
            const j = Math.floor(Math.random() * 8);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    /**
     * 检查当前空格是否可以填写本元素n: 1~9 。
     */
    checkFillable(matrix, n, rowIndex, colIndex) {

        const row = matrix[rowIndex];
        // matrix 每一列 的数据 
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
        // 获取对应宫格内的坐标对象值
        const boxIndex = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        // 获取对应宫格内的一组数据 
        const box = boxToolkit.getBoxCell(matrix, boxIndex.box_x);
        // 判断行内，列内，宫格内，不含n 
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) {
                return false;
            }
        }
        return true
    }
}


/**
 * 坐标系工具
 */

const boxToolkit = {
    // 获取matrix中第x个宫格的数组
    getBoxCell(matrix, x) {
        const result = [];
        for (let i = 0; i < 9; i++) {
            const rowIndex = Math.floor(x / 3) * 3 + Math.floor(i / 3);
            const colIndex = x % 3 * 3 + i % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    // 获取matrix中第colIndex列的数组
    getColumn(matrix, colIndex) {
        const result = [];
        for (let i = 0; i < 9; i++) {
            result.push(matrix[i][colIndex]);
        }
        return result;
    },
    // 行列转换成宫格
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            box_x: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            box_y: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    // 宫格转成行列
    convertfromBoxIndex(box_x, box_y) {
        return {
            rowIndex: Math.floor(box_x / 3) * 3 + Math.floor(box_y / 3),
            colIndex: box_x % 3 * 3 + box_y % 3
        }
    }
}

// 工具集
module.exports = class Toolkit {
    static get matrix() {
        return matrixToolkit
    }
    static get box() {
        return boxToolkit
    }
};