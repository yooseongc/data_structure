
function Disk(width) {

    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = 15;
    
    this.xspeed = 0;
    this.yspeed = 0;
    this.moving = 0;
    this.moveFrom;
    this.moveTo;
    this.moveSpeed = 5;

    this.setXY = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.show = function() {
        stroke(255);
        fill(255, 0, 0);
        rect(this.x, this.y, this.w + towerwidth, this.h);
        
    }

}