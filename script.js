const game = (() => {
    
    var gameboard = (() => {
        var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        return {board};
    })();

    //screen to choose number of players
    const playerFactory = ((name, symbol, type) => {
        console.log("playerfactory");
    });
    //displays and updates the gameboard
    const displayController = (() => {
        playerFactory()
        //display board
        //add event listener for only ony click to each tile
        const initializeBoard = (() => {
            var addClick = document.getElementsByClassName("boardTile");
            Array.from(addClick).forEach(function(element) {
                element.addEventListener("click", getTile);
            });
        })();
        
        //when this is called get the clicked tile
        function getTile() {
            var tileId = event.target.id;
            var tile = document.getElementById(tileId);
            removeClick(tile);
        };

        function removeClick(tile) {
            addShape(tile);
            tile.removeEventListener("click", getTile);
        };

        //make this work for each player or computer
        //conditional for 2 players
        function addShape(tile) {
            tile.innerHTML = "tileTest"
            console.log("addShape");
        }        //on click function to add shape to tile
    })();

    //check tilies for win condition
    return {
        gameboard,
        playerFactory,
        displayController
    }
})();