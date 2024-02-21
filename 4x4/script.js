let board = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ];
  
  let ai = 'X';
  let human = 'O';
  let currentPlayer = human;
  let winningCombination = null;

  function setup() {
    createCanvas(450, 450);
    w = width / 4;
    h = height / 4;
    const c = color(255, 204, 0);
    let restartButton = createButton('Restart');
    restartButton.mousePressed(restartGame); 
    restartButton.style('background-color', c); 
    restartButton.style('color', 'black'); 
    restartButton.style('padding', '10px 20px'); 
    restartButton.style('font-size', '16px'); 
    restartButton.style('border', 'none'); 
    restartButton.style('cursor', 'pointer'); 
    resultP = createP('');
    resultP.style('font-size', '20pt'); 
    const cl = color(65);
    resultP.style('color', c); 
    resultP.style('font-family', 'Lucida Console, monospace'); 
    let titleP = createP('');
    titleP.style('color', cl);
    titleP.style('font-family', 'Lucida Console, monospace')
    titleP.html('Tic-Tac-Toe 4x4')
    titleP.style('font-size', '25pt');
    titleP.style('text-shadow', '2px 2px 5px rgba(0,0,0,0.5)');
console.log(width, height)
    titleP.position(w*5.5, 0); 
 
    bestMove();
  }
  function restartGame() {
    location.reload();
}
  function equals4(a, b, c, d) {
    return a == b && b == c && c == d && a != '';
  }
  
  function checkWinner() {
    let winner = null;
  
    for (let i = 0; i < 4; i++) {
      if (equals4(board[i][0], board[i][1], board[i][2], board[i][3])) {
        winningCombination = [board[i][0], board[i][1], board[i][2], board[i][3]];
        winner = board[i][0];
      }
    }
  
    for (let i = 0; i < 4; i++) {
      if (equals4(board[0][i], board[1][i], board[2][i], board[3][i])) {
        winner = board[0][i];
        winningCombination = [board[0][i], board[1][i], board[2][i], board[3][i]];
      }
    }
  
    if (equals4(board[0][0], board[1][1], board[2][2], board[3][3])) {
      winner = board[0][0];
      winningCombination = [board[0][0], board[1][1], board[2][2], board[3][3]];
    }
    if (equals4(board[3][0], board[2][1], board[1][2], board[0][3])) {
      winner = board[3][0];
      winningCombination = [board[3][0], board[2][1], board[1][2], board[0][3]];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  function mousePressed() {
    if (currentPlayer == human) {
      // Human make turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        bestMove();
      }
    }
  }
  

function draw() {
    background(255); 
    c = color('hsba(160, 100%, 50%, 0.5)');
    fill(c);
    noStroke(); 
    rect(0, 0, width, height);
    stroke(0); 
    strokeWeight(4);
    for (let i = 0; i <= 4; i++) {
        line(i * w, 0, i * w, height);
    }

    for (let j = 0; j <= 4; j++) {
        line(0, j * h, width, j * h);
    }

    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == human) {
                noFill();
                ellipse(x, y, r * 2);
            } else if (spot == ai) {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }
    
    let result = checkWinner();
    if (result != null) {
      noLoop();
    
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        resultP.html(`${result} wins!`);
      }
      if (winningCombination !== null && result!=='tie') {
        strokeWeight(10);
        stroke(0, 255, 0);
        noFill();
        beginShape();
        for (let [i, j] of winningCombination) {
          let x = w * i + w / 2;
            let y = h * j + h / 2;
          vertex(x, y);
        }
        endShape();
      }
    }
  
    }