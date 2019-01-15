const Toolkit = require('./toolkit');

module.exports = class Generator {
    generate() {
        while (!this.internalGenerate()) {
        }
    }

    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row => row.map((v, i) => i))
            .map(row => Toolkit.matrix.shuffle(row));

        for (let i = 1; i <= 9; i++) {
            if (!this.fillNumber(i))
                return false
        }
        return true;
    };

    fillNumber(n) {
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if (rowIndex > 8) return true;
        const row = this.matrix[rowIndex];
        for (let i = 0; i < 9; i++) {
            const colIndex = this.orders[rowIndex][i];
            // 如果当前位置有值了，
            if (row[colIndex]) continue;
            // 如果检查行/列/宫已有，
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) continue;
            // 把n写进去
            row[colIndex] = n;

            // 去下一行填n，如果没填进去，就继续寻找当前行下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue
            }
            return true
        }
        return false
    }
};

// const gen = new Generator();
// gen.generate();
// const matrix = gen.matrix;
// console.log(matrix);