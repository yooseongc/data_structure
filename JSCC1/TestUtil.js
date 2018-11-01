var fs = require('fs');
var performance = require('perf_hooks').performance;

function printWithTime(name, callback) {
    var start = performance.now();
    var result = callback();
    var end = performance.now();
    console.log(name, result,  `ellapsed time : ${ (end - start) } ms.`);
}

/**
 * wrap result to a test template.
 * @param {*} name 
 * @param {*} testCallback 
 */
function testTemplate(name, showResult, checkTime, testCallback) {
    
    var start = performance.now();
    if (showResult) {
        console.log( 
`

-------------------------------------------------------
                    ${name} 
-------------------------------------------------------

${ testCallback() }

-------------------------------------------------------
`);
    var end = performance.now();
    if (checkTime) {
        console.log(
            `ellapsed time : ${ (end - start) } ms.\n\n`
        );
    }

    } else {
        var start = performance.now();
        testCallback();
        var end = performance.now();
        if (checkTime) {
            console.log(
                `ellapsed time : ${ (end - start) } ms.\n\n`
            );
        }
    }
}

/**
 * Read file synchronously.
 * @param {string} filepath
 * @returns {string} file text string 
 */
function readFile(filepath) {
    return fs.readFileSync(filepath, { encoding: 'utf8' });
}


module.exports = { testTemplate, readFile, printWithTime };