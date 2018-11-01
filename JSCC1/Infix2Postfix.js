
var Stack = require('./Stack');

function getOperatorPriority(ch) {
    var priority = 0;
    switch (ch) {
        case '+': priority = 1; break;
        case '-': priority = 1; break;
        case '*': priority = 2; break;
        case '/': priority = 2; break;
        default : throw Error('Invalid Operator : ' + ch); 
    }
    return priority;
}

function isDigit(char) {
    if (typeof char === 'undefined') return false;
    char = char.charCodeAt(0);
    return (char >= '0'.charCodeAt(0) && '9'.charCodeAt(0) >= char);
}

function infix2postfix(infix_expr) {
    if (!isDigit(infix_expr[0])) throw Error('Invalid Expr : ' + infix_expr);
    
    var ch;
    var p = 0;
    var len = infix_expr.length;

    var postfix = '';
    var opStack = new Stack();

    for (p=0;p < len; p++) {
        ch = infix_expr[p];
        if (isDigit(ch)) {
            while (isDigit(ch)) {
                postfix += ch;
                ch = infix_expr[++p];
            }
            p--;
            postfix += ' ';
        } else {  // operator
            if (!opStack.isEmpty()) {
                ch = infix_expr[p];
                var new_pri = getOperatorPriority(ch);
                while (!opStack.isEmpty()) {
                    if (new_pri <= getOperatorPriority(opStack.peek())) {
                        postfix += opStack.pop();
                    } else {
                        break;
                    }
                    
                }
            }
            opStack.push(ch);
        }
    }

    while (!opStack.isEmpty()) {
        postfix += opStack.pop() + ' ';
    }

    return postfix;
}

console.log(infix2postfix('1+21*3')); // 1 21 3 * +