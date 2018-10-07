

var List = function() {
    this._type = 'List';
    this.listSize = 0;
    this.pos = 0;
}


Object.assign(List.prototype, {
    
    constructor: List,

    clear: function() {
        throw new Error('List : not implemented!');
    },

    find: function(element) {
        throw new Error('List : not implemented!');
    },

    toString: function() {
        return JSON.stringify(this);
    },

    insert: function(element, after) {
        throw new Error('List : not implemented!');
    },

    append: function(element) {
        throw new Error('List : not implemented!');
    },

    remove: function(element) {
        throw new Error('List : not implemented!');
    },

    front: function() {
        this.pos = 0;
    },

    end: function() {
        this.pos = this.listSize-1;
    },
    
    prev: function() {
        if (this.pos > 0) --this.pos;
    },

    next: function() {
        if (this.pos < this.listSize - 1) ++this.pos;
    },

    length: function() {
        return this.listSize;
    },

    currPos: function() {
        return this.pos;
    },

    moveTo: function(pos) {
        this.pos = pos;
    },

    getElement: function() {
        throw new Error('List.getElement() : not implemented!');
    },

    /**
     * if list contains element, return true, else false.
     * @param element
     */
    contains: function(element) {
        return (this.find(element) != -1);
    },

    iterator: function() {
        var list = this;
        list.front();
        var end = true;
        return { 
            hasNext: function() {
                return end;
            },
            next: function() {
                var elem = list.getElement();
                var currPos = list.currPos();
                list.next(); 
                if (currPos == list.currPos()) end = false;
                return elem;
            }
        };
    }
});

module.exports = List;
