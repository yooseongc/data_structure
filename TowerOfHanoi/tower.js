

function Tower(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.disks = new Stack();

    this.push = function(disk) {
        this.disks.push(disk);
    }

    this.pop = function() {
        return this.disks.pop();
    }

    this.show = function(animating) {
        stroke(255);
        fill(0);
        rect(this.x, this.y, this.w, this.h);

        this.disks.getList().forEach((disk, idx) => {
            if (!disk) return;
            disk.setXY(this.x - disk.w/2, height/2 + this.h - 16 - idx * 16);
            disk.show();
        });
    }
}