
var List = require('./List');
var ArrayList = require('./ArrayList');
var TestUtil = require('./TestUtil');



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


TestUtil.testTemplate('test3', false, () => {

    var result_string  = '';
    var fulltext = TestUtil.readFile('./sample_text.txt');
    var lines = fulltext.split('\n');
    var text_list = new ArrayList();
    lines.map((line) => {
        text_list.append(line.trim());
    });
    var iter = text_list.iterator();
    while (iter.hasNext()) {
        result_string += iter.next() + '\n';
    }

    return result_string;

});


TestUtil.testTemplate('test4', false, () => {

    var result_string  = '';
    var fulltext = TestUtil.readFile('./films.txt');
    var lines = fulltext.split('\n');
    var text_list = new ArrayList();
    lines.map((line) => {
        text_list.append(line.trim());
    });
    var iter = text_list.iterator();
    while (iter.hasNext()) {
        result_string += iter.next() + '\n';
    }

    return result_string;

});


TestUtil.testTemplate('test5', false, () => {

    var result_string  = '';
    var fulltext = TestUtil.readFile('./films.txt');
    var lines = fulltext.split('\n');
    var movies = new ArrayList();
    lines.map((line) => {
        movies.append(line.trim());
    });
    
    function Customer(name, movie) {
        this.name = name;
        this.movie = movie;
    }

    List.prototype.displayList = function() {
        var list = this;
        var res = '';
        for (list.front(); list.currPos() <= list.length(); list.next()) {
            
            if (list.getElement() instanceof Customer) {
                res += `${ list.getElement()['name'] }, ${ list.getElement()['movie'] }\n`;
            } else {
                res += list.getElement() + '\n'; 
            }
            if (list.currPos() == (list.length() - 1)) break;

        }
        return res;
    }

    result_string += movies.displayList();
    

    return result_string;

});


TestUtil.testTemplate('test6', true, () => {

    var result_string  = '';
    var fulltext = TestUtil.readFile('./films.txt');
    var lines = fulltext.split('\n');
    var movies = new ArrayList();
    lines.map((line) => {
        movies.append(line.trim());
    });
    
    // Customer Object Constructor
    function Customer(name, movie) {
        this.name = name;
        this.movie = movie;
    }

    // if movie rental is available, rent it.
    function checkOut(name, movie, filmList, customerList) {
        console.log(movie, filmList.find(movie), filmList.contains(movie))
        if (filmList.contains(movie)) {
            var c = new Customer(name, movie);
            customerList.append(c);
            filmList.remove(movie);
        } else {
            result_string += `${name}! ${movie} is not available now. \n`;
        }
    }

    List.prototype.displayList = function() {
        var list = this;
        var res = '';
        for (list.front(); list.currPos() <= list.length() - 1; list.next()) {
            
            if (list.getElement() instanceof Customer) {
                res += `${ list.getElement()['name'] }, ${ list.getElement()['movie'] }\n`;
            } else {
                res += list.getElement() + '\n'; 
            }
            if (list.currPos() == (list.length() - 1)) break;
            
        }
        return res;
    }
    result_string += '-------------------------\n';
    result_string += 'Available movies : \n';
    result_string += '-------------------------\n';
    result_string += movies.displayList();
    result_string += '-------------------------\n';

    var customers = new ArrayList();
    checkOut("Jane Doe", "The Godfather", movies, customers);

    result_string += 'Customer Rental : \n';
    result_string += '-------------------------\n';
    result_string += customers.displayList();
    result_string += '-------------------------\n';

    checkOut("Hello World", "The Godfather", movies, customers);
    result_string += '-------------------------\n';

    result_string += 'Customer Rental : \n';
    result_string += '-------------------------\n';
    result_string += customers.displayList();
    result_string += '-------------------------\n';
    

    return result_string;

});
