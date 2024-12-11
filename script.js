const board = document.getElementById("board");
const resetBtn = document.getElementById("reset-btn");
const msg = document.getElementById("msg");
const endMsg = document.getElementById("end-msg");
const pntPly1 = document.getElementById("points-1");
const pntPly2 = document.getElementById("points-2");

const boardArr = ["", "", "", "", "", "", "", "", ""];
let player = 0;
let score1 = 0;
let score2 = 0;

// Event Listener for board clicks
board.addEventListener("click", (event) => {
    const cellPresent = event.target.classList.contains("cell");
    if (cellPresent) {
        isValidMove(event.target.id);
    }
});

// Event Listener for reset button
resetBtn.addEventListener("click", resetGame);

function isValidMove(cellId) {
    if (boardArr[cellId - 1] !== "") {
        return false; // If cell is already filled
    }

    const cell = document.getElementById(cellId);
    boardArr[cellId - 1] = cell.textContent = player ? "O" : "X";
    player = !player;
    msg.textContent = `Turn : ${player ? "O" : "X"}`;

    const winner = checkWinner();
    if (winner) {
        updateScoreboard(winner);
        msg.textContent = "Game Over!";
        showEndMsg(winner);
    } else if (!boardArr.some(checkEmpty)) {
        showEndMsg("Draw");
    }
}

function checkEmpty(str) {
    return str === "";
}

function checkWinner() {
    const winningCondtn = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (const cond of winningCondtn) {
        const [a, b, c] = cond;
        if (boardArr[a] && boardArr[a] === boardArr[b] && boardArr[a] === boardArr[c]) {
            return boardArr[a];
        }
    }
    return null;
}

function resetGame() {
    endMsg.style.display = "none";
    board.style.display = "grid";

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });

    boardArr.fill("");
    player = 0;
    msg.textContent = "Turn : X";
}

function updateScoreboard(winner) {
    if (winner === "X") {
        pntPly1.textContent = ++score1;
    } else {
        pntPly2.textContent = ++score2;
    }
}

function showEndMsg(winner) {
    if (winner === "Draw") {
        endMsg.textContent = "It's a Draw!";
    } else {
        endMsg.textContent = `${winner} Wins!`;
        highlightWinningCells(getWinningCells(winner));
    }
    endMsg.style.display = "block";
    board.style.display = "none";
}

function getWinningCells(winner) {
    const winningCondtn = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (const cond of winningCondtn) {
        const [a, b, c] = cond;
        if (boardArr[a] === winner && boardArr[a] === boardArr[b] && boardArr[a] === boardArr[c]) {
            return cond;
        }
    }
    return [];
}

function highlightWinningCells(cells) {
    cells.forEach(index => {
        const cell = document.getElementById(index + 1);
        cell.classList.add("win");
    });
}
