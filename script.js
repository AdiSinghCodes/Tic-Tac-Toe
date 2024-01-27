// Constants to represent players
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initial game state
let currentPlayer = PLAYER_X;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = Array.from(clickedCell.parentElement.children).indexOf(clickedCell);

  // Check if the cell is empty and the game is still active
  if (gameBoard[cellIndex] === '' && gameActive) {
    // Update the game board and display
    gameBoard[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    // Check for a winner or a tie
    if (checkWinner()) {
      document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (checkTie()) {
      document.getElementById('message').innerText = 'It\'s a tie!';
      gameActive = false;
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Function to check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

// Function to check for a tie
function checkTie() {
  return !gameBoard.includes('') && !checkWinner();
}

// Function to reset the game
function resetGame() {
  currentPlayer = PLAYER_X;
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Clear the board and message
  document.getElementById('board').innerHTML = '';
  document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;

  // Re-create the cells dynamically
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', handleCellClick);
    document.getElementById('board').appendChild(cell);
  }
}
