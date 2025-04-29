let snake = [];
let xDir = 1;
let yDir = 0;
let food = {};
let scl = 20;
let gameOver = false;
let fps = 10;

function setup() {
  createCanvas(400, 400);
  frameRate(fps);
  snake[0] = { x: floor(width / (2 * scl)) * scl, y: floor(height / (2 * scl)) * scl };
  generateFood();
}

function draw() {
  background(220);
  if (gameOver) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2 - 20);
    textSize(16);
    text('Press R to restart', width / 2, height / 2 + 10);
    return;
  }
  fill(255, 0, 0);
  ellipse(food.x + scl / 2, food.y + scl / 2, scl);
  fill(0, 255, 0);
  rect(
    food.x + scl / 2 - scl / 8,
    food.y + scl / 2 - scl / 2 - scl / 8,
    scl / 4,
    scl / 6
  );
  updateSnake();
  fill(0, 255, 0);
  for (let i = 0; i < snake.length; i++) {
    rect(snake[i].x, snake[i].y, scl, scl);
  }
}

function updateSnake() {
  let head = snake[snake.length - 1];
  let newHead = { x: head.x + xDir * scl, y: head.y + yDir * scl };
  if (newHead.x < 0 || newHead.x >= width || newHead.y < 0 || newHead.y >= height) {
    gameOver = true;
    return;
  }
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
      gameOver = true;
      return;
    }
  }
  snake.push(newHead);
  if (newHead.x === food.x && newHead.y === food.y) {
    generateFood();
  } else {
    snake.shift();
  }
}

function generateFood() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food.x = floor(random(cols)) * scl;
  food.y = floor(random(rows)) * scl;
}

function restart() {
  snake = [{ x: floor(width / (2 * scl)) * scl, y: floor(height / (2 * scl)) * scl }];
  xDir = 1;
  yDir = 0;
  generateFood();
  gameOver = false;
}

function keyPressed() {
  if (keyCode === UP_ARROW && yDir !== 1) {
    xDir = 0;
    yDir = -1;
  } else if (keyCode === DOWN_ARROW && yDir !== -1) {
    xDir = 0;
    yDir = 1;
  } else if (keyCode === LEFT_ARROW && xDir !== 1) {
    xDir = -1;
    yDir = 0;
  } else if (keyCode === RIGHT_ARROW && xDir !== -1) {
    xDir = 1;
    yDir = 0;
  } else if (key === 'r' || key === 'R') {
    restart();
  }
}
