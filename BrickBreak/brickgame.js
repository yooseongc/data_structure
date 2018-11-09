

function BrickBreakGame(canvas) {
    
    this.lives = 0;
    this.score = 0;

    this.canvas    = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.width     = this.canvas.clientWidth;
    this.height    = this.canvas.clientHeight;

    this.getWidth  = function() { return this.width; }
    this.getHeight = function() { return this.height; }

    this.start = function() {
        this.lives = 3;
        this.score = 0;
    }

    this.end = function() {

    }
}