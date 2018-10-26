/*
 * 
 * Binary Conversion Test, using Stack.
 * 
 *  number a with base m --> number a with base n
 *  
 *  for example,
 * 
 *   255 (10) --> 1111111 (2)
 * 
 *   1) last digit :  a % m,  save last digit at stack.    255 % 2 = 1
 *   2) a = a / m     ex)  255 --> 255 / 2 = 127 (discard .5)   
 *   3)   iterate 1) and 2)  while a become 0
 *   4)   in each iterate process, each digit saved in stack.    TOP - [ 1 1 1 1 1 1 1 ]
 */

var Stack = require('./Stack');
var TestUtil = require('./TestUtil');


function mulBase(num, base) {
    var stack = new Stack();
    do {
        stack.push(num % base);
        num = Math.floor(num /= base);
    } while (num > 0);
    return stack;
}


function mulBaseWithRecursive(num, base) {
    function findDigit(num, base, stack) {
        if (num !== 0) {
            stack.push(num % base);
            var next = Math.floor(num / base);
            return findDigit(next, base, stack);
        } else  {
            return stack;
        }
    }
    return findDigit(num, base, new Stack());
}

function displayStack(stack) {
    var res = '';
    while (!stack.isEmpty()) { res += stack.pop(); }
    return res;
}

TestUtil.testTemplate('test1 : mulBase()', true, true, () => {
    var rs = mulBase(125, 8);
    return displayStack(rs);
});

TestUtil.testTemplate('test2 : mulBaseWithRecursive()', true, true, () => {
    var rs = mulBaseWithRecursive(125, 8);
    return displayStack(rs);
});
