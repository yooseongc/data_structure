
var canvas = document.getElementById('gameboard');
var game = new BrickBreakGame(canvas);

// create gamestart, gameend event
var gameStartEvent = document.createEvent('Event');
var gameEndEvent   = document.createEvent('Event');
gameStartEvent.initEvent('gamestart', true, true);
gameEndEvent.initEvent('gameend', true, true);

window.addEventListener('gamestart', e => {
    var startBtn = document.getElementById("start");
    startBtn.className = 'hidden';
    game.start();
}, false);

window.addEventListener('gameend', e => {
    game.end();
    var startBtn = document.getElementById("start");
    startBtn.className = '';
}, false);

// start btn
var startBtn = document.getElementById("start");
startBtn.onclick = function() {
    window.dispatchEvent(gameStartEvent);
}


// keyboard listener
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 39 || e.keyCode === 37) {
        game.onKeyPressed(e);
    }
}, false);

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 39 || e.keyCode === 37) {
        game.onKeyReleased(e);
    }
}, false);