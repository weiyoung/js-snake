function Snake() {
    this.speed = 1;
    this.x = 0;
    this.y = 0;
    // initial speed
    this.xSpeed = scale * this.speed;
    this.ySpeed = 0;
    // snake length
    this.snakelength = 5;
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
        // figure out snake's length
        for (let i=0; i<this.tail.length-1; i++) {
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.snakelength - 1] = {x: this.x, y: this.y};

        // move snake
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        // prevent snake from going out of bounds
        if (this.x > canvas.width - 1) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
        if (this.y > canvas.height - 1) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = canvas.height;
        }
    }

    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed !== 0) break;
                this.xSpeed = 0;
                this.ySpeed = - (scale * this.speed);
                break;
            case 'Down':
                if (this.ySpeed !== 0) break;
                this.xSpeed = 0;
                this.ySpeed = (scale * this.speed);
                break;
            case 'Left':
                if (this.xSpeed !== 0) break;
                this.xSpeed = - (scale * this.speed);
                this.ySpeed = 0;
                break;
            case 'Right':
                if (this.xSpeed !== 0) break;
                this.xSpeed = (scale * this.speed);
                this.ySpeed = 0;
                break;
        }
    }

    this.eat = function(food) {
        if (this.x === food.x && this.y === food.y) {
            this.snakelength++;
            return true;
        } else {
            return false;
        }
    }

    this.eatSelf = function() {
        let boolean = false;
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                // TODO new version will simply splice off the tail and continue the game
                // this.tail.splice(i);
                boolean = true;
            }
        }
        return boolean;
    }
}