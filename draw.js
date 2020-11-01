const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
// CHANGE GAME SCALE! any number from 10 to 50
const scale = 25;
// CHANG GAME SPEED! any number from 1 to 10
const speed = 5;

const rows = canvas.height / scale;
const columns = canvas.width / scale;
let score = 0;

let snek;

(function setup() {
    snek = new Snake();
    const fod = new Food();

    fod.pickLocation();
    window.alert("press ENTER or click OK to play \nuse arrow keys to control snake");
    playGame(snek, fod);

}());

function playGame(snek, fod) {
    window.setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fod.draw();
        snek.update();
        snek.draw();

        if (snek.eat(fod)) {
            fod.pickLocation();
            score++;
        }

        if (snek.eatSelf()) {
            location.reload();
            window.alert("GAME OVER \nscore: " + score);
            score = 0;
        }

        drawScore(score);

    }, 250/speed);
}

function drawScore(score) {
    context.fillStyle = "White";
    context.font = "20px Courier";
    context.textAlign = "left";
    context.fillText("score: " + score.toString(), scale, canvas.height - scale);
    if (score % 3 === 2) {
        context.font = "69px Comic Sans MS";
        context.textAlign = "center";
        context.fillText("YE BOI", canvas.width/2, canvas.height/2);
    }
}

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snek.changeDirection(direction);
}));
