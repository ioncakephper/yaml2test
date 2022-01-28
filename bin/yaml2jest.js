#!/usr/bin/env node

const program = require('commander')
const fileEasy = require('file-easy')
const path = require('path')
const yamljs = require('yamljs')
const fs = require('fs')

const { createSuite } = require('../lib/yaml2jest')

let defaultSettings = {
    placeholder: "it.todo",
}

let p = require('../package.json')
program
    .name('yaml2jest')
    .description(p.description)
    .version(p.version)

program
    .command('build', { isDefault: true })
    .description('build tests in a test file (default command)')
    .arguments('<yamlfile>')
    .option('-o, --output <testfile>', 'fullpath to test file to create (default: <yamlfile-basename>.test.js)')
    .option('-c, --config <filename>', 'configuration filename', 'yaml2jest.json')
    .action((yamlfile, options) => {
        let settings = loadSettings(options)
        yamlfile = fileEasy.setDefaultExtension(yamlfile, '.yaml')
        testfile = getTestfileName(yamlfile, options);

        let items = yamljs.load(yamlfile);
        fileEasy.saveDocument(testfile, createSuite(items, settings))
    })

program
    .command('init')
    .description('create settings file')
    .arguments('[configname]')
    .action((configname) => {
        configname = configname || 'yaml2jest.json';
        configname = fileEasy.setDefaultExtension(configname, '.json')
        fileEasy.saveDocument(configname, JSON.stringify(defaultSettings, null, 4))
    })

program.parse()

/**
 * Loads settings from specified configuration in options.config
 *
 * @param {object} options command line options as key/value pairs
 * @return {object} key/value object storing configuration settings 
 */
function loadSettings(options) {
    let settingsFilename = options.config;
    settingsFilename = fileEasy.setDefaultExtension(settingsFilename, '.json');
    let settings = defaultSettings;

    if (fs.existsSync(settingsFilename)) {
        settings = {
            ...defaultSettings,
            ...JSON.parse(fs.readFileSync(settingsFilename, "utf-8")),
        }
    }

    return settings;
}

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
