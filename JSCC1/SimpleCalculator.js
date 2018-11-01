

function calculate(expr) {
    var ch = expr[0];
    if (!isNumber(ch)) throw Error("Wrong Expression. : " + expr);

    var digit;
    var left = 0;
    var p = 0;    // pointer
    for (p = 0; p < expr.length; p++) {
        var ch = expr[p];
        if (!isNumber(ch)) break;
        digit = parseInt(ch);
        left = 10 * left + digit;
    }
    if (p == expr.length) return left;

    var op = expr[p++];
    var right = 0;
    for (; p < expr.length; p++) {
        var ch = expr[p];
        if (!isNumber(ch)) break;
        digit = parseInt(ch);
        right = 10 * right + digit;
    }

    var retval = 0;

    switch (op) {
        case '+': retval = left + right; break;
        case '-': retval = left - right; break;
        case '*': retval = left * right; break;
        case '/': retval = left / right; break;
        default: throw Error('Wrong Operator : ' + op);
    }

    return retval;

}

function isNumber(char) {
    char = char.charCodeAt(0);
    return (char >= '0'.charCodeAt(0) && '9'.charCodeAt(0) >= char);
}


// test
console.log(calculate('1+2'));
console.log(calculate('1-2'));
console.log(calculate('1*2'));
console.log(calculate('1/2'));

module.exports = calculate;