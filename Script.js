const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  gravity: 1.5,
  lift: -20,
  velocity: 0,
  image: new Image()
};

bird.image.src = "assets/images/bird.png";

let pipes = [];
let score = 0;
let gameRunning = true;

document.addEventListener("keydown", () => {
  bird.velocity = bird.lift;
});

function drawBird() {
  ctx.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    ctx.fillStyle = "#228B22";
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  }
}

function updatePipes() {
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    let top = Math.random() * 200 + 50;
    let bottom = canvas.height - top - 120;
    pipes.push({
      x: canvas.width,
      width: 50,
      top: top,
      bottom: bottom
    });
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 3;

    // Collision detection
    if (
      bird.x + bird.width > pipes[i].x &&
      bird.x < pipes[i].x + pipes[i].width &&
      (bird.y < pipes[i].top || bird.y + bird.height > canvas.height - pipes[i].bottom)
    ) {
      gameRunning = false;
    }

    // Scoring
    if (pipes[i].x + pipes[i].width < bird.x && !pipes[i].scored) {
      score++;
      pipes[i].scored = true;
    }
  }
}

function updateGame() {
  if (!gameRunning) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over! Score: " + score, 50, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameRunning = false;
  }

  updatePipes();
  drawPipes();
  drawBird();

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(updateGame);
}

bird.image.onload = function () {
  updateGame();
};
