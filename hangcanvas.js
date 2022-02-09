const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const container = document.querySelector(".container");



const showCanvas = () => {
 
  canvas.style.display = "block";
};

const hideContainer = () => {
 
  container.style.display = "none";
};

const fillCanvas = () => {

  ctx.fillStyle = "#282525";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const startGame = () => {
  
  hideContainer();
  showCanvas();
  fillCanvas();
};

const drawRect = (x, y, width, height, color) => {
  
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawLine = (x1, y1, x2, y2) => {
  
  ctx.beginPath();
  ctx.strokeStyle = "#ffffff";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = 10;
  ctx.stroke();
};

const drawFailsLetters = (word) => {
  ctx.clearRect(0, canvasHeight - 265, canvasWidth, canvasHeight);
  drawRect(0, canvasHeight - 265, canvasWidth, canvasHeight, "#282525");
  // draw the letters that the user has already used
  ctx.fillStyle = "gray";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(word, canvasWidth / 2, canvasHeight - 190);
};


const drawFloor = () =>  drawRect((canvasWidth - 400) / 2, 400, 400, 10, "#ff0000");

const drawTrunk = () => drawRect((canvasWidth - 400) / 2, 400, 10, -370, "#ff80ff");

const drawRoof = () => drawRect((canvasWidth - 400) / 2, 30, 250, -10, "#088a29");

const drawRope = () => drawRect(canvasWidth / 2 - 5, 30, 10, 55, "#0431b4");



const drawBody = () => drawRect(canvasWidth / 2 - 5, 164, 10, 150, "#ff80ff");

const drawHead = () => {
  
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, 125, 40, 0, Math.PI * 2, false);
  ctx.fillStyle = "lightgray";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "blue";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(canvasWidth / 2 - 10, 110, 5, 0, Math.PI * 2, false);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(canvasWidth / 2 + 10, 110, 5, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, 120, 10, 0, Math.PI, false);
  ctx.fillStyle = "yellow";
  ctx.fill();
};


const drawFirstLeg = () => drawLine(canvasWidth / 2, 310, 550, 380);

const drawSecondLeg = () => drawLine(canvasWidth / 2, 310, 650, 380);

const drawFirstArm = () => drawLine(canvasWidth / 2, 164, 550, 240);

const drawSecondArm = () => drawLine(canvasWidth / 2, 164, 650, 240);

const drawHeart = (fromx, fromy, tox, toy,lw,hlen,color) =>{
  var x = fromx;
  var y = fromy;
  var width = lw ;
  var height = hlen;
  x = canvasWidth - 400;
  y = canvasHeight - canvasHeight+30;
  tox = 100;
  toy = 100;
  width = 100;
  height = 50;
  color = "#282525";
  ctx.save();
  ctx.beginPath();
  var topCurveHeight = height * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(
    x, y, 
    x - width / 2, y, 
    x - width / 2, y + topCurveHeight
  );

 
  ctx.bezierCurveTo(
    x - width / 2, y + (height + topCurveHeight) / 2, 
    x, y + (height + topCurveHeight) / 2, 
    x, y + height
  );

 
  ctx.bezierCurveTo(
    x, y + (height + topCurveHeight) / 2, 
    x + width / 2, y + (height + topCurveHeight) / 2, 
    x + width / 2, y + topCurveHeight
  );

  
  ctx.bezierCurveTo(
    x + width / 2, y, 
    x, y, 
    x, y + topCurveHeight
  );

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();

}

const drawLives = (lives) => {
  ctx.clearRect(900, 0, 300, 85);
  drawRect(900, 0, 300, 85, "#282525");
  // draw the lives
  ctx.fillStyle = "#f30a0a";
  ctx.font = `50px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(lives, canvasWidth - fontSize-200, canvasHeight - canvasHeight + 30 + fontSize - 25);
};

const RevealWord = (word) => {
  ctx.clearRect(0, 0, 500, fontSize);
  drawRect(0, 0, 500, fontSize, "#282525");
  ctx.fillStyle = "gray";
  ctx.font = `bold ${fontSize/2}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(word, 200, fontSize);
};

const RevealWordButton = () => {
  ctx.fillStyle = "grey";
  ctx.font = `bold ${fontSize/2}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(`descubrir la palabra!`, 200, fontSize);
};

const drawFail = (flag, letter) => {
  if(failLetters.includes(letter)) {
    you_repeated_letter_message.style.display = "inherit";
    you_repeated_letter_message.classList.add("you_repeated_letter_message_show");
    setTimeout(() => {
      you_repeated_letter_message.style.display = "none";
    }
    , 800);
  }
 
  if (!flag && failLetters.includes(letter) === false) {
    lives--;
    drawLives(lives);
    failsCounter++;
    failsCounter===1 ? drawTrunk() : null;
    failsCounter===2 ? drawRoof() : null;
    failsCounter===3 ? drawRope() : null;
    failsCounter===4 ? drawHead() : null;
    failsCounter===5 ? drawFirstArm() : null;
    failsCounter===6 ? drawSecondArm() : null;
    failsCounter===7 ? drawBody() : null;
    failsCounter===8 ? drawFirstLeg() : null;
    failsCounter===9 ? drawSecondLeg() : null;
    failLetters += letter;
    drawFailsLetters(failLetters.split("").filter((item, index, self) => self.indexOf(item) === index).join(""));
  }
};

const drawWinMessage = () => {
 
  ctx.fillStyle = "#1ca728";
  
  if (window.innerWidth < 600) {
    ctx.font = `bold ${fontSize + 60}px Amatic SC, cursive`;
  } else {
  ctx.font = `bold ${fontSize}px Amatic SC, cursive`;
  }
  ctx.textAlign = "center";
  ctx.fillText("lo lograste!", 600, canvasHeight / 4);
  if (gameStarted) {
    createRestartButton();
  }
};

const drawLostMessage = () => {
  
  ctx.fillStyle = "#ff0000";
  
  if (window.innerWidth < 600) {
    ctx.font = `bold ${fontSize + 60}px Amatic SC, cursive`;
  } else {
  ctx.font = `bold ${fontSize}px Amatic SC, cursive`;
  }
  ctx.textAlign = "center";
  ctx.fillText("game over!", 600, canvasHeight / 4);
  ctx.fillStyle = "#fff000";
  ctx.font = `45px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(`esta era la palabra: ${word}`, 600, canvasHeight / 4 + 100);
  if (gameStarted) {
    createRestartButton();
  }
};



