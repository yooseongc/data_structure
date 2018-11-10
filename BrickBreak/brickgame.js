

function Ball(radius) {
    this.r = radius;
    this.x = 0;
    this.y = 0;
    this.u = 0;
    this.v = 0;
    
    this.setXY = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.setUV = function(u, v) {
        this.u = u;
        this.v = v;
    }

    this.reverseU = function() { this.u *= -1; }
    this.reverseV = function() { this.v *= -1; }

    this.update = function() {
        this.x += this.u;
        this.y += this.v;
    }

    this.render = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
        this.update();
    }

}

function Brick(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width  = w;
    this.height = h;
    this.status = 1;

    this.break = function() { this.status = 0; }
    this.isBroken = function() { return this.status === 0; }
    this.detectCollision = function(ball) {
        // collision with ball
        if (this.isBroken()) return false;
        if (ball.x >= this.x && ball.x <= this.x+ this.width 
              && ball.y >= this.y && ball.y <= this.y + this.height) {
            ball.reverseV();
            this.break();
            return true;
        } 
        return false;
    }

    this.render = function(ctx) {
        if (this.isBroken()) return;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function Paddle() {
    this.width = 150;
    this.height = 30;
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    this.setXY = function(x, y) {
        this.x = x;
        this.y = y;
    }
    this.update = function(dir) {
        this.x += this.speed * dir;
    }
    this.render = function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, ctx.canvas.height - this.height, 
            this.width, this.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }
    
}

function BrickBreakGame(canvas) {
    
    this.lives = 0;
    this.score = 0;
    this.win   = false;

    this.ball = null;
    this.paddle = null;
    this.bricks = [];

    this.canvas    = canvas;
    this.ctx       = canvas.getContext('2d');
    this.width     = this.canvas.width  = this.canvas.clientWidth;
    this.height    = this.canvas.height = this.canvas.clientHeight;
    this.animationFrame = null;
    this.rightPressed = false;
    this.leftPressed  = false;

    this.getWidth  = function() { return this.width; }
    this.getHeight = function() { return this.height; }

    this.start = function() {
        this.lives = 3;
        this.score = 0;
        this.win = false;
        this.init();
        this.initBrick(3, 5);
        this.animationFrame = window.requestAnimationFrame(() => this.render());
    }

    this.init = function() {
        // init ball
        this.ball = new Ball(15);
        this.ball.setXY(this.width/2, this.height-60);
        var sign = Math.random() >= 0.5 ? 1 : -1;
        this.ball.setUV(sign * 4, -4);

        // init paddle
        this.paddle = new Paddle();
        this.paddle.setXY( (this.width - this.paddle.width) / 2, 0);
        this.paddle.speed = 14;

        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    this.initBrick = function(r, c) {
        var brickW = 120;
        var brickH = 30;
        var padding = 10;
        var offsetTop = 50;
        var offsetLeft = 40;
        for (var i = 0; i < c; i++) {
            for (var j = 0; j < r; j++) {
                this.bricks[i*r+j] 
                    = new Brick(
                        i*(brickW+padding)+offsetLeft, 
                        j*(brickH+padding)+offsetTop,
                        brickW,
                        brickH
                      );
            }
        }

    }

    this.end = function() {
        if (this.animationFrame)
            window.cancelAnimationFrame(this.animationFrame);
    }

    this.onKeyPressed = function(e) {
        if      (e.keyCode == 39) this.rightPressed = true;
        else if (e.keyCode == 37) this.leftPressed = true;
        // if (e.keyCode === 39 && 
        //         this.paddle.x < this.width - this.paddle.width) 
        //                 this.paddle.update(1);
        // if (e.keyCode === 37 && this.paddle.x > 0)  this.paddle.update(-1);
    }

    this.onKeyReleased = function(e) {
        if      (e.keyCode == 39) this.rightPressed = false;
        else if (e.keyCode == 37) this.leftPressed = false;
    }

    this.drawInfo = function() {
        this.ctx.font = '15px monospace';
        this.ctx.fillStyle = '#0095DD';
        this.ctx.fillText(`lives : ${this.lives}`, 10, 20);
        this.ctx.fillText(`score : ${this.score}`, 10, 40);
    }

    this.render = function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ball.render(this.ctx);
        this.paddle.render(this.ctx);

        this.bricks.forEach(b => {
            if(b.detectCollision(this.ball)) this.score += 100;
            b.render(this.ctx);
            
        });

        // ball interactions
        if (this.ball.x >= this.width - this.ball.r || this.ball.x <= this.ball.r) {
            this.ball.reverseU();
        }
        if (this.ball.y <= this.ball.r) {
            this.ball.reverseV();
        } else if (this.ball.y >= this.height - this.ball.r - this.paddle.height) {
            if (this.ball.x >= this.paddle.x && this.ball.x <= this.paddle.x + this.paddle.width) { 
                this.ball.y = this.height - this.ball.r - this.paddle.height;
                this.ball.reverseV();
            } else if (this.ball.y  >= this.height - this.ball.r) {
                if(--this.lives > 0) this.init();
            }
        } 

        // paddle 
        if (this.rightPressed && this.paddle.x < this.width - this.paddle.width) this.paddle.update(1);
        if (this.leftPressed && this.paddle.x > 0)  this.paddle.update(-1);

        this.drawInfo();
        if (this.lives <= 0) {  // when lose game
            this.win = false;
            this.ctx.font = '20px Arial';
            this.ctx.fillStyle = '#0095DD';
            this.ctx.fillText("Game Over", this.width/2 - 50, 30);
            window.dispatchEvent(new Event('gameend'));
            return;
        }
        if (this.score >= 1500) {
            this.win = true;
            this.ctx.font = '20px Arial';
            this.ctx.fillStyle = '#0095DD';
            this.ctx.fillText("You Win", this.width/2 - 50, 30);
            window.dispatchEvent(new Event('gameend'));
            return;
        }

        this.animationFrame = window.requestAnimationFrame(() => this.render());
    }
}