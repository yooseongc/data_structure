
var Stack = require('./Stack');

function getOperatorPriority(ch) {
    var priority = 0;
    switch (ch) {
        case '+': priority = 1; break;
        case '-': priority = 1; break;
        case '*': priority = 2; break;
        case '/': priority = 2; break;
        case '%': priority = 3; break;
        case '^': priority = 3; break;
        default : throw Error('Invalid Operator : ' + ch); 
    }
    return priority;
}

function isDigit(char) {
    if (typeof char === 'undefined') return false;
    char = char.charCodeAt(0);
    return (char >= '0'.charCodeAt(0) && '9'.charCodeAt(0) >= char);
}

/*
    1. 여는 소괄호를 만나면, 연산자 보관소에 어떤 연산자가 존재하든 관계없이 여는 소괄호를 보관소에
        저장한다.
    2. 닫는 소괄호를 만나면, 연산자 보관소에 가장 마지막으로 저장된 여는 소괄호를 발견할 때까지의 모
        든 연산자를 ‘후위 표기식’에 출력한다.
*/
function infix2postfix(infix_expr) {
    
    var ch;
    var p = 0;
    var len = infix_expr.length;

    var postfix = '';
    var opStack = new Stack();

    for (p=0;p < len; p++) {
        ch = infix_expr[p];
        // console.log("ch : " + ch + ", p : " + p + ", len : " + len);
        // console.log(opStack);
        // console.log("res : " + postfix + "\n");
        if (isDigit(ch)) {
            while (isDigit(ch)) {
                postfix += ch;
                ch = infix_expr[++p];
            }
            p--;
            postfix += ' ';
        } else {  // operator
            if (ch === '(') {
                opStack.push(ch);
            } else if (ch === ')') {
                if (!opStack.isEmpty()) {
                    while (!opStack.isEmpty()) {
                        var top = opStack.peek();
                        if (top === '(') {
                            break;
                        } else {
                            postfix += opStack.pop() + ' ';
                        }
                    }
                    if (opStack.peek() !== '(') {
                        throw new Error('Invalid parenthesis');
                    }
                    opStack.pop();  // remove '('
                }
            } else {
                if (!opStack.isEmpty()) {
                    ch = infix_expr[p];
                    var new_pri = getOperatorPriority(ch);
                    while (!opStack.isEmpty()) {
                        var top = opStack.peek();
                        if (top === '(') {
                            break;
                        } else if (new_pri <= getOperatorPriority(opStack.peek())) {
                            postfix += opStack.pop();
                        } else {
                            break;
                        }
                        
                    }
                }
                opStack.push(ch);
            }
        }
    }

    while (!opStack.isEmpty()) {
        var op = opStack.pop();
        if (op === '(') throw new Error('Invalid parenthesis');
        postfix += op + ' ';
    }

    console.log('postfix : ' + postfix);
    return postfix;
}

//console.log(infix2postfix('(1+(21))*3')); // 1 21 + 3 *

module.exports = infix2postfix;