
var Stack = require('./Stack');
var TestUtil = require('./TestUtil');

TestUtil.testTemplate('Test 1', true, true, () => {
    var result = '';

    var s = new Stack();
    s.push('David');
    s.push('Raymond');
    s.push('Bryan');
    
    result += `length : ${ s.length() }\n`;
    result += `peek --> ${ s.peek()   }\n`;
    result += `pop  --> ${ s.pop()    }\n`;
    result += `peek --> ${ s.peek()   }\n`;

    s.push('Cynthia');
    result += `peek --> ${ s.peek()   }\n`;
    s.clear();
    result += `length : ${ s.length() }\n`;
    result += `peek --> ${ s.peek()   }\n`;
    s.push('Clayton');
    result += `peek --> ${ s.peek()   }\n`;

    return result;
});