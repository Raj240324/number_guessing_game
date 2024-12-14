let playerName = "";
let computerNumber = "";
let moves = 0;
let timeElapsed = 0;
let timerInterval;
let bestScore = { name: "", score: Infinity };

// Load best score from local storage
function loadBestScore() {
  const storedScore = localStorage.getItem("bestScore");
  if (storedScore) {
    bestScore = JSON.parse(storedScore);
    displayBestScore();
  }
}

// Save best score to local storage
function saveBestScore() {
  localStorage.setItem("bestScore", JSON.stringify(bestScore));
}

function generateUniqueNumber() {
  const digits = [];
  while (digits.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join("");
}

function startGame() {
  playerName = document.getElementById("player-name").value.trim();
  if (!playerName) {
    alert("Please enter your name to start the game.");
    return;
  }

  computerNumber = generateUniqueNumber();
  moves = 0;
  timeElapsed = 0;
  document.getElementById("moves").innerText = moves;
  document.getElementById("time").innerText = timeElapsed;
  document.getElementById("feedback").innerText = "";

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  timerInterval = setInterval(() => {
    timeElapsed++;
    document.getElementById("time").innerText = timeElapsed;
  }, 1000);
}

function makeGuess() {
  const guess = document.getElementById("guess").value;
  if (guess.length !== 4 || isNaN(guess)) {
    alert("Please enter a valid 4-digit number.");
    return;
  }

  moves++;
  document.getElementById("moves").innerText = moves;

  let feedback = "";
  for (let i = 0; i < 4; i++) {
    if (guess[i] === computerNumber[i]) {
      feedback += "+";
    } else if (computerNumber.includes(guess[i])) {
      feedback += "-";
    }
  }
  document.getElementById("feedback").innerText = feedback;

  if (guess === computerNumber) {
    clearInterval(timerInterval);
    const score = moves + timeElapsed;
    if (score < bestScore.score) {
      bestScore = { name: playerName, score };
      saveBestScore();
      alert(`Congratulations ${playerName}, you set a new best score!`);
    }
    displayBestScore();
    resetGame();
  }
}

function displayBestScore() {
  if (bestScore.name) {
    document.getElementById("best-score").innerText = 
      `Best Score: ${bestScore.name} with a score of ${bestScore.score}`;
  }
}

function resetGame() {
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("game-screen").style.display = "none";
  clearInterval(timerInterval);
}

// Initialize the game by loading the best score
loadBestScore();
