
var Queue = require('./Queue');

function assertEqualVal(val, expected) {
    if (val === expected) console.log(val, 'successed');
    else console.error('failed', val, expected);
}

function assertEqualDq(dq, expression) {
    if (dq.toString().trim() === "Deque " + expression) console.log(dq.toString(), 'success');
    else console.error('failed', dq.toString(), " <> ", expression);
} 

/*
    problem 1. 

    Queue 클래스를 고쳐서 Deque(Double-Ended Queue) 클래스를 만들어보자.
    리스트의 앞과 끝부분 모두에서 요소의 삽입과 삭제가 일어난다.
    
    int size() — Returns how many items are in the deque.
    bool isEmpty() — Returns whether the deque is empty (i.e. size is 0).
    void insertFirst(Object o) — Puts an object {\displaystyle o} {\displaystyle o} at the front.
    void insertLast(Object o) — Puts an object {\displaystyle o} {\displaystyle o} at the back.
    Object removeFirst() — Removes the object from the front and returns it.
    Object removeLast() — Removes the object from the back and returns it.
    Object first() — Peeks at the front item without removing it.
    Object last() — Peeks at the back item without removing it.

    ref ) http://notes.komputerwiz.net:8000/wiki/Deque_(ADT)
*/

var Deque = function() {
    this._ds      = [];
    this.size     = function()     { return this._ds.length;       }
    this.isEmpty  = function()     { return this._ds.length === 0; }
    this.enqf     = function(item) { this._ds.unshift(item);       }
    this.enqe     = function(item) { this._ds.push(item);          }   // same as enqueue
    this.deqf     = function()     { return this._ds.shift();      }   // same as dequeue
    this.deqe     = function()     { return this._ds.pop();        }
    this.front    = function()     { return this._ds[0] ? this._ds[0] : null;                         }
    this.end      = function()     { return this._ds[this.size()-1] ? this._ds[this.size()-1] : null; }
    this.toString = function()     { return "Deque [ " + this._ds.join(' ') + " ] ";                  }
    this.show     = function()     { console.log(this.toString());                                    }
}

// Deque test

console.log(`

Problem 1. Double-Ended Queue  Impl. and Test

`);

var dq = new Deque();
dq.enqf(1);  assertEqualDq(dq, '[ 1 ]');            // put front 
dq.enqf(2);  assertEqualDq(dq, '[ 2 1 ]');          // put front
dq.enqe(3);  assertEqualDq(dq, '[ 2 1 3 ]');        // put end
dq.enqe(4);  assertEqualDq(dq, '[ 2 1 3 4 ]');      // put end
assertEqualVal(dq.deqf(), 2);
assertEqualVal(dq.deqe(), 4);
assertEqualDq(dq, '[ 1 3 ]');
assertEqualVal(dq.front(), 1);
assertEqualVal(dq.end(), 3);
dq.show();


console.log(`

Problem 2. Palindrome(회문) 판별 using deque

`);

/*
    ex) abcba, level ...

    deque 특성상 앞뒤로 다 넣고 뺄 수 있다.
    특이사항은 문자 개수가 짝수냐 홀수냐 정도.

*/

function calibrateWord(word) {
    return word.toLowerCase().match(/[a-z]/g).join('');
}

function isPalindrome(exp) {
    if (typeof exp !== 'string') return false;
    var purifiedExp = calibrateWord(exp);
    var dq = new Deque();
    purifiedExp.split('').forEach(letter => dq.enqe(letter));
    while (dq.size() > 1) {
        if (dq.deqf() !== dq.deqe()) return false; 
    }
    return true;
}

var testWord1 = 'A man, a plan, a canal: Panama';
var testWord2 = '  Hello!!! ';
assertEqualVal(isPalindrome(testWord1), true);
assertEqualVal(isPalindrome(testWord2), false);


console.log(`

Problem 3. 우선순위 큐를 이용하여 코드가 높은 것 먼저 꺼내기.

`);

var PriorityQueue = require('./PriorityQueue');

function Patient(name, code) {
    this.name = name;
    this.code = code;
    this.toString = function() {
        return `{ name : ${this.name}, code: ${this.code} }`;
    }
}


var ed = new PriorityQueue(10, function(item) {
    // 가장 높은 코드가 빨리 치료되어야 한다.
    return +item.code;
});

ed.enqueue(new Patient('Smith', 5));
ed.enqueue(new Patient('Jones', 4));
ed.enqueue(new Patient('Fehrenbach', 6));
ed.enqueue(new Patient('Brown', 1));
ed.enqueue(new Patient('Ingram', 1));

console.log('1', ed.dequeue().toString());
console.log('2', ed.dequeue().toString());
console.log('3', ed.dequeue().toString());
console.log('4', ed.dequeue().toString());
console.log('5', ed.dequeue().toString());


console.log(`

Problem 4. 위 예제를 사용자가 제어할 수 있도록 고치기.

`);

var readline = require('readline');

var r = readline.createInterface({
    input: process.stdin, output: process.stdout
});
r.setPrompt('> ');

// global variables...
var pq = new PriorityQueue(100, function(item) {
    // 가장 낮은 코드가 빨리 치료되어야 한다.
    if (!item) return -9999999;
    return -item.code;
});

var pl = [];
pl.push(new Patient('Smith', 5));
pl.push(new Patient('Jones', 4));
pl.push(new Patient('Fehrenbach', 6));
pl.push(new Patient('Brown', 1));
pl.push(new Patient('Ingram', 1));

r.on('line', (line) => {
    
    if (line === 'q') {
        console.log('응급실 제어 시스템 종료');
        process.exit(0);
    }
    else if (line === '1') onPatientCome();
    else if (line === '2') checkPatient();
    else if (line === '3') showRemainedPatients();
    else {
        console.log('Wrong input : ' + line);
        showSysMenu();
        r.prompt();
    }
});
r.on('close', () => { 
    console.log('응급실 제어 시스템 종료');
    process.exit(0); 
});

function showSysMenu() {
    var menu = `
    ---------------------------------
    |  [1] 환자 응급실에 넣음        |
    |  [2] 환자 검사                 |
    |  [3] 대기 환자 목록            |
    |  [q] 종료                      |  
    ---------------------------------
    `
    console.log(menu);
    r.prompt();
}

function onPatientCome() {
    var patient = pl[Math.floor(Math.random()*pl.length)];
    console.log("환자 " + patient.toString() + " 응급실 들어감.");
    pq.enqueue(patient);
    showSysMenu();
}

function checkPatient() {
    var patient = pq.dequeue();
    if (patient == null) console.log('대기 환자 없음.');
    else console.log("환자 " + patient.toString() + " 검사 완료.");
    showSysMenu();
}

function showRemainedPatients() {
    console.log('대기중인 환자 : ' + pq.toString());
    showSysMenu();
}

console.log('응급실 제어 시스템 시작');
showSysMenu(); r.prompt();