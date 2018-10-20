var fs = require('fs');
var performance = require('perf_hooks').performance;

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
            `ellapsed time : ${ (end - start) } ms.`
        );
    }

    } else {
        var start = performance.now();
        testCallback();
        var end = performance.now();
        if (checkTime) {
            console.log(
                `ellapsed time : ${ (end - start) } ms.`
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


module.exports = { testTemplate, readFile };