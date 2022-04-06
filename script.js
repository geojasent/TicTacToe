const game = (() => {
    
    var player1;
    var player2;
    // var computer;
    var tileId;
    var win = false;

    var gameBoardFactory = (() => {
        var board = new Array(9);
        var boardX = new Array(9);
        var boardO = new Array(9);
        return {board, boardX, boardO};
    })();

    var gameBoard = gameBoardFactory.board;
    var gameBoardX = gameBoardFactory.boardX;
    var gameBoardO = gameBoardFactory.boardO;

    const displayController = (() => {
        const initializePlayers = (() => {
            function addButtonClick() {
                var numPlayers = document.getElementsByTagName("button");
                Array.from(numPlayers).forEach(function(element) {
                element.addEventListener("click", getButtonId);
                });
            }
            addButtonClick();
            function getButtonId() {
                var buttonId = event.target.id;

                function playerFactory(buttonId, shape, ai) {
                    var player = {};
                    player.buttonId = buttonId;
                    player.shape = shape;
                    player.ai = ai;
                    return player;
                };

                if (buttonId == "replay") {
                    replay();
                } else {
                    switch (buttonId) {
                        case "1player":
                            player1 = playerFactory("player1", "X");
                            computer = playerFactory("computer", "O", "true")
                            break;
                        case "2player":
                            player1 = playerFactory("player1", "X");
                            player2 = playerFactory("player2", "O");
                            break;
                        }
                        return (player1, player2);
                    }
                }
        })();

        function replay() {
            player1.shape = "X"
            gameBoardFactory.board.length = 0;
            gameBoardFactory.boardO.length = 0;
            gameBoardFactory.boardX.length = 0;
            for (i = 0; i < 9; i++) {
                var boardTileId = document.getElementById(`tile-${i}`);
                boardTileId.innerHTML = "";
            }
            initializeBoard.addTileClick();
        }

        //add event listener for only one click to each tile
        const initializeBoard = (() => {
            function addTileClick() {
                var boardTile = document.getElementsByClassName("boardTile");
                Array.from(boardTile).forEach(function(element) {
                element.addEventListener("click", getTile);
                });
            }
            addTileClick();
            return {addTileClick}
        })();
        
        function getTile() {
            tileId = event.target.id;
            var tile = document.getElementById(tileId);
            removeClick(tile);
            return tile;
        };

        function removeClick(tile) {
            tile.removeEventListener("click", getTile);
            addShape(tile);
        };

        //maybe in the future make this work for with computer
        function addShape(tile) {
            var tileNumber = tile.dataset.number;
            var tempShape = player1.shape;
            if (player1.shape === "X") {
                tile.innerHTML = player1.shape;
                gameBoard[tileNumber] = player1.shape;
                gameBoardX[tileNumber] = player1.shape;
                checkWinModule.checkWin(tileNumber, player1.shape);
                player1.shape = "O";
            } else {
                tile.innerHTML = player1.shape;
                gameBoard[tileNumber] = player1.shape;
                gameBoardO[tileNumber] = player1.shape;
                checkWinModule.checkWin(tileNumber, player1.shape);
                player1.shape = "X";
            }
            displayWin(tempShape);
        };

        const checkWinModule = (() => {
            const winConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            //check win condition
            function checkWin(tileNumber, shape) {
                winConditions.forEach((item, index) => {
                    if (
                        gameBoard[winConditions[index][0]] === shape && 
                        gameBoard[winConditions[index][1]] === shape && 
                        gameBoard[winConditions[index][2]] === shape) {
                        win = true;
                    }
                });
            };
            return {checkWin};
            
        })();
        //adjust order of when this function runs
        function displayWin(shape) {
           if (win === true) {
            alert(`${shape} wins`)
            replay();
            win = false;
            }
        }
    })();
})();