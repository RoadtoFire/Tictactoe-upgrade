const gameBoard = (function() {
    let gameGrid = [" ", " "," "," ", " "," "," ", " "," "];

    const showGame = function() {
        console.log(gameGrid);
    }

    const addMark = function(index, mark = "X") {
        if (gameGrid[index] == ' ') {
            gameGrid[index] = mark;
            return true;
        } else {
            return false;
        }
        
    };

    const checkWinner = function() { 
        let winFlag = false;

        if (((gameGrid[0] == gameGrid[1]) && (gameGrid[1] == gameGrid[2])) && (gameGrid[0] !== " ")) {
            winFlag = true;
            return winFlag;
        }; 
        if (((gameGrid[3] == gameGrid[4]) && (gameGrid[4] == gameGrid[5])) && (gameGrid[3] !== " ")) {
            winFlag = true;
            return winFlag;
        };

        if (((gameGrid[6] == gameGrid[7]) && (gameGrid[7] == gameGrid[8])) && (gameGrid[6] !== " ")) {
            winFlag = true;
            return winFlag;
        };
        
        if (((gameGrid[0] == gameGrid[3]) && (gameGrid[3] == gameGrid[6])) && (gameGrid[0] !== " ")) {
            winFlag = true;
            return winFlag;
        };
        
        if (((gameGrid[1] == gameGrid[4]) && (gameGrid[4] == gameGrid[7])) && (gameGrid[1] !== " ")) {
            winFlag = true;
            return winFlag;
        };
        
        if (((gameGrid[2] == gameGrid[5]) && (gameGrid[5] == gameGrid[8])) && (gameGrid[2] !== " ")) {
            winFlag = true;
            return winFlag;
        };

        if (((gameGrid[0] == gameGrid[4]) && (gameGrid[4] == gameGrid[8])) && (gameGrid[0] !== " ")) {
            winFlag = true;
            return winFlag;
        };
        
        if (((gameGrid[2] == gameGrid[4]) && (gameGrid[4] == gameGrid[6])) && (gameGrid[2] !== " ")) {
            winFlag = true;
            return winFlag;
        };

        if (!gameGrid.includes(" ")) {
            console.log("It is a draw!")
            return;
        }

        return winFlag;

        

};

    return {
        showGame,
        addMark,
        checkWinner
    }
})();


const createPlayer = function(name, mark) {
    return {
        name,
        mark,
    }
};

const player1 = createPlayer("Jawwad", "X");
const player2 = createPlayer("Hammad", "O");




const gameControl = (function() {
   let currentPlayer = player1;

   const doTurn = function(selectedBox) {
    if (gameBoard.addMark(selectedBox,currentPlayer.mark)) {
        console.log(`${currentPlayer.name} made his move`);
    } else {
        console.log(`Invalid move by ${currentPlayer.name}`)
        return;
    }

    if (gameBoard.checkWinner() == true) {
        console.log(`Congratulations! ${currentPlayer.name} is the winner!`)
        return;
    };

    if (currentPlayer == player1) {
        currentPlayer = player2
    } else {
        currentPlayer = player1
    }
   }
   return {
    doTurn
   }
})();


gameControl.doTurn(0);
gameBoard.showGame();

gameControl.doTurn(0);
gameBoard.showGame();

gameControl.doTurn(2);
gameBoard.showGame();

gameControl.doTurn(3);
gameBoard.showGame();

gameControl.doTurn(4);
gameBoard.showGame();

gameControl.doTurn(6)
