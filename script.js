const gameBoard = (function() {
    const gameGrid = Array(9).fill("");


    function getBoard() {
        return [...gameGrid];
    }

    function updateBoard(index, mark) {
        gameGrid[index] = mark;
    }

    function resetBoard() {
        gameGrid.fill("");
    }

    return { getBoard, updateBoard, resetBoard };
})();


function createPlayer(name, mark) {
    
    return { name, mark };
};




const gameController = (function() {
    let playerOne;
    let playerTwo;
    let gameOver;
    let currentPlayer;



    function isValid(index) {
        if (gameOver === true) {
            return false;
        }
        
        const board = gameBoard.getBoard();
        if (((index >= 0) && (index <= 8) && (board[index] === ""))) {
            return true;
        };
        return false;
    }

    function checkWinner() {
        const board = gameBoard.getBoard();
        if (((board[0] === board[1]) && (board[1] === (board[2]))) && (board[0] != "")) {
            return true;
        }

        if (((board[3] === board[4]) && (board[4] === (board[5]))) && (board[5] != ""))  {
            return true;
        }

        if (((board[6] === board[7]) && (board[7] === (board[8]))) && (board[8] != "")) {
            return true;
        }

        if (((board[0] === board[4]) && (board[4] === (board[8]))) && (board[8] != "")) {
            return true;
        }

        if (((board[2] === board[4]) && (board[4] === (board[6]))) && (board[6] != "")) {
            return true;
        }

        if (((board[0] === board[3]) && (board[3] === (board[6]))) && (board[6] != "")) {
            return true;
        }

        if (((board[1] === board[4]) && (board[4] === (board[7]))) && (board[7] != "")) {
            return true;
        }

        if (((board[2] === board[5]) && (board[5] === (board[8]))) && (board[8] != "")) {
            return true;
        }

        return false;
    }

    function checkDraw() {
        const board = gameBoard.getBoard()
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                return false;
            }
        }
        return true;
    }

    function swapTurn() {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            if (currentPlayer === playerTwo) {
                currentPlayer = playerOne;
            }
        };
    };

    function startGame(name1, name2) {
        playerOne = createPlayer(name1, "X");
        playerTwo = createPlayer(name2, "O");
        currentPlayer = playerOne;
        gameBoard.resetBoard()
        gameOver = false;
        return "started";
    }

    function attemptMark(index) {
        if (isValid(index) === false) {
            return "invalid";
        }
        gameBoard.updateBoard(index, currentPlayer.mark);
    }

    function playRound(index) {
        if (attemptMark(index) === "invalid") {
            return "invalid"
        };

        if (checkWinner() === true) {
            gameOver = true;
            return "win"
        };

        if (checkDraw() === true) {
            gameOver = true;
            return "draw"
        };

        swapTurn();

        return "continue";

    }

    function getActivePlayer() {
        return currentPlayer;
    }


    return { playRound, startGame, getActivePlayer }
})();



const displayController = (function () {

    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const player1 = document.getElementById("player1-name");
    const player2 = document.getElementById("player2-name");
    const startButton = document.getElementById("start-btn");
    const resetButton = document.getElementById("reset-btn");
    const currentTurn = document.getElementById("current-turn");

    let boardEnabled = false;


    function handleBoard(e) {
        if (!(boardEnabled)) {
            return;
        }
        if (e.target.classList.contains("cell")) {
                let index = Number(e.target.dataset.index);
                const result = gameController.playRound(index);

                if (result === "invalid") {
                    message.textContent = "invalid choice";
                    return;
                } else {
                    renderBoard();   
                }

                if (result === "win") {
                    let activePlayer = gameController.getActivePlayer()
                    message.textContent = `the winner is ${activePlayer.name}`;
                    boardEnabled = false;
                    currentTurn.textContent = "";
                }
                if (result === "draw") {
                    message.textContent = `The game is drawn!`;
                    boardEnabled = false;
                    currentTurn.textContent = "";
                }

                if (result === "continue") {
                    let activePlayer = gameController.getActivePlayer()
                    currentTurn.textContent = `Current Player: ${activePlayer.name}`
                };
      };
    }
    board.addEventListener("click", handleBoard);
    
    function renderBoard() {
        let boardArray = gameBoard.getBoard();
        board.textContent = "";

        for (let i = 0; i < boardArray.length; i++) {
            let newElement = document.createElement("div");
            newElement.textContent = boardArray[i];
            newElement.className = "cell";
            newElement.dataset.index = i;
            board.appendChild(newElement);

        }
    }


    startButton.addEventListener("click", function() {
        if ((player1.value === "") || (player2.value === "")) {
            return message.textContent = "Please enter player names to start the game"
        }
        boardEnabled = true;
        gameController.startGame(player1.value, player2.value);
        message.textContent = "Game started";
        renderBoard()
    });

    resetButton.addEventListener("click", function() {
        gameBoard.resetBoard();
        player1.value = "";
        player2.value = "";
        renderBoard();
        boardEnabled = false;
        message.textContent = "Game was reset";
        currentTurn.textContent = "";
    })

})();