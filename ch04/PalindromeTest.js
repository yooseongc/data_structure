
/**
 * 
 *  회문(回文) 또는 팰린드롬(palindrome)은 거꾸로 읽어도 제대로 읽는 것과 같은 문장이나 낱말이다. 
 *  보통 낱말 사이에 있는 띄어쓰기나 문장 부호는 무시한다.
 *  
 *  (Example)
 *  Madam, I'm Adam.
 *  rotator
 *  race car
 *  1001
 *  A man, a plan, a canal: Panama
 * 
 *  단어를 순차적으로 스택에 집어넣고 
 */

var Stack = require('./Stack');
var TestUtil = require('./TestUtil');

function calibrateWord(word) {
    return word.toLowerCase().match(/[a-z]/g).join('');
}

function isPalindrome(word) {
    var origin = calibrateWord(word);
    var s = new Stack();
    // save origin into stack
    for (var i = 0; i < origin.length; i++) {
        s.push(origin[i]);
    }
    // make reverse
    var reverse = '';
    while (!s.isEmpty()) { reverse += s.pop(); }
    return (origin == reverse);
}

var testWord1 = 'A man, a plan, a canal: Panama';
var testWord2 = '  Hello!!! ';

// test for calibrateWord(testWord)
//console.log(calibrateWord(testWord1));  // amanaplanacanalpanama

console.log('isPalindrome() test1', testWord1, isPalindrome(testWord1));
console.log('isPalindrome() test2', testWord2, isPalindrome(testWord2));