/**
 * This Module is responsible of controlling * and storing the game board
 */
const gameBoard = (() => {
    const _board = [
        "", "", "",
        "", "", "",
        "O", "O", "O"
    ];

    const getBoard = () => {
        return _board;
    };

    const playCell = (index, symbol) => {
        if (index < 9 && index >= 0) {
            _board[index] = symbol;
        }
    };

    const checkForWin = () => {
        const winningCombinations = [
            ["X", "X", "X", "", "", "", "", "", "",],
            ["", "", "", "X", "X", "X", "", "", "",],
            ["", "", "", "", "", "", "X", "X", "X",],
            ["X", "", "", "X", "", "", "X", "", "",],
            ["", "X", "", "", "X", "", "", "X", "",],
            ["", "", "X", "", "", "X", "", "", "X",],
            ["X", "", "", "", "X", "", "", "", "X",],
            ["", "", "X", "", "X", "", "X", "", "",],
        ];
    };

    /**
     * return true if game is won by row combination 
     * by the symbol
     * @param {String} symbol 
     * @returns bool
     */
    const _checkForRows = (symbol) => {
        for (let row = 0; row < 3; row++) {
            const boardRow = _board.slice(row * 3, (row + 1) * 3);
            if (boardRow.every((el) => el === symbol)) {
                return true;
            }
        }
        return false;
    }



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
     * managing items
     */
    const cells = boardEl.querySelectorAll(".cell");
    const board = gameBoard.getBoard();

    /**
     * updates the board UI with contents of gameBoard
     */
    const updateBoard = () => {
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

    /**
     * attaches click events to the board
     */
    const attachCellEvents = () => {
        boardEl.addEventListener("click", (e) => {
            game.play(e);
        })
    };

    return {
        updateBoard,
        showConfigMenu,
        showBoard,
        showResult,
        exchangeTurns,
        attachCellEvents
    }
})();

/**
 * This Factory is responsible of creating player objs
 * which control player info
 */
const createPlayer = () => {

    return {

    }
};

/**
 * this module is responsible of making other modules 
 * comminute and managing the game on a high value
 */
const game = (() => {
    const boardEl = document.querySelector(".board");

    /**
     * this function marks the player mark in the board
     * it also exchanges turns and updates interface
     * @param {event} e 
     * @returns 
     */
    const play = (e) => {
        const ID = e.target.dataset.cellid;

        if (gameBoard.getBoard()[ID] !== "") {
            return;
        }

        if (boardEl.classList.contains("x-turn")) {
            gameBoard.playCell(ID, "X");
        } else {
            gameBoard.playCell(ID, "O");
        }

        displayController.exchangeTurns();
        displayController.updateBoard();
    }

    displayController.attachCellEvents();
    displayController.updateBoard();

    return {
        play
    }
})();