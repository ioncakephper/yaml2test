const yaml2jest = require("./yaml2jest")

// @ponicode
describe("yaml2jest.createUnit", () => {
    test("creates it.todo with specified item", () => {
        let result = yaml2jest.createUnit("AOP", { placeholder: "it.todo" })
        expect(result).toBe("it.todo(\"AOP\");")
    })

    test("creates it.todo with empty message ", () => {
        let result = yaml2jest.createUnit("", { placeholder: "it.todo" })
        expect(result).toBe("it.todo(\"\");")
    })

    test("given undefined argument, it creates it.todo with empty message", () => {
        let result = yaml2jest.createUnit(undefined, { placeholder: "it.todo" })
        expect(result).toBe("it.todo(\"\");")
    })

    test("creates it.todo with number as message", () => {
        let result = yaml2jest.createUnit(12, { placeholder: "it.todo" })
        expect(result).toBe("it.todo(\"12\");")
    })

    test("create several it.todo when passed an array", () => {
        let param1 = [12, "123", [], {}]
        let result = yaml2jest.createUnit(param1, { placeholder: "it.todo" })
        expect(result).toBe("it.todo(\"123\");")
    })

    test("creates a suite when passed an empty object", () => {
        let result = yaml2jest.createUnit({}, { placeholder: "it.todo" })
        expect(result).toBe("")
    })

    test("create a suite when passed an object", () => {
        let result = yaml2jest.createUnit({ "Suite": [] }, { placeholder: "it.todo" })
        expect(result).toBe("describe(\"Suite\", () => {\n\n});")
    })
})



// @ponicode
describe("yaml2jest.createSuite", () => {
    test("creates it.todo with empty message", () => {
        let result = yaml2jest.createSuite(undefined, undefined)
        expect(result).toBe("")
    })

    test("creates it.todo with specified message", () => {
        let result = yaml2jest.createSuite("Unit", undefined)
        expect(result).toBe("it.todo(\"Unit\");")
    })

    test("creates it.tod with specified message when given an array with a string", () => {
        let result = yaml2jest.createSuite(["Unit"], undefined)
        expect(result).toBe("it.todo(\"Unit\");")
    })

    test("creates it.todo with numbers as message", () => {
        let result = yaml2jest.createSuite([64, 0, 0, 0], undefined)
        expect(result).toBe("")
    })

    test("creates a suite with a single it.todo", () => {
        let result = yaml2jest.createSuite({ "Suite": ["Unit"] }, undefined)
        expect(result).toBe("describe(\"Suite\", () => {\n    it.todo(\"Unit\");\n});")
    })

    test("creates suite with it.todos", () => {
        let result = yaml2jest.createSuite({ "Suite": ["Unit-1", "Unit-2"] }, undefined)
        expect(result).toBe("describe(\"Suite\", () => {\n    it.todo(\"Unit-1\");\n    it.todo(\"Unit-2\");\n});")
    })

    test("creates several suites", () => {
        let param1 = [{ "Suite": ["Unit-1", "Unit-2"] }]
        let result = yaml2jest.createSuite(param1, undefined)
        expect(result).toBe("describe(\"Suite\", () => {\n    it.todo(\"Unit-1\");\n    it.todo(\"Unit-2\");\n});")
    })

    test("7", () => {
        let result = yaml2jest.createSuite(["data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E"], {})
        expect(result).toBe("it.todo(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E\");\nit.todo(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E\");\nit.todo(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E\");\nit.todo(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E\");")
    })

    test("8", () => {
        let result = yaml2jest.createSuite([], {})
        expect(result).toBe("")
    })
})
