/**
 * To run the program, Node JS was used. To load a file, you must specify the path to it.
 * The file is written as a matrix of elements with a space separator.
 * During testing, a text file (.txt) was downloaded with the following contents:
 * 0 0 0 1
 * 1 1 0 1
 * 0 0 0 0
 * 1 0 1 1
 * 0 1 1 0
 * 0 1 0 1
 * 0 0 0 0
 * 1 0 1 0
 * 
 * @author Averyanov Timofey <timhaha@yandex.ru>
 */
(function() {
    "use strict";

    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question0 = "---\nWhat do you want to do?\n\t1. Generate a board\n\t2. Load file\nEnter 1 or 2: ",
          question1 = "---\nEnter board size m x n. Example: 2 3\nSize: ",
          question2 = "---\nEnter the path to the file. Example: 'data/matrix.txt'\npath: ";

    new Promise(resolve => {
        rl.question(question0, num => {
            switch (+num) {
                case 1: {
                    rl.question(question1, size => {
                        rl.close();
                        resolve(fillBoard(size));
                    });
                }
                case 2: {
                    rl.question(question2, path => {
                        rl.close();
                        resolve(fileLoad(path));
                    });
                }
            }
        });
    }).then(board => {
        console.log("The initial state of the cell board:");
        console.table(board);
        setInterval(() => {
            board = updateBoard(board);
            console.table(board);
        }, 1000);
    });
        

    /**
     * Loads data located locally (with a space separator) and transforms it into a matrix of cells
     * 
     * @param {string} path - the path to the file
     * @return {object} cell matrix
     */
    function fileLoad(path) {
        try {
            let board = require("fs").readFileSync(path);
            return board.toString('utf8').split("\r\n").map(row => row.split(" ").map(item => +item));
        } catch(err) {
            throw Error("Error!");
        }
    }

    /**
     * Сreates a matrix with random numbers 0 and 1
     * 
     * @param {object} size - width and heiht of board
     * @return {object} cell matrix
     */
    function fillBoard(size) {
        let n = +size.split(" ")[0],
            m = +size.split(" ")[1];
        return [...Array(n)].map( () => [...Array(m)].map( () => Math.round( Math.random() ) ) );
    }

    /**
     * Updates cell board
     * 
     * @param {object} board - updating board
     * @return {object} updated board
     */
    function updateBoard(board) {
        let n = board.length,
            m = board[0].length;
        let updatedBoard = board.map( (row, i) => row.map( (col, j) => {
            let cells = numLivingCells(board, i, j, n, m);
            switch (col) {
                case 1:
                    return (cells === 2 || cells === 3) ? 1 : 0;
                case 0:
                    return (cells === 3) ? 1 : 0;
            }
        }));
        return updatedBoard;
    }

    /**
     * Counts the number of living cells around a given
     * 
     * @param {object} board - updating board
     * @param {number} i - x coordinate
     * @param {number} j - y coordinate
     * @param {number} n - width of board
     * @param {number} m - heiht of board
     * @return {number} number of cells
     */
    function numLivingCells(board, i, j, n, m) {
        let cellsAlive = 0;
        for (let k = i - 1; k <= i + 1; k++) {
            for (let t = j - 1; t <= j + 1; t++) {
                if ((k !== i || t !== j) && k >= 0 && k < n && t >= 0 && t < m && board[k][t] === 1) {
                    cellsAlive++;
                }
            }
        }
        return cellsAlive;
    }
}());