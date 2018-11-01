
var evalPostfix = require('./EvalPostfix');
var infix2postfix = require('./Infix2Postfix_withParen');


var expr = '(1+(21))*3';

function calculate(expr) {
    return evalPostfix(infix2postfix(expr));
}


console.log("expr   :  " + expr);
console.log("result :  " + calculate(expr));