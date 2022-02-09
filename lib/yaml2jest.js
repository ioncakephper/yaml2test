const beautify = require('beautify')
const { isArray, isString, isObject, isNumber, isEmpty } = require('lodash')

/**
 * Creates suite text
 *
 * @param {Array<Object|string> | Object | string} items test suite components
 * @return {string} test suite text 
 */
function createSuite(items, settings) {
    settings = {
        ...{ placeholder: "it.todo" },
        ...settings,
    }

    // Return the items in a string format, with a new line after each item.
    if (isEmpty(items)) {
        return ''
    }

    // Create a suite for each item in the array, and return the result.
    if (isArray(items)) {
        let r = items.map(item => {
            return createSuite(item, settings);
        }).join(``)
        return beautify(r, { format: "js" })
    }

    // Test the ${key} item's name and description against the expected values.
    if (isObject(items)) {
        let output = keys = Object.keys(items).map(key => {
            let r = `describe("${key}", () => {
            ${createSuite(items[key], settings)}
        });`
            return beautify(r, { format: "js" })
        }).join(``)
        return beautify(output, {format: 'js'})
    }

    // If items is an array, create a unit from it and beautify it.
    if (isString(items)) {
        return beautify(createUnit(items, settings), { format: "js" })
    }

    // Create a suite with the given name and settings.
    if (isNumber(items)) {
        return createSuite(`${items}`, settings)
    }

    // Create a unit from the items and settings array
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
        ...{ placeholder: "it.todo" },
        ...settings
    }
    let placeholder = settings.placeholder;
    // Return the placeholder for the item if it is a string, else return the item itself.
    if (isString(item))
        return beautify(`${placeholder}("${item}");`, { format: "js" });

    // Create a unit with the given item and settings.
    if (isNumber(item))
        return createUnit(`${item}`, settings)

    // Create a new suite for the item and settings.
    return createSuite(item, settings)
}

module.exports = {
    createSuite,
    createUnit,
}