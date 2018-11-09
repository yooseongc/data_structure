
var canvas = document.getElementById('gameboard');
var game = new BrickBreakGame(canvas);

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

var startBtn = document.getElementById("start");
startBtn.onclick = function() {
    window.dispatchEvent(gameStartEvent);
    setTimeout(() => window.dispatchEvent(gameEndEvent), 3000);
}

