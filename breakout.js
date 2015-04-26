(function() {
  var canvas = document.getElementById('myCanvas'),
      context = canvas.getContext('2d'),
      bricks = [],
      paddleWidth = 100,
      paddleHeight = 12,
      paddleX,
      bricksNumX = 7,
      bricksNumY = 5,
      bricksWidth = canvas.width / bricksNumX,
      bricksHeight = 20,
      bricksMargin = 4,
      ballVx = 8,
      ballVy = 12,
      ballX,
      ballY,
      ballDirx,
      balDiry,
      restart = true;

  function init() {
    restart = false;
    paddleX = canvas.width / 2;
    ballX = 40;
    ballY = 100;
    ballDirx = 1; //Direction 1 or -1
    ballDiry = 1; //Direction 1 or -1

    for (var y = 0; y < 5; y++) {
      bricks[y] = [];
      for (var x = 0; x < 7; x++) {
        bricks[y][x] = true;
      }
    }
  }

  function clear(x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
  }

  function drawPaddle() {
    var x = paddleX - paddleWidth / 2,
        y = canvas.height - paddleHeight;
    context.fillRect(x, y, paddleWidth, paddleHeight);
  }

  function drawBricks() {
    var width = bricksWidth - bricksMargin,
        height = bricksHeight - bricksMargin;

    for (var by = 0; by < bricksNumY; by++) {
      for (var bx = 0; bx < bricksNumX; bx++) {
        if (bricks[by][bx]) {
          var x = bx * bricksWidth + bricksMargin / 2,
              y = by * bricksHeight + bricksMargin / 2;
          context.fillRect(x, y, width, height);
        }
      }
    }
  }

  function hitHorizontal() {
    if (ballX < 0 || ballX >= canvas.width) {
      ballDirx = - ballDirx;
    }
  }

  function hitVertical() {
    if (ballY < 0) {
      ballDiry = - ballDiry;
    } else if (ballY < bricksHeight * bricksNumY) {
      var bx = Math.floor(ballX / bricksWidth),
          by = Math.floor(ballY / bricksHeight);

      if (bx >= 0 && bx < bricksNumX) {
        if (bricks[by][bx]) {
          bricks[by][bx] = false;
          ballDiry = -ballDiry;
        }
      }
    } else if (ballY >= canvas.height - paddleHeight) {
      var paddleLeft = paddleX - paddleWidth / 2,
          paddleRight = paddleX + paddleWidth / 2;

      if (ballX >= paddleLeft && ballX <= paddleRight) {
        ballDiry = -ballDiry;
      } else {
        restart = true;
        return false;
      }
    }
    return true;
  }

  function tick() {
    if (restart) {
      init();
      return;
    }

    clear();
    drawPaddle();

    ballX += ballVx * ballDirx;
    ballY += ballVy * ballDiry;

    hitHorizontal();
    if (hitVertical()) {
      drawCircle(ballX, ballY);
      drawBricks();
    } else {
      clear();
    }
  }

  canvas.addEventListener('mousemove', function(e) {
    paddleX = e.layerX;
  }, false);

  setInterval(tick, 30);

})();
