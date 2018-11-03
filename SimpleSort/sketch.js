


var values;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sorting');
    background(0);
    noStroke();
    colorMode(HSB, height, height, height);
    values = new Uint16Array(30);
    console.log(height)
    for (var i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    console.log(values);
}

/**
 *  Bubble Sort
 *  complexity : length * (length -1)
 * @param {*} values 
 */
function simpleSort(values) {
    for (var i = 0; i < values.length-1; i++) {
        var prev = values[i];
        var next = values[i+1];
        if (prev > next) {
            values[i]   = next;
            values[i+1] = prev;
        }
    }


}

function check(values) {
    for (var i = 0; i < values.length-1; i++) {
        var prev = values[i];
        var next = values[i+1];
        if (prev > next) {
            return false;
        }
    }
    return true;
}

function draw() {
    
    for (var i = 0; i < values.length; i++) {
        fill(values[i], height, height);
        rect(30*i, 0, 30*(i+1), height);
    }

    simpleSort(values);

    if (check(values) === true) {
        // draw one more!
        for (var i = 0; i < values.length; i++) {
            fill(values[i], height, height);
            rect(30*i, 0, 30*(i+1), height);
        }
        console.log('finished!');
        console.log(values);
        noLoop();
    } 
}

function replay() {
    setup();
    loop();
}
