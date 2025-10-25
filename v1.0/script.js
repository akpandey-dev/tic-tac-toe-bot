    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetBtn = document.getElementById("reset");
    const difficultyToggle = document.getElementById("difficultyToggle");
    const wonSound = document.getElementById("won");
    const myBar = document.getElementById("myBar");
    const yourBar = document.getElementById("yourBar");

    let board = Array(9).fill("");
    let gameOver = false;
    let currentPlayer = "X"; // User always X
    let Xwidth = 0; // progress bar for user
    let Ywidth = 0; // progress bar for AI
    const progressPerWin = 10; // each win adds 10%
    let difficultyHard = true; // default Hard AI (minimax)

    const winCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    // Toggle difficulty on click
    difficultyToggle.addEventListener("click", () => {
      difficultyHard = !difficultyHard;
      difficultyToggle.classList.toggle("active", difficultyHard);
    });

    // Initialize difficulty toggle UI (default Hard)
    difficultyToggle.classList.add("active");

    function checkWin(bd) {
      for(let combo of winCombos) {
        const [a,b,c] = combo;
        if(bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) return bd[a];
      }
      return bd.includes("") ? null : "draw";
    }

    function minimax(bd, isMax) {
      let winner = checkWin(bd);
      if(winner === "O") return {score: 1};
      if(winner === "X") return {score: -1};
      if(winner === "draw") return {score: 0};

      const moves = [];
      for(let i = 0; i < bd.length; i++) {
        if(bd[i] === "") {
          bd[i] = isMax ? "O" : "X";
          const result = minimax(bd, !isMax);
          moves.push({index: i, score: result.score});
          bd[i] = "";
        }
      }

      return isMax
        ? moves.reduce((max, move) => move.score > max.score ? move : max)
        : moves.reduce((min, move) => move.score < min.score ? move : min);
    }

    function aiMove() {
      if(gameOver) return;

      let moveIndex;

      if(difficultyHard) {
        // Minimax AI
        const move = minimax(board.slice(), true);
        moveIndex = move.index;
      } else {
        // Random AI
        const empty = board.map((v,i) => v === "" ? i : null).filter(i => i !== null);
        moveIndex = empty[Math.floor(Math.random() * empty.length)];
      }

      if(moveIndex !== undefined) {
        board[moveIndex] = "O";
        cells[moveIndex].textContent = "O";
        checkGameStatus();
      }
    }

    function checkGameStatus() {
      const winner = checkWin(board);
      if(winner) {
        gameOver = true;
        if(winner === "draw") {
          statusText.textContent = "It's a Draw 😶";
        } else {
          statusText.textContent = winner === "X" ? "You Win 🎉" : "AI Wins 🤖";
          wonSound.play();
          if(winner === "X") {
            Xwidth += progressPerWin;
            myBar.style.width = Xwidth + "%";
          } else {
            Ywidth += progressPerWin;
            yourBar.style.width = Ywidth + "%";
          }
        }
        // Highlight winning combo
        if(winner !== "draw") {
          for(let combo of winCombos) {
            const [a,b,c] = combo;
            if(board[a] === winner && board[b] === winner && board[c] === winner) {
              [a,b,c].forEach(i => cells[i].style.backgroundColor = winner === "X" ? "blue" : "red");
            }
          }
        }
        // Disable board if match won
        if(Xwidth >= 100 || Ywidth >= 100) {
          statusText.textContent = Xwidth >= 100 ? "You won the Match! 🏆" : "AI won the Match! 🏆";
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
          }, 300);
        }
      }
    }

    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        if(gameOver || currentPlayer !== "X") return;
        const index = +cell.dataset.index;
        if(board[index] === "") {
          board[index] = "X";
          cell.textContent = "X";
          checkGameStatus();
        }
      });
    });

    resetBtn.addEventListener("click", () => {
      // Reset round
      if(Xwidth >= 100 || Ywidth >= 100) {
        // Reset entire match
        Xwidth = 0;
        Ywidth = 0;
        myBar.style.width = "0%";
        yourBar.style.width = "0%";
        resetBtn.textContent = "Reset Round";
        resetBtn.style.backgroundColor = "#444";
        cells.forEach(cell => cell.style.pointerEvents = "auto");
      }

      board = Array(9).fill("");
      gameOver = false;
      currentPlayer = "X";
      statusText.textContent = "Your turn (X)";
      cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "#333";
        cell.style.pointerEvents = "auto";
      });
    });
