

var disk1;
var disk2;
var disk3;

var towers = [];
var disks = [];

var towerwidth = 10;
var towerheight = 150;
var towerspacing = 150;

var moves = [];
var moveCount = 0;
var isEnd = false;
var animating = null;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('hanoi');
    
    towers[0] = new Tower(width/2-towerspacing, height/2, towerwidth, towerheight);
    towers[1] = new Tower(width/2,              height/2, towerwidth, towerheight);
    towers[2] = new Tower(width/2+towerspacing, height/2, towerwidth, towerheight);

    disks[0] = new Disk(100);    disks[0].setXY(width/2 - towerspacing*0 - disks[0].w/2, height/2 + towerheight - disks[0].h);
    disks[1] = new Disk(87.5);   disks[1].setXY(width/2 - towerspacing*0 - disks[1].w/2, height/2 + towerheight - disks[1].h);
    disks[2] = new Disk(75);     disks[2].setXY(width/2 - towerspacing*0 - disks[2].w/2, height/2 + towerheight - disks[2].h);
    disks[3] = new Disk(62.5);   disks[3].setXY(width/2 - towerspacing*0 - disks[3].w/2, height/2 + towerheight - disks[3].h);
    disks[4] = new Disk(50);     disks[4].setXY(width/2 - towerspacing*0 - disks[4].w/2, height/2 + towerheight - disks[4].h);
    disks[5] = new Disk(37.5);   disks[5].setXY(width/2 - towerspacing*0 - disks[5].w/2, height/2 + towerheight - disks[5].h);
    disks[6] = new Disk(25);     disks[6].setXY(width/2 - towerspacing*0 - disks[6].w/2, height/2 + towerheight - disks[6].h);
    disks[7] = new Disk(12.5);   disks[7].setXY(width/2 - towerspacing*0 - disks[7].w/2, height/2 + towerheight - disks[7].h);
    // disks[8] = new Disk(12.5);   disks[8].setXY(width/2 - towerspacing*0 - disks[8].w/2, height/2 + towerheight - disks[7].h);
    // disks[9] = new Disk(12.5);   disks[9].setXY(width/2 - towerspacing*0 - disks[9].w/2, height/2 + towerheight - disks[7].h);
    // disks[10] = new Disk(12.5);   disks[10].setXY(width/2 - towerspacing*0 - disks[10].w/2, height/2 + towerheight - disks[7].h);

    towers[0].disks.pushAll(disks);

    // play and create moves;
    var p1 = new Date();
    moves = [];
    isEnd = hanoi(disks.length, towers[0], towers[1], towers[2]);
    var p2 = new Date();
    moves = [];
    isEnd = hanoiWithStack(disks.length, towers[0], towers[1], towers[2]);
    var p3 = new Date();
    console.log('RECURSIVE', `ellapsed time : ${ (p2 - p1)} ms`);
    console.log('NON-RECURSIVE', `ellapsed time : ${ (p3 - p2)} ms`);
    frameRate(20);
}

function hanoi(height, fromT, toT, withT) {
    if (height >= 1) {
        hanoi(height-1, fromT, withT, toT);    // fromT --> withT
        moves.push({ from: fromT, to: toT });  // move the biggest disk to toT
        hanoi(height-1, withT, toT, fromT);    // withT --> toT
    } else {
        return true;
    }
}

// I CAN'T UNDERSTAND THIS ALGORITHM...
function hanoiWithStack(height, fromT, toT, withT) {
    var stack = new Stack();
    var done = false;
    while (!done) {
        while (height > 1) {  
            stack.push(toT);
            stack.push(withT);
            stack.push(fromT);
            stack.push(height);
            height--;
            // switch toT and withT
            stack.push(toT);
            toT = withT;
            withT = stack.pop();     
        }
        moves.push({ from: fromT, to: toT });      // move the biggest disk to toT
        if (!stack.isEmpty()) {
            height = stack.pop();
            fromT = stack.pop();
            withT = stack.pop();
            toT = stack.pop();
            moves.push({ from: fromT, to: toT });  // move the biggest disk to toT
            height--;
            // switch fromT and withT
            stack.push(fromT);
            fromT = withT;
            withT = stack.pop();
        } else {
            done = true;
        }
    }

}

function move(towerFrom, towerTo) {
    var moveDisk = towerFrom.pop();
    moveDisk.moving = 1;
    moveDisk.moveFrom = towerFrom;
    moveDisk.moveTo   = towerTo;
    towerTo.push(moveDisk);
    moveCount++;
}


function draw() {
    background(255); // white background
    
     // draw horizontal bar
    fill(0);
    rect(width/2 - towerspacing*2 + 50, height/2+150, 2*(towerspacing*2+10-50), 10);
                              
    // show tower name tag and move count
    fill(0);  
    textSize(13);
    textFont('Verdana');
    text(`move: ${moveCount}, expect: ${Math.pow(2,disks.length)-1}`, towerspacing, height/2-towerheight-30);
    text('A', width/2-towerspacing, height/2+30+towerheight);
    text('B', width/2, height/2+30+towerheight);
    text('C', width/2+towerspacing, height/2+30+towerheight);

    
    towers.forEach(t => t.show(false)); 
}

function replay() {
    stop();
    noLoop();
    moves = [];
    moveCount = 0;
    setup();
    loop();
}

function step() {
    if (this.moves.length-1 >= moveCount) {
        move(moves[moveCount].from, moves[moveCount].to);
    } else {
        stop();
    }
}

function autoplay() {
    replay();
    animating = setInterval(() => { step(); }, 500);
}

function stop() {
    clearInterval(animating);
}