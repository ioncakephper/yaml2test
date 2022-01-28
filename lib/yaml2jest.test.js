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
        expect(result).toBe("it.todo(\"12\");\nit.todo(\"123\");\ndescribe(\"undefined\", () => {\n    it.todo(\"\");\n});")
    })

    test("creates a suite when passed an empty object", () => {
        let result = yaml2jest.createUnit({}, { placeholder: "it.todo" })
        expect(result).toBe("describe(\"undefined\", () => {\n    it.todo(\"\");\n});")
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
        expect(result).toBe("it.todo(\"\");")
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
        expect(result).toBe("it.todo(\"64\");\nit.todo(\"0\");\nit.todo(\"0\");\nit.todo(\"0\");")
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
})
