/**
 * FIFO : First In, First Out.
 */
function Queue() {
    
    this.front = 0;
    this.end = 0;
    this._dataStore = [];

    this.size = function() {
        return this._dataStore.length;
    }

    this.enqueue = function(item) {
        this._dataStore.push(item);
        this.end += 1;
        console.log(`in value : ${item}, front : ${this.front}, end : ${this.end}`);
    }

    this.dequeue = function() {
        this.front += 1;
        var out = this._dataStore.shift();
        if (typeof out === 'undefined') throw new Error('UnderFlow occurred.');
        console.log(`out value : ${out}, front : ${this.front}, end : ${this.end}`);
        return out;
    }

    this.show = function() {
        console.log(this._dataStore);
    }

}


var q = new Queue();
q.enqueue('1');
q.show();
q.enqueue('2');
q.show();

q.dequeue();
q.show();
q.dequeue();
q.show();

