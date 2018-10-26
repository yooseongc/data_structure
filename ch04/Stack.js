


var Stack = function() {
    this._type = 'Stack';
    this.top = 0;
    this._dataStore = new Array();
}


Object.assign(Stack.prototype, {
    
    constructor: Stack,

    clear: function() {
        this._dataStore.length = 0;
        this.top = 0;
    },

    length: function() {
        return this.top;
    },

    peek: function() {
        return this._dataStore[this.top-1];
    },

    toString: function() {
        return JSON.stringify(this);
    },

    push: function(element) {
        this.top++;
        this._dataStore[this.top-1] = element;
    },

    pop: function(element) {
        this.top--;
        return this._dataStore.pop();
    },

    isEmpty: function() {
        return (this.top === 0);
    }
    
});

module.exports = Stack;
