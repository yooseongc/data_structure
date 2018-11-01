
var Stack = require('./Stack');

function evalPostfixFormula(pf_formula) {
    var OPERATORS = {
        PLUS: '+',
        MINUS: '-',
        MUL: '*',
        DIV: '/',
        MOD: '%',
        POW: '^',
    };

    function isOperator(char) {
        for (var op in OPERATORS) {
            if (OPERATORS[op] === char) return true;
        }
        return false;
    }

    function calc(operand1, operand2, operator) {
        try {
            switch (operator) {
                case OPERATORS.PLUS:  return Number(operand1) + Number(operand2);
                case OPERATORS.MINUS: return Number(operand1) - Number(operand2);
                case OPERATORS.MUL:   return Number(operand1) * Number(operand2);
                case OPERATORS.DIV:   return Number(operand1) / Number(operand2);
                case OPERATORS.MOD:   return Number(operand1) % Number(operand2);
                case OPERATORS.POW:   return Math.pow(Number(operand1),  Number(operand2));
                default: throw new Error(`OPERATOR ${operator} is not supported.`);
            }
        } catch (e) {
            throw e;
        }
        
    }

    var divided = pf_formula.trim().split(' ');
    var operand_stack = new Stack();
    for (var i = 0; i < divided.length; i++) {
        var next = divided[i];
        if (!isOperator(next)) operand_stack.push(next);
        else {
            var operand2 = operand_stack.pop();
            var operand1 = operand_stack.pop();
            operand_stack.push(calc(operand1, operand2, next));
        }
    }
    return operand_stack.pop();
}

module.exports = evalPostfixFormula;