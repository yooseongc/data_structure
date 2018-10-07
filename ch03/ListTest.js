
var ArrayList = require('./ArrayList');

console.log('ArrayList prototype : ');
console.dir(ArrayList.prototype);

console.log('\n\n\n');
console.log('----------------------------------------');
console.log('                  test1                 ');
console.log('----------------------------------------');
console.log();

var names = new ArrayList();
console.log(names);

names.append("Clayton");
names.append("Raymond");
names.append("Cynthia");
names.append("Jennifer");
names.append("Bryan");
names.append("Danny");

console.log(names.toString());

names.front();
console.log(`first : ${names.getElement()}`);

names.next();
console.log(`next : ${names.getElement()}`);

names.end();
console.log(`end : ${names.getElement()}`);

console.log();
console.log('----------------------------------------');
console.log();

console.log('\n\n\n');
console.log('----------------------------------------');
console.log('                  test2                 ');
console.log('----------------------------------------');
console.log();

var iter = names.iterator();
console.log(iter);

while (iter.hasNext()) {
    console.log(iter.next());
}
// iter.next();  --> it will occur error.

console.log();
console.log('----------------------------------------');
console.log();


