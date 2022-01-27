const program         = require('commander')
const fileEasy        = require('file-easy')
const path            = require('path')
const yamljs          = require('yamljs')
const {createSuite}   = require('../lib/yaml2jest')

let p = require('../package.json')
program
    .name('yaml2jest')
    .description(p.description)
    .version(p.version)

program
    .arguments('<yamlfile>')
    .option('-o, --output <testfile>', 'fullpath to test file to create (default: <yamlfile-basename>.test.js)')
    .option('-v, --verbose', 'log progress messages')
    .action((yamlfile, options) => {
        yamlfile = fileEasy.setDefaultExtension(yamlfile, '.yaml')     
        testfile = getTestfileName(yamlfile, options);
        
        let items = yamljs.load(yamlfile);
        fileEasy.saveDocument(testfile, createSuite(items))
    })

program.parse()

/**
 * Creates filename for test file
 *
 * @param {string} yamlfile input yaml filename
 * @param {Object} options object with options passed on command line.
 * @return {string} testfile filename
 */
function getTestfileName(yamlfile, options) {
    testfile = options.testfile || path.basename(yamlfile, path.extname(yamlfile))
    testfile = path.join(path.dirname(yamlfile), testfile)

    let r = /\.tests?\.[jt]s$/;
    if (!r.test(testfile)) {
        testfile += `.test.js`
    }

    let r1 = /\.[jt]s$/
    if (!r1.test(testfile)) {
        testfile += `.js`    
    }

    return testfile;
}
