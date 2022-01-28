const beautify                                  = require('beautify')
const {isArray, isString, isObject, isNumber}   = require('lodash')

/**
 * Creates suite text
 *
 * @param {Array<Object|string> | Object | string} items test suite components
 * @return {string} test suite text 
 */
function createSuite(items, settings) {
    settings = {
        ...{placeholder: "it.todo"},
        ...settings,
    }
    if (isArray(items)) {
        let r = items.map(item => {
            return createSuite(item, settings);
        }).join(``)
        return beautify(r, {format: "js"})
    }

    if (isObject(items)) {
        let key = Object.keys(items)[0]
        let r = `describe("${key}", () => {
            ${createSuite(items[key], settings)}
        });`
        return beautify(r, {format: "js"})
    }

    if (isString(items)) {
        return beautify(createUnit(items, settings), {format: "js"})
    }

    if (isNumber(items)) {
        return createSuite(`${items}`, settings)
    }

    return createUnit(items, settings)
}

/**
 * Creates test unit placeholder
 *
 * @param {string} [item=''] test unit description
 * @return {string} test unit text
 */
function createUnit(item = '', settings) {
    settings = {
        ...{placeholder: "it.todo"},
        ...settings
    }
    let placeholder = settings.placeholder;
    if (isString(item))
        return beautify(`${placeholder}("${item}");`, {format: "js"});

    if (isNumber(item))
        return createUnit(`${item}`, settings)

    return createSuite(item, settings)
}

module.exports = {
    createSuite,
    createUnit,
}