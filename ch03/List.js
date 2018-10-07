
var List = function() {

    this.listSize = 0;
    this.pos = 0;
    this._dataStore = [];
}

Object.assign(List.prototype, {

    constructor: List,

    clear: function() {
        this.listSize = this.pos = 0;
        this._dataStore.length = 0;  // hack of js array
    },

    /**
     * find first element index if it is in this list.
     * else return -1 
     * @param element
     */
    find: function(element) {
        // implementation 1
        // for (var i = 0; i < this._dataStore.length; i++) {
        //     if (this._dataStore[i] == element) {
        //         return i;
        //     }
        // }
        // return -1;

        // implementation 2
        this._dataStore.forEach(function (value, index) {
            if (value == element) return index;
        });
        return -1;
    },

    /**
     * return this list to JSON string.
     */
    toString: function() {
        return JSON.stringify(this._dataStore);
    },

    /**
     * insert element after 'something'
     * @param element
     * @param after
     */
    insert: function(element, after) {
        var insertPos = this.find(after);
        if (insertPos > -1) {
            // ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            this._dataStore.splice(insertPos+1, 0, element);
        }
    },

    /**
     * append new element to last 
     * @param element 
     */
    append: function(element) {
        this._dataStore[this.listSize++] = element;
    },

    /**
     * remove first element if its value is same as elements.
     * if it succeed return true, else return false. 
     */
    remove: function(element) {
       
        var foundAt = this.find(element);
        if (foundAt > -1) {
            this._dataStore.splice(foundAt, 1);
            --this.listSize;
            return true;
        }
        return false;
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
        return this._dataStore[this.pos];
    },

    /**
     * if list contains element, return true, else false.
     * @param element
     */
    contains: function(element) {
        return (this.find(element) != -1);
    },


});

module.exports = List;
