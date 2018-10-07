
var List = function() {

    this.listSize = 0;
    this.pos = 0;
    this._dataStore = [];
}

Object.assign(List.prototype, {

    constructor: List,

    clear: function() {
        this.listSize = 0;
        this.pos = 0;
        this._dataStore.length = 0;  // hack of js array
    },

    find: function() {

    },

    toString: function() {
        return JSON.stringify(this._dataStore);
    },

    insert: function() {

    },

    append: function() {

    },

    remove: function() {

    },

    front: function() {

    },

    end: function() {

    }
});

module.exports = List;
