// pipe.js

const pipe = new Image();
pipe.src = "assets/images/pipe.png";

let pipeX = 300;
let pipeY = 0;

pipe.onload = function () {
    ctx.drawImage(pipe, pipeX, pipeY);
};
