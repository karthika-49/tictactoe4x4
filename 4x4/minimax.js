function minimax(board, depth, alpha, beta, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      if (result === ai) {
        return 10 - depth; 
      } else if (result === human) {
        return depth - 10; 
      } else {
        return 0; // Tie
      }
    }
  
    if (depth >= 4) {
      return evaluate(board); 
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, alpha, beta, false);
            board[i][j] = '';
            bestScore = max(score, bestScore);
            alpha = max(alpha, bestScore);
            if (beta <= alpha) {
              break; 
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (board[i][j] == '') {
            board[i][j] = human;
            let score = minimax(board, depth + 1, alpha, beta, true);
            board[i][j] = '';
            bestScore = min(score, bestScore);
            beta = min(beta, bestScore);
            if (beta <= alpha) {
              break; 
            }
          }
        }
      }
      return bestScore;
    }
  }
  
  function evaluate(board) {
    let score = 0;
  
    for (let i = 0; i < 4; i++) {
      score += evaluateLine(board[i][0], board[i][1], board[i][2], board[i][3]); 
      score += evaluateLine(board[0][i], board[1][i], board[2][i], board[3][i]); 
    }
    score += evaluateLine(board[0][0], board[1][1], board[2][2], board[3][3]); 
    score += evaluateLine(board[3][0], board[2][1], board[1][2], board[0][3]); 
  
    return score;
  }
  

  function evaluateLine(cell1, cell2, cell3, cell4) {
    let score = 0;
  

    if (cell1 == ai) {
      score = 1;
    } else if (cell1 == human) {
      score = -1;
    }
  
    if (cell2 == ai) {
      if (score == 1) {
        score = 10;
      } else if (score == -1) {
        return 0; // Opponent has already blocked, no chance of winning
      } else {
        score = 1;
      }
    } else if (cell2 == human) {
      if (score == -1) {
        score = -10;
      } else if (score == 1) {
        return 0; // Opponent has already blocked, no chance of winning
      } else {
        score = -1;
      }
    }
  
    if (cell3 == ai) {
      if (score > 0) {
        score *= 10;
      } else if (score < 0) {
        return 0; // Opponent has already blocked, no chance of winning
      } else {
        score = 1;
      }
    } else if (cell3 == human) {
      if (score < 0) {
        score *= 10;
      } else if (score > 1) {
        return 0; // Opponent has already blocked, no chance of winning
      } else {
        score = -1;
      }
    }
  
    if (cell4 == ai) {
      if (score > 0) {
        score *= 10;
      } else if (score < 0) {
        return 0; // Opponent has already blocked, no chance of winning
      } else {
        score = 1;
      }
    } else if (cell4 == human) {
      if (score < 0) {
        score *= 10;
      } else if (score > 1) {
        return 0; // Opponent has already blocked, no chance of winning
      } else {
        score = -1;
      }
    }
  
    return score;
  }
  
  function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
   
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, 0, -Infinity, Infinity, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    board[move.i][move.j] = ai;
    currentPlayer = human;
  }