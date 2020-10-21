const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const scale = 20;
const speed = 100;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snekky;

(function setup() {
    snekky = new Snek();
    const fod = new Food();

    fod.pickLocation();

    window.setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fod.draw();
        snekky.update();
        snekky.draw();

        if (snekky.eat(fod)) {
            fod.pickLocation();
        }

    }, speed);
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snekky.changeDirection(direction);
}));
