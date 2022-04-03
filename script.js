const game = (() => {
    
    var player1;
    var player2;
    var computer;
    var tileId;
    
    var gameboard = (() => {
        var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        return {board};
    })();

    const displayController = (() => {
        const initializePlayers = (() => {
            var numPlayers = document.getElementsByTagName("button");
            Array.from(numPlayers).forEach(function(element) {
                element.addEventListener("click", playerAssign);
            });
            
            function playerAssign() {
                var buttonPlayer = event.target.id;

                function playerFactory(buttonId, shape) {
                    var player = {};
                    player.buttonId = buttonId;
                    player.shape = shape;
                    return player;
                };

                switch (buttonPlayer) {
                    case "1player":
                        player1 = playerFactory("player1", "X");
                        computer = playerFactory("computer", "O")
                        break;
                    case "2player":
                        player1 = playerFactory("player1", "X");
                        player2 = playerFactory("player2", "O");
                        break;
                    }
                    return (player1, player2);
                }
        })();

        //add event listener for only one click to each tile
        const initializeBoard = (() => {
            var addClick = document.getElementsByClassName("boardTile");
            Array.from(addClick).forEach(function(element) {
                element.addEventListener("click", getTile);
            });
        })();
        
        function getTile() {
            tileId = event.target.id;
            var tile = document.getElementById(tileId);
            removeClick(tile);
            return tile;
        };

        function removeClick(tile) {
            addShape(tile);
            tile.removeEventListener("click", getTile);
        };

        //make this work for each player or computer
        //conditional for 2 players
        function addShape(tile) {
            var tileNumber = tile.dataset.number;
            if (player1.shape === "X") {
                tile.innerHTML = player1.shape;
                gameboard.board[tileNumber] = player1.shape
                player1.shape = "O";
            } else {
                tile.innerHTML = player1.shape;
                gameboard.board[tileNumber] = player1.shape
                player1.shape = "X";
            }
            checkWinModule.checkWin();
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

            function checkWin() {
                console.log(gameboard.board)
                console.log("test");

            };
            return {checkWin};
            //iterate through board and check for x or o
            //if x or o 3 in a show box with win
        })();
    })();
    
    return {
        gameboard,
        displayController
    }
})();