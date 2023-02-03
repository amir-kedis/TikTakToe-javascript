/**
 * This Module is responsible of controlling
 * and storing the game board
 */
const gameBoard = (() => {
    const _board = [
        "X", "O", "",
        "O", "", "O",
        "X", "O", "X"
    ];

    const getBoard = () => {
        return _board;
    };

    const playCell = (index, symbol) => {
        if (index < 9 && index >= 0) {
            _board[index] = symbol;
        }
    };

    return {
        getBoard,
        playCell
    }
})();

/**
 * This Module is responsible of rendering elements to the DOM
 * and getting inputs
 */
const displayController = (() => {
    /**
     * game Elements
     */
    const gameConfigElement = document.querySelector(".gameConfig");
    const boardEl = document.querySelector(".board");
    const resultElement = document.querySelector(".result");

    /**
     * updates the board UI with contents of gameBoard
     */
    const updateBoard = () => {
        const cells = document.querySelectorAll(".cell");
        const board = gameBoard.getBoard();

        cells.forEach((cell, index) => {
            if (board[index] === "X") {
                cell.classList.add("cell--x");
                cell.classList.remove("cell--o");
            } else if (board[index] === "O") {
                cell.classList.add("cell--o");
                cell.classList.remove("cell--x");
            } else if (board[index] === "") {
                cell.classList.remove("cell--x");
                cell.classList.remove("cell--o");
            }
        });
    }


    /**
     * show menu functions
     * they hide all menus expect one that is current
     */
    const showConfigMenu = () => {
        gameConfigElement.classList.remove("hidden");
        boardEl.classList.add("hidden");
        resultElement.classList.add("hidden");
    }

    const showBoard = () => {
        gameConfigElement.classList.add("hidden");
        boardEl.classList.remove("hidden");
        resultElement.classList.add("hidden");
    }

    const showResult = () => {
        gameConfigElement.classList.add("hidden");
        boardEl.classList.add("hidden");
        resultElement.classList.remove("hidden");
    }

    /**
     * changes the turns in the display
     */
    const exchangeTurns = () => {
        boardEl.classList.toggle("x-turn");
        boardEl.classList.toggle("o-turn");
    }

    return {
        updateBoard,
        showConfigMenu,
        showBoard,
        showResult,
        exchangeTurns
    }
})();

/**
 * This Factory is responsible of creating player objs
 * which control player info
 */
const createPlayer = () => {

};

/**
 * this module is responsible of making other modules 
 * comminute and managing the game on a high value
 */
const game = (() => {
    displayController.updateBoard();
})();