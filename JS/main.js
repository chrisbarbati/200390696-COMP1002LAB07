// Each item can be either null, 0, or 1. 
// Null is empty, 0 is player 1, 1 is player 2
const boardState = [
    null, null, null,
    null, null, null,
    null, null, null
];

//The win condition array
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [6, 4, 2],
    [0, 4, 8]
];

//The active player
let activePlayer = 0;

//Cells
const cells = document.querySelectorAll("td");

//Add hover effect to each cell
cells.forEach(function (cell, index) {
    cell.dataset.index = index;

    cell.onmouseover = function () {
        cell.style.backgroundColor = "#ccc";
        cell.style.transition = ".4s";
    }

    cell.onmouseout = function () {
        cell.style.backgroundColor = "#fff";
    }

    cell.addEventListener("click", clicked);
});

//Function to call when cell is clicked
function clicked(event){
    const index = Number(event.target.dataset.index);

    const letter = activePlayer ? "O" : "X";

    const cell = event.target;
    event.target.textContent = letter;

    boardState[index] = activePlayer;

    cell.removeEventListener("click", clicked)
    cell.onmouseover = null;
    
    if (hasWon()){
        window.location = "./winner.html";
    }

    if (hasDrawn()){
        window.location = "./draw.html";
    }

    activePlayer = activePlayer ? 0 : 1;
}

//Function to determine if a player has won
function hasWon(){
    for(const condition of winConditions){
        const boardValues = condition.map(function (item) {
            return boardState[item];
        });

        const playerPieces = boardValues.filter(function (item) {
            return item === activePlayer;
        });
    
        if(playerPieces.length === 3) return true;
    }

    return false;
}

//Function to determine if there is a draw
function hasDrawn(){
    const boardCapacity = boardState.filter(function (item){
        return item !== null;
    });

    return boardCapacity.length === boardState.length;
}

const adain = document.querySelector("#again");

if(again){
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}