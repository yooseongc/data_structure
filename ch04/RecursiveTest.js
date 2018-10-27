
var Stack = require('./Stack');
var TestUtil = require('./TestUtil');

// 복잡도 n-1
function factorial(n) {
    return (n === 0) ? 1 :  n * factorial(n-1);
}


// 복잡도 2*(n-1)
function factorial2(n) {
    var s = new Stack();
    while (n > 1) {
        s.push(n--);
    }
    var product = 1;
    while (!s.isEmpty()) {
        product *= s.pop();
    }
    return product;
}

// 복잡도 : n-1
function factorial3(n) {
    var product = 1;
    for (;n > 
        1;) {
        product *= n--;
    }
    return product;
}


TestUtil.printWithTime('factorial1', () => factorial(128));
TestUtil.printWithTime('factorial2', () => factorial2(128));
TestUtil.printWithTime('factorial3', () => factorial3(128));

