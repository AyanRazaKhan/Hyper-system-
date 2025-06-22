// bird.js

const bird = new Image();
bird.src = "assets/images/bird.png";

let birdX = 50;
let birdY = 150;

bird.onload = function () {
    ctx.drawImage(bird, birdX, birdY);
};
