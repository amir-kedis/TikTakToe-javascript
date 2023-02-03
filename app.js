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
    return {
        getBoard,
    }
})();

/**
 * This Module is responsible of rendering elements to the DOM
 * and getting inputs
 */
const displayController = (() => {
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

    return {
        updateBoard
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