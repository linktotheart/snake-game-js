// 
const buttonReset = document.getElementById("restart")
const game = document.getElementById("gameSnake")
const ctx = game.getContext("2d")
const scoreId = document.getElementById("score")
const gmWidth = game.width;
const gmHeight = game.height;

// game variables 
const pixelSize = 24;
// gameBoy Palette
const colors = {
	light1: "#6eb122",
	light2: "#548719",
	dark1: "#335310",
	dark2: "#131f06",
}
let isGameRunning = false;
let xVelocity = pixelSize;
let yVelocity = 0;
let score = 0;
let foodX;
let foodY;
let GameSpeed = 100;
let snake = [	
	{x: pixelSize * 4, y: 0},
	{x: pixelSize * 3, y: 0},
	{x: pixelSize * 2, y: 0},
	{x: pixelSize * 1, y: 0},
	{x:0, y: 0}

]

// function gameStart() {};
const gameStart = () => {
	isGameRunning = true;
	scoreId.textContent = score;
	instanceFood();
	drawFood();
	nextTick();
};
const nextTick = () => {
	if(isGameRunning) {
		setTimeout(() => {
			clearCanvas();
			drawFood();
			moveSnake();
			drawSnake();
			isGameOver();
			nextTick()
		}, 100);
	} else {
		showGameOver()
	}
};
const clearCanvas = () => {
	ctx.fillStyle = colors.light1;
	ctx.fillRect(0,0,gmWidth,gmHeight)
};
const instanceFood = () => {
	const randomFood = (min,max) => {
		const random = Math.round(
			(Math.random() * (max - min) + min) / pixelSize
		) * pixelSize
		return random
	}
	foodX = randomFood(0, gmWidth - pixelSize)
	foodY = randomFood(0, gmHeight - pixelSize)
};

const drawFood = () => {
	ctx.fillStyle = colors.dark1;
	ctx.strokeStyle = colors.dark2;
	ctx.fillRect(foodX, foodY, pixelSize, pixelSize)
	ctx.strokeRect(foodX, foodY, pixelSize, pixelSize)
};
const moveSnake = () => {
	const head = {x: snake[0].x + xVelocity,
					y: snake[0].y + yVelocity}
		snake.unshift(head)
		// if you find an apple
		const mouth = snake[0]
		if (mouth.x === foodX && mouth.y === foodY) {
			score++;
			GameSpeed = GameSpeed + 10;
			scoreId.textContent = score;
			instanceFood()
		} else {
			snake.pop()
		}
};
const drawSnake = () => {
	ctx.fillStyle = colors.light2;
	ctx.strokeStyle = colors.dark1;
	snake.forEach((snk) => {
		ctx.fillRect(snk.x,snk.y,pixelSize,pixelSize)
		ctx.strokeRect(snk.x,snk.y,pixelSize,pixelSize)
	})
};
const handleChange = (eve) => {
	const keyPressed = eve.keyCode;
	const keyMap = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	}

	const isGoingUp = (yVelocity == -pixelSize)
	const isGoingDown = (yVelocity == pixelSize)
	const isGoingLeft = (xVelocity == -pixelSize)
	const isGoingRight = (xVelocity == pixelSize)

	switch(true) {
		case(keyPressed == keyMap.LEFT && !isGoingRight):
			xVelocity = -pixelSize;
			yVelocity = 0;
			break;
		case(keyPressed == keyMap.RIGHT && !isGoingLeft):
			xVelocity = pixelSize;
			yVelocity = 0;
			break;
		case(keyPressed == keyMap.UP && !isGoingDown):
			xVelocity = 0;
			yVelocity = -pixelSize;
			break;
		case(keyPressed == keyMap.DOWN && !isGoingUp):
			xVelocity = 0;
			yVelocity = pixelSize;
			break;
	}
};
const isGameOver = () => {
	const head = snake[0];
	switch(true) {
		case (head.x < 0):
			isGameRunning = false;
			break;
		case (head.x >= gmWidth):
			isGameRunning = false;
			break;
		case (head.y < 0):
			isGameRunning = false;
			break;
		case (head.y >= gmHeight):
			isGameRunning = false;
			break;
	}

	for(let i = 1; i < snake.length; i+=1) {
		if (head.x == snake[i].x && head.y == snake[i].y) {
			isGameRunning = false;
		}
	}
};
const showGameOver = () => {
	ctx.font = "68px Impact"
	ctx.fillStyle = colors.dark1
	ctx.textAlign = "center"
	ctx.fillText("GAME OVER", gmWidth / 2, gmHeight / 2)
	ctx.fillStyle = colors.dark2
	ctx.StrokeWidth = "8px"
	ctx.strokeText("GAME OVER", gmWidth / 2, gmHeight / 2)
};
const resetGame = () => {
	score = 0;
	scoreId.textContent = score;
	xVelocity = pixelSize;
	yVelocity = 0;
	snake = [
		{x: pixelSize, y: 0},
		{x: 0, y: 0}
	]
	isGameRunning = true;
	clearCanvas()
	nextTick()
};


window.addEventListener("keydown", handleChange);
buttonReset.addEventListener("click", resetGame)


gameStart();