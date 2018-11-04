
var Queue = require('./Queue');


//===========================================
//  Basic Test
//===========================================

var q = new Queue();
q.show();

console.log('\n\n');

q.enqueue('Meredith');
q.enqueue('Cynthia');
q.enqueue('Jennifer');
q.show();

console.log('\n\n');

q.dequeue();
q.show();

console.log('\n\n');

console.log('front : ', q.peekFront());
console.log('end : ' , q.peekEnd());


console.log('\n\n');


//===========================================
//  Square Dance Party
//===========================================

console.log('Square Dance Party!\n\n');
// 4쌍의 커플이 추는 춤.

var text = 
`F Allison McMillan
M Frank Opitz
M Mason McMillan
M Clayton Ruff
F Cheryl Ferenback
M Raymond Williams
F Jennifer Ingram
M Bryan Frazer
M David Durr
M Danny Martin
F aurora Adney`;



class Dancer {
    constructor(name, sex) {
        this._name = name;
        this._sex  = sex;
    }
    
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get sex() {
        return this._sex;
    }
    set sex(sex) {
        this._sex = sex;
    }

    static getDancers(txt) {
        const tDancers = txt.split('\n');
        const dancers = [];
        tDancers.forEach((tDancer) => {
            const [sex, fname, lname] = tDancer.split(' ');
            const dancer = new Dancer(fname + ' ' + lname, sex);
            dancers.push(dancer); 
        });
        const males = new Queue();
        const females = new Queue();
        dancers.filter(dancer => dancer.sex === 'M').forEach(m => males.enqueue(m));
        dancers.filter(dancer => dancer.sex === 'F').forEach(f => females.enqueue(f));
        return { males, females };
    }

    static dance(males, females) {
        console.log('The dance partners are : \n');
        while (!females.isEmpty() && !males.isEmpty()) {
            let f = females.dequeue();
            let m = males.dequeue();
            console.log(`Female dancer is ${f.name} and the male dancer is ${m.name}`);
        }
        
        if (!males.isEmpty())   console.log(`${males.peekFront().name} is waiting to dance.`);
        if (!females.isEmpty()) console.log(`${females.peekFront().name} is waiting to dance.`);
        
    }
}


console.log(Dancer);
var { males, females } = Dancer.getDancers(text);
males.show();
females.show();
console.log('\n\n');
Dancer.dance(males, females);

console.log('\n\nremainders:');
males.show();
females.show();