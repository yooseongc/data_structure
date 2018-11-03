
// ========================================================
// TODO : TEST this object!!!!
//        I didn't check this object at all...
// ========================================================

/**
 * Basic Queue Implementation 
 * with Javascript Array.
 * @param type : 'l' denotes for 'linear queue' and 'c' denotes for 'circular queue'. default is 'l'
 * @param maxSize : size of this queue. default is 10.
 * @returns Queue Object
 */
function Queue(type = 'l', maxSize = 10) {
    
    if      (type === 'l') this._type = 'Linear Queue';
    else if (type === 'c') this._type = 'Circular Queue';
    else throw new Error('Illegal argument : type should be "l"(linear) or "c"(circular)');

    // initial value for front = end = 0;
    this.front = 0;
    this.end = 0;
    this.maxSize = (type === 'l') ? maxSize : maxSize + 1;
    this._dataStore = (type === 'l') ? [] : [null];
    
    /*
    우선 10의 크기를 가진 큐를 사용하기 위해서는 11만큼의 배열 사이즈를 할당해야 한다. 
    큐의 첫 번째 인덱스는 항상 비워두어야 하기 때문이다. 첫 번째 인덱스를 비워놓음으로서 
    원형 큐가 공백상태인지 포화상태인지 판단 할 수 있게 된다.
    
    공백 상태 : front == rear
    포화 상태 : front % M == (rear + 1) % M
    */

    /**
     * get total size of this queue.
     */
    this.size = function() {
        return (this.type === 'l') ? this._dataStore.length : this._dataStore.length - 1;
    }

    /**
     * check this queue is empty or not.
     */
    this.isEmpty = function() {
        // 환형 큐의 경우 
        if (this.type === 'l') return this.front === this.end;
        else                   return this.front === this.end;
    }

    /**
     * check this queue is full.
     */
    this.isFull = function() {
        if (this.type === 'l') return this.end === this.maxSize;
        else                   return ( (this.front % this.size()) === ((this.end + 1) % this.size()) );
    }

    /**
     * push item into this queue. (to end).
     * and then, this end pointer increase by 1.
     */
    this.enqueue = function(item) {
        if (this.isFull()) throw new Error('Overflow occurred.');
        if (this.type === 'l') {
            this._dataStore[this.end] = item;
            this.end += 1;
        } else {
            this._dataStore[(this.end+1) % this.maxSize] = item;
            this.end = (this.end + 1) % this.maxSize;
        }
    }

    this.dequeue = function() {
        if (this.isEmpty()) throw new Error('Underflow occurred.');
        if (this.type === 'l') {
            var out = this._dataStore[this.front];
            this._data[this.front] = undefined;
            this.front += 1;
            return out;
        } else {
            var out = this._dataStore[(this.front+1) % this.maxSize];
            this._data[(this.front+1) % this.maxSize] = undefined;
            this.front = (this.front + 1) % this.maxSize;
            return out;
        }
    }

    this.toString = function() {
        if (this.type === 'l') return JSON.stringify(this._dataStore);
        else {
            let copy = this._dataStore.slice();
            JSON.stringify(copy.splice(1, this.size()));
        }
    }

    this.show = function() {
        if (this.type === 'l') console.log(this._dataStore);
        else {
            let copy = this._dataStore.slice();
            console.log(copy.splice(1, this.size()));
        }
    }

}

