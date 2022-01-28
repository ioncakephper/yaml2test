describe("yaml2jest", () => {
    describe("command", () => {
        describe("build (default command)", () => {
            describe("when yamlfile is", () => {
                describe("specified", () => {
                    it.todo("applies .yaml default extension");
                    it.todo("uses yamlfile basename and path as testfile basename and applies default test file sufix");
                    describe("and testfile specified", () => {
                        it.todo("applies .test.js when testfile has no .test.js");
                        it.todo("applies .js when testfile ends with .test");
                        it.todo("uses the testfile filename");
                    });
                });
                describe("unspecified", () => {
                    it.todo("sends error message (yamlfile required)");
                });
            });
        });
        describe("init", () => {
            it.todo("tests needed");
        });
    });
});