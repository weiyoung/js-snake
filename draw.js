const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
// screen size/scale
const scale = 20;
// game speed
const speed = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;
let score = 0;

let snek;

(function setup() {
    snek = new Snake();
    const fod = new Food();

    fod.pickLocation();

    window.setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fod.draw();
        snek.update();
        snek.draw();

        if (snek.eat(fod)) {
            fod.pickLocation();
            score++;
        }

        drawScore(score);

    }, 1000/speed);
}());

function drawScore(score) {
    context.font = "20px Courier";
    context.textAlign = "left";
    context.fillStyle = "Black";
    context.fillText("score: " + score.toString(), scale, canvas.height - scale);
    if (score % 3 === 2) {
        context.font = "69px Comic Sans MS";
        context.textAlign = "center";
        context.fillText("ohhhhh yeahhhhhh", canvas.width/2, canvas.height/2);
    }
}

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snek.changeDirection(direction);
}));
