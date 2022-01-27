const beautify                                  = require('beautify')
const {isArray, isString, isObject, isNumber}   = require('lodash')

/**
 * Creates suite text
 *
 * @param {Array<Object|string> | Object | string} items test suite components
 * @return {string} test suite text 
 */
function createSuite(items) {
    if (isArray(items)) {
        let r = items.map(item => {
            return createSuite(item);
        }).join(``)
        return beautify(r, {format: "js"})
    }

    if (isObject(items)) {
        let key = Object.keys(items)[0]
        let r = `describe("${key}", () => {
            ${createSuite(items[key])}
        });`
        return beautify(r, {format: "js"})
    }

    if (isString(items)) {
        return beautify(createUnit(items), {format: "js"})
    }

    if (isNumber(items)) {
        return createSuite(`${items}`)
    }

    return createUnit(items)
}

/**
 * Creates test unit placeholder
 *
 * @param {string} [item=''] test unit description
 * @return {string} test unit text
 */
function createUnit(item = '') {
    if (isString(item))
        return beautify(`it.todo("${item}");`, {format: "js"});

    if (isNumber(item))
        return createUnit(`${item}`)

    return createSuite(item)
}

module.exports = {
    createSuite,
    createUnit,
}