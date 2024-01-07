const statusDisplay = document.querySelector('.game--status');
const startMenu = document.getElementById('start-menu');
const gameContainer = document.querySelector('.game--container');
const restartButton = document.querySelector('.game--restart');
const startButton = document.querySelector('.start-game-button');

let gameActive = false;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerNames = { X: "", O: "" };

const winningMessage = () => `${playerNames[currentPlayer]} has won!`;
const drawMessage = () => `Game in a draw`;
const currentPlayerTurn = () => `It's ${playerNames[currentPlayer]}'s turn`;

startButton.addEventListener('click', () => {
    playerNames.X = document.getElementById('playerX').value || 'Player X';
    playerNames.O = document.getElementById('playerO').value || 'Player O';

    startMenu.style.display = 'none';
    gameContainer.style.display = 'grid';
    restartButton.style.display = 'block';
    gameActive = true;
    statusDisplay.innerHTML = currentPlayerTurn();
});

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayChange();
}

function handlePlayChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
