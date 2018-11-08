
var Queue = require('./Queue');

/*
 * 
 * 5.5 우선순위 큐
 * 
 * FIFO(선입선출)가 아닌 우선순위와 같은 다른 기준으로 
 * 요소를 삭제해야 하는 경우에 어떻게 하면 좋을까?
 * 
 * 복잡하니 linear queue 만 적용해보자. 
 */

var PriorityQueue = function(maxSize = 10, priorityFunc) {
    Queue.call(this, 'l', maxSize);
    this.priorityFunc = priorityFunc;
};

// The Object.assign() method is used to copy the values of 
// all enumerable own properties from one or more source objects to a target object. 
// It will return the target object.

PriorityQueue.prototype = Object.assign(Object.create(Queue.prototype), {
    constructor: PriorityQueue,
    dequeue: function() {
        // 가장 우선순위가 높은 녀석을 먼저 제거해야 한다.
        // 우선순위가 같은 경우 먼저 들어온 녀석이 먼저 나간다.
        if (this.isEmpty()) return null; 
        var mostImportantIdx = 0;
        for (var i = 0; i < this._dataStore.length; i++) {
            if (this.priorityFunc(this._dataStore[i]) > this.priorityFunc(this._dataStore[mostImportantIdx])) {
                mostImportantIdx = i;
            }
        }
        return this._dataStore.splice(mostImportantIdx, 1);
    }
});


var unitTest = false;

if (unitTest) {

    // unit test

    function Patient(name, code) {
        this.name = name;
        this.code = code;
        this.toString = function() {
            return `{ name : ${this.name}, code: ${this.code} }`;
        }
    }


    var ed = new PriorityQueue(10, function(item) {
        // 가장 낮은 코드가 빨리 치료되어야 한다.
        return -item.code;
    });


    var p;
    p = new Patient('Smith', 5);        ed.enqueue(p);
    p = new Patient('Jones', 4);        ed.enqueue(p);
    p = new Patient('Fehrenbach', 6);   ed.enqueue(p);
    p = new Patient('Brown', 1);        ed.enqueue(p);
    p = new Patient('Ingram', 1);       ed.enqueue(p);

    ed.show();
    console.log('1', ed.dequeue().toString());
    ed.show();
    console.log('2', ed.dequeue().toString());
    ed.show();
    console.log('3', ed.dequeue().toString());
    ed.show();
    console.log('4', ed.dequeue().toString());
    ed.show();
    console.log('5', ed.dequeue().toString());

}

 module.exports = PriorityQueue;