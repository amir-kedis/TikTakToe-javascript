/**
 * This Module is responsible of controlling * and storing the game board
 */
const gameBoard = (() => {
  const _board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const getBoard = () => {
    return _board;
  };

  const playCell = (index, symbol) => {
    if (index < 9 && index >= 0) {
      _board[index] = symbol;
    }
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

  /**
   * return true if game is won by row combination 
   * by the symbol
   * @param {String} symbol 
   * @returns bool
   */
  const _checkForColumns = (symbol) => {

    const columns = [
      [_board[0], _board[3], _board[6]],
      [_board[1], _board[4], _board[7]],
      [_board[2], _board[5], _board[8]],
    ]

    for (const col of columns) {
      if (col.every((el) => el === symbol)) {
        return true;
      }
    }

    return false;
  }

  /**
 * return true if game is won by row combination 
 * by the symbol
 * @param {String} symbol 
 * @returns bool
 */
  const _checkForDiagonals = (symbol) => {

    const diagonals = [
      [_board[0], _board[4], _board[8]],
      [_board[2], _board[4], _board[6]],
    ]

    for (const diagonal of diagonals) {
      if (diagonal.every((el) => el === symbol)) {
        return true;
      }
    }

    return false;
  }

  /**
   * return the winner player or empty string if no player has won
   * @returns "x" || "O" || ""
   */
  const checkForWin = () => {
    // for X 
    if (_checkForRows("X") || _checkForColumns("X") || _checkForDiagonals("X")) {
      return "X";
    }
    // for O
    if (_checkForRows("O") || _checkForColumns("O") || _checkForDiagonals("O")) {
      return "O";
    }
    return "";
  };

  /**
   * checks if the game is tie or not
   * @returns Bool
   */
  const checkForTie = () => {
    const isBoardFull = _board.every(el => el !== "");
    const isWon = checkForWin();

    return (isBoardFull && !isWon);
  }

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      _board[i] = "";
    }
  }

  const isEmpty = () => {
    return _board.every(cell => cell === "");
  }

  const EmptyCellsNumbers = () => {
    const count = 0;
    for (const cell of _board) {
      if (cell === "") {
        count++;
      }
    }
    return count;
  }

  const getLegalMoves = () => {
    const legalMoves = [];

    gameBoard.getBoard().forEach((cell, id) => {
      if (cell === "") {
        legalMoves.push(id);
      }
    })

    return legalMoves;
  }

  return {
    getBoard,
    playCell,
    checkForWin,
    checkForTie,
    resetBoard,
    getLegalMoves,
    isEmpty,
    EmptyCellsNumbers,
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

  const showResult = (msg) => {
    gameConfigElement.classList.add("hidden");
    boardEl.classList.add("hidden");
    resultElement.classList.remove("hidden");
    resultElement.querySelector("h2").textContent = msg;
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

  const attachBtnEvents = () => {
    document.querySelector("#startBtn").addEventListener("click", () => {
      game.startGame();
    });
    document.querySelector("#restart").addEventListener("click", () => {
      game.restartGame();
    });
  }

  return {
    updateBoard,
    showConfigMenu,
    showBoard,
    showResult,
    exchangeTurns,
    attachCellEvents,
    attachBtnEvents
  }
})();

/**
 * This Factory is responsible of creating player objs
 * which control player info
 */
const createPlayer = (symbol, type) => {
  return {
    symbol,
    type
  }
};

/**
 * this module is responsible of making other modules 
 * comminute and managing the game on a high value
 */
const game = (() => {
  // players
  let player1;
  let player2;

  const boardEl = document.querySelector(".board");

  const init = () => {
    displayController.attachBtnEvents();
    displayController.attachCellEvents();
  }

  const startGame = () => {
    // display part
    displayController.showBoard();

    // get type of player 2
    const player2Type = document.querySelector("#SelectPlayer").value;

    // create players
    player1 = createPlayer("X", "human");
    player2 = createPlayer("O", player2Type);

    // update interface
    displayController.updateBoard();
  }

  const restartGame = () => {
    gameBoard.resetBoard();
    displayController.updateBoard();
    boardEl.classList.add("x-turn");
    boardEl.classList.remove("o-turn");
    displayController.showConfigMenu();
  }

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

    if (player2.type === "human") {
      if (boardEl.classList.contains("x-turn")) {
        gameBoard.playCell(ID, "X");
      } else {
        gameBoard.playCell(ID, "O");
      }
      displayController.exchangeTurns();
    } else if (player2.type === "aiEasy") {

      gameBoard.playCell(ID, "X");
      displayController.exchangeTurns();
      gameBoard.playCell(_aiEasyMove(), "O");
      displayController.exchangeTurns();
    }


    displayController.updateBoard();

    if (gameBoard.checkForWin() === "X") {
      displayController.showResult("X WON!!!");
    } else if (gameBoard.checkForWin() === "O") {
      displayController.showResult("O WON!!!");
    } else if (gameBoard.checkForTie()) {
      displayController.showResult("TIE!!!");
    }
  }

  const _aiEasyMove = () => {
    const legalMoves = gameBoard.getLegalMoves();

    const randomNum = Math.floor(Math.random() * legalMoves.length);

    return legalMoves[randomNum];
  }

  return {
    play,
    startGame,
    restartGame,
    init,
  }
})();



// start game
game.init();