// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define constants
const snakeSize = 10;
const canvasSize = 400;
let snake = [{ x: 50, y: 50 }];
let direction = "RIGHT";
let food = { x: 100, y: 100 };
let score = 0;
let gameInterval;

// Start the game
function startGame() {
  gameInterval = setInterval(updateGame, 100);
}

// Update the game state
function updateGame() {
  moveSnake();
  if (isGameOver()) {
    clearInterval(gameInterval);
    alert("Game Over! Final score: " + score);
    return;
  }
  if (eatFood()) {
    score++;
    food = generateFood();
  }
  drawGame();
}

// Move the snake based on the current direction
function moveSnake() {
  let head = { ...snake[0] };
  
  if (direction === "RIGHT") head.x += snakeSize;
  if (direction === "LEFT") head.x -= snakeSize;
  if (direction === "UP") head.y -= snakeSize;
  if (direction === "DOWN") head.y += snakeSize;
  
  snake.unshift(head); // Add new head at the front of the snake
  
  if (!eatFood()) {
    snake.pop(); // Remove the last part of the snake if not eating food
  }
}

// Check if the snake ate the food
function eatFood() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

// Check if the snake collides with itself or walls
function isGameOver() {
  const head = snake[0];
  
  // Check wall collision
  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
    return true;
  }
  
  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  
  return false;
}

// Draw the game (snake and food)
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  
  // Draw snake
  snake.forEach(part => {
    ctx.fillStyle = "green";
    ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
  });
  
  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
  
  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Generate random food coordinates
function generateFood() {
  const foodX = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
  const foodY = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
  return { x: foodX, y: foodY };
}

// Control the snake using arrow keys
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Start the game when the page loads
startGame();