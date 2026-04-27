
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetBtn = document.getElementById("reset");
    const difficultyToggle = document.getElementById("difficultyToggle");
    const difficultyLabel = document.getElementById("difficultyLabel");
    const wonSound = document.getElementById("won");
    const myBar = document.getElementById("myBar");
    const yourBar = document.getElementById("yourBar");
    

    let gameBoard = Array(9).fill("");
    let gameOver = false;
    let currentPlayer = "X"; // User always X
    let playerMatchProgress = 0; // progress bar for user
    let aiMatchProgress = 0; // progress bar for AI
    const progressPerWin = 10; // each win adds 10%
    let isDifficultyHard = true; // default Hard AI (minimax)


    const WIN_COMBINATIONS = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    // Utility function to get random time to simulate AI thinking
    function getRandomThinkingTime() {
  const emptyCells = gameBoard.filter(c => c === "").length;

  // Faster when fewer moves left (like real players)
  return 200 + emptyCells * 80 + Math.random() * 200;
      }

    // Difficulty toggle system
    difficultyToggle.addEventListener("click", () => {
      isDifficultyHard = !isDifficultyHard;
      difficultyToggle.classList.toggle("active", isDifficultyHard);

      difficultyLabel.style.opacity = 0;
      setTimeout(() => {
   difficultyLabel.textContent = isDifficultyHard
      ? "Disable Hard Mode"
     : "Enable Hard Mode";
    difficultyLabel.style.opacity = 1;
      }, 100);
    });

    // Initialize difficulty level as high
    difficultyToggle.classList.add("active");
    difficultyLabel.textContent = "Disable Hard Mode";

    function checkWin(board) {
      for(let combo of WIN_COMBINATIONS) {
        const [a,b,c] = combo;
        if(board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
      }
      return board.includes("") ? null : "draw";
    }

    function minimax(board, isMax) {
      let winner = checkWin(board);
      if(winner === "O") return {score: 1};
      if(winner === "X") return {score: -1};
      if(winner === "draw") return {score: 0};

      const moves = [];
      for(let i = 0; i < board.length; i++) {
        if(board[i] === "") {
          board[i] = isMax ? "O" : "X";
          const result = minimax(board, !isMax);
          moves.push({index: i, score: result.score});
          board[i] = "";
        }
      }

      return isMax
        ? moves.reduce((max, move) => move.score > max.score ? move : max)
        : moves.reduce((min, move) => move.score < min.score ? move : min);
    }

    function aiMove() {
      if(gameOver) return;

      let moveIndex;

      if(isDifficultyHard) { 
        // Minimax AI
        const move = minimax(gameBoard.slice(), true);
        moveIndex = move.index;
      } else {
        // Random AI
        const empty = gameBoard.map((v,i) => v === "" ? i : null).filter(i => i !== null);
        moveIndex = empty[Math.floor(Math.random() * empty.length)];
      }

      if(moveIndex !== undefined) {
        gameBoard[moveIndex] = "O";
        cells[moveIndex].textContent = "O";
        checkGameStatus();
      }
    }

    function checkGameStatus() {
      const winner = checkWin(gameBoard);
      if(winner) {
        gameOver = true;
        if(winner === "draw") {
          statusText.textContent = "It's a Draw 😶";
        } else {
          statusText.textContent = winner === "X" ? "You Win 🎉" : "AI Wins 🤖";
          wonSound.play();
          if(winner === "X") {
            playerMatchProgress += progressPerWin;
            myBar.style.width = playerMatchProgress + "%";
          } else {
            aiMatchProgress += progressPerWin;
            yourBar.style.width = aiMatchProgress + "%";
          }
        }
        // Highlight winning combo
        if(winner !== "draw") {
          for(let combo of WIN_COMBINATIONS) {
            const [a,b,c] = combo;
            if(gameBoard[a] === winner && gameBoard[b] === winner && gameBoard[c] === winner) {
              [a,b,c].forEach(i => cells[i].style.backgroundColor = winner === "X" ? "blue" : "red");
            }
          }
        }
        // Disable gameBoard if match won
        if(playerMatchProgress >= 100 || aiMatchProgress >= 100) {
          statusText.textContent = playerMatchProgress >= 100 ? "You won the Match! 🏆" : "AI won the Match! 🏆";
          cells.forEach(cell => cell.style.pointerEvents = "none");
          resetBtn.textContent = "Reset Match";
          resetBtn.style.backgroundColor = "red";
        }
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = currentPlayer === "X" ? "Your turn (X)" : "AI thinking...";
        if(currentPlayer === "O") {
          setTimeout(() => {
            aiMove();
            currentPlayer = "X";
            if(!gameOver) statusText.textContent = "Your turn (X)";
          }, getRandomThinkingTime());
        }
      }
    }

    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        if(gameOver || currentPlayer !== "X") return;
        const index = +cell.dataset.index;
        if(gameBoard[index] === "") {
          gameBoard[index] = "X";
          cell.textContent = "X";
          checkGameStatus();
         }
       });
      });

    resetBtn.addEventListener("click", () => {
      // Reset round
      if(playerMatchProgress >= 100 || aiMatchProgress >= 100) {
        // Reset entire match
        playerMatchProgress = 0;
        aiMatchProgress = 0;
        myBar.style.width = "0%";
        yourBar.style.width = "0%";
        resetBtn.textContent = "Reset Round";
        resetBtn.style.backgroundColor = "#444";
        cells.forEach(cell => cell.style.pointerEvents = "auto");
      }

      gameBoard = Array(9).fill("");
      gameOver = false;
      currentPlayer = "X";
      statusText.textContent = "Your turn (X)";
      cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#333";
        cell.style.pointerEvents = "auto";
      });
    });
  