function Snek() {
    this.speed = 1;
    this.x = 0;
    this.y = 0;
    // initial speed
    this.xSpeed = scale * this.speed;
    this.ySpeed = 0;
    // snek length
    this.sneklength = 5;
    this.tail = [];

    this.draw = function() {
        // draw body
        context.fillStyle = "#FFFFFF";
        for (let i=1; i<this.tail.length; i++) {
            context.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        // draw head with different color
        context.fillStyle = "#00CC00";
        context.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function() {
        // figure out snek's length
        for (let i=0; i<this.tail.length-1; i++) {
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.sneklength - 1] = {x: this.x, y: this.y};

        // move snek
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        // prevent snek from going out of bounds
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
        if (this.y > canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = canvas.height;
        }
    }

    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = - (scale * this.speed);
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = (scale * this.speed);
                break;
            case 'Left':
                this.xSpeed = - (scale * this.speed);
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = (scale * this.speed);
                this.ySpeed = 0;
                break;
        }
    }

    this.eat = function(food) {
        if (this.x === food.x && this.y === food.y) {
            this.sneklength++;
            return true;
        } else {
            return false;
        }
    }
}