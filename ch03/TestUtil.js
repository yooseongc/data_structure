var fs = require('fs');

/**
 * wrap result to a test template.
 * @param {*} name 
 * @param {*} testCallback 
 */
function testTemplate(name, showResult, testCallback) {
    
    if (showResult) {
        console.log( 
`

-------------------------------------------------------
                    ${name} 
-------------------------------------------------------

${ testCallback() }

-------------------------------------------------------

`);
    } else {
        testCallback();
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