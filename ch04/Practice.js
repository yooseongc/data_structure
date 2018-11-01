
var Stack = require('./Stack');
var TestUtil = require('./TestUtil');

/*  1. 수식에 열고 닫는 괄호 쌍이 제대로 갖춰져 있는지 확인.
 * 
 *     만약 수식에 열거나 닫는 괄호가 없으면 그 위치를 반환하는 함수를 구현.
 * 
 * 
     1) Declare a character stack S.
     2) Now traverse the expression string exp.
        a) If the current character is a starting bracket (‘(‘ or ‘{‘ or ‘[‘) then push it to stack.
        b) If the current character is a closing bracket (‘)’ or ‘}’ or ‘]’) then pop from stack and if the popped character is the matching starting bracket then fine else parenthesis are not balanced.
     3) After complete traversal, if there is some starting bracket left in stack then “not balanced”

      정리하자면,

      문자열 하나씩 보면서 '(' 가 나오면 stack에 push,  ')'가 나오면 stack에서 pop
        만약 ')'가 나왔는데 '('가 나오지 않는다면   unbalance.
      만약 순환을 마쳤는데 stack에 '('가 남아있다면 unbalance.

      ex.         ( ( ) ( ( ( ) ) ( ) ) )

      (       ,   ( ) ( ( ( ) ) ( ) ) )
      ( (     ,   ) ( ( ( ) ) ( ) ) )
      (       ,   ( ( ( ) ) ( ) ) )
      ( (     ,   ( ( ) ) ( ) ) )
      ( ( (   ,   ( ) ) ( ) ) )
      ( ( ( ( ,   ) ) ( ) ) )
      ( ( (   ,   ) ( ) ) )
      ( (     ,   ( ) ) )
      ( ( (   ,   ) ) )
 */


function evalParenthesesBalance(formula) {

    var RETURN_CODE = {
        OK: 'OK',
        OPEN_PARENTHESIS_NONE: 'OPEN_PARENTHESIS_NONE',
        CLOSE_PARENTHESIS_NONE: 'CLOSE_PARENTHESIS_NONE'
    };
    
    var result = null;
    var ops = new Stack();
    for (var i = 0; i < formula.length; i++) {
        var ch = formula[i];
        if        ('(' === ch) {
            ops.push({ char: ch, idx: i });
        } else if (')' === ch) {
            if         (ops.isEmpty()) { 
                // unbalance case 1  :  CLOSE exists but OPEN is not.
                result = { code: RETURN_CODE.OPEN_PARENTHESIS_NONE, idx: i };
                break;
            } else {
                ops.pop();
            }
        } else {
            continue;
        }
    }
    // stack check
    if (!ops.isEmpty()) {
        // unbalance case 2 :  OPEN exists but CLOSE is not.
        var latest = ops.pop();
        result = { code: RETURN_CODE.CLOSE_PARENTHESIS_NONE, idx: latest.idx };
    }
    // if it has no problems,
    if (!result)
    result = { code: RETURN_CODE.OK, idx: -1 };

    // display
    console.log();
    console.log(formula);
    if (! (result.code === RETURN_CODE.OK)) {
        var pos = '';
        for (var i = 0; i < result.idx; i++) { pos += ' '; }
        pos += '^';
        console.log(pos);
    }
    console.log(result);
    console.log();
 }

 console.log('\n\n  Problem1 \n\n');

TestUtil.printWithTime('test1', () => evalParenthesesBalance('( ( ) ( ( ( ) ) ( ) ) )'));
TestUtil.printWithTime('test2', () => evalParenthesesBalance('2.3 + 23 / 12 + (3.14159 * .24'));
TestUtil.printWithTime('test3', () => evalParenthesesBalance('(2.3 + (23)) / 12 + 3.14159) * .24'));
TestUtil.printWithTime('test4', () => evalParenthesesBalance('( ( ( ( ) ) ) )'));



/*
 *  2. 후위 연산 평가자 구현 
 *      [   op1   op2   operator  ]
 * 
 *   something like    2 3 +   ==>   2 + 3 = 5 
 *                     2 3 * 3 +   ==>  2 * 3 + 3 = 9  
 * 
 * 
 *   각 숫자와 연산자는 ' '로 분리되어있다고 가정.
 *   지원하는 연산자는 별도로 enum으로 정의.
 *   연산자 우선순위는 이미 후위표현식에 들어 있음.
 * 
 */


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

    var divided = pf_formula.split(' ');
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

console.log('\n\n  Problem2 \n\n');

TestUtil.printWithTime('test5', () => evalPostfixFormula('3 5 + 4 2 + *'));
TestUtil.printWithTime('test5', () => evalPostfixFormula('3.5 5 / 4 2 ^ *'));
TestUtil.printWithTime('test5', () => evalPostfixFormula('3 5 + 4 2 + * 2 + 49 %'));





/*
 *   Problem 3.   Pez dispenser 
 * 
 *     사탕뽑는 기계는 스택과 같은 방식으로 동작한다.
 *     만약 R, Y, W 색 사탕이 섞여있다고 하고  우리는 Y 색 사탕을 싫어한다.
 *     다른 사탕 순서는 바꾸지 않고 노란색 사탕만 제거하려면?
 * 
 *     가장 단순한 케이스는   
 *     [ R Y W R] 순서    -->   [ R  W ]  로 변경
 *     1) R 뽑으면   [ R Y W ]     -->  나온 R
 *     2) W 뽑으면   [ R Y   ]     -->  나온 R W
 *     3) Y 뽑으면   [ R     ]
 *     4) W 넣으면   [ R W   ]
 *     5) R 넣으면   [ R W R ]
 * 
 *     나올 때는 R , W 순서이고 
 *     넣을 때는 W , R 순서이다.
 *     먼저 나온 녀석이 나중에 들어가야 하는 상황이므로 스택을 한개 더 사용한다. 
 */

console.log('\n\n  Problem3 \n\n');

function Candy(color) {
    this.color = color;
}

function PezDispenser(candies) {
    
    this.getSize = function()      { return this.candyBox.length();       };
    this.takeOne = function()      { return this.candyBox.pop();          };
    this.push    = function(candy) { return this.candyBox.push(candy);    };
    this.isEmpty = function()      { return this.getSize() === 0;         };
    this.show    = function()      { console.log(this.candyBox.display()) };
    // initialization
    this.candyBox = new Stack();
    candies.forEach((candy) => {
        this.candyBox.push(candy);
    });

}

 var candies = [];
 var colors = [ 'RED', 'YELLOW', 'BLUE', 'GREEN', 'BLACK', 'PURPLE' ];
 for (var i = 0; i < 10; i++) {
    candies.push(new Candy(colors[Math.floor(Math.random() * colors.length)]));
 }

 var pezDispenser = new PezDispenser(candies);
 pezDispenser.show();
 var totnum = pezDispenser.getSize();
 console.log('pezDispenser size : ', totnum);


var tempBox = new Stack();
for (var i = 0; i < totnum; i++) {
    tempBox.push(pezDispenser.takeOne());
}

for (var i = 0; i < totnum; i++) {
    var candy = tempBox.pop();
    if (candy.color === 'YELLOW') continue;
    pezDispenser.push(candy);
}

pezDispenser.show();
var remain = pezDispenser.getSize();
console.log('pezDispenser remained size : ', remain);

console.log('\n\n\n');


