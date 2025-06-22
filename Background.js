// background.js

const background = new Image();
background.src = "assets/images/background.png";

background.onload = function () {
    ctx.drawImage(background, 0, 0);
};
