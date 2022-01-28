# yaml2test

Create jest-compatible tests from YAML notation.

[![DeepScan grade](https://deepscan.io/api/teams/15501/projects/20018/branches/531871/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=15501&pid=20018&bid=531871)

## Install

Use `npm` and install with `-g` switch to have the `yaml2jest` CLI.

```shell-session
npm i -g yaml2test
```

## Usage

Create `app-tests.yaml` as follows:

```yaml
- my application:
  - can:
    - create files and folders
    - read data from .csv files
  - should:
    - work as cli
    - work as an importable package
- tests for my application:
  - should be:
    - easy to read
    - error free
```

### CLI

Get help:

```shell-session
yaml2jest -h
```

```txt
Usage: yaml2jest [options] [command]

Create tests from YAML notation

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  build [options] <yamlfile>  build tests in a test file (default command)
  init [configname]           create settings file
  help [command]              display help for command

```

Get help of `build` -- `yaml2jest`'s defauld sub-command:

```shell-session
yaml2jest help build
```

```txt
Usage: yaml2jest build [options] <yamlfile>

build tests in a test file (default command)

Options:
  -o, --output <testfile>  fullpath to test file to create (default: <yamlfile-basename>.test.js)
  -c, --config <filename>  configuration filename (default: "yaml2jest.json")
  -h, --help               display help for command
```

**Example 1**: Create test file from `.yaml` file:

```shell-session
yaml2jest app-tests
```

> use `app-tests.yaml` file as source and generate `app-tests.test.js` file, which is a `jest` compatible test file.

Generated `app-tests.test.js` will look as follows:

```js
describe("my application", () => {
    describe("can", () => {
        it.todo("create files and folders");
        it.todo("read data from .csv files");
    });
    describe("should", () => {
        it.todo("work as cli");
        it.todo("work as an importable package");
    });
});
describe("tests for my application", () => {
    describe("should be", () => {
        it.todo("easy to read");
        it.todo("error free");
    });
});
```

**Example 2**: Specify an output file (path and name of test file to generate)

```shell-session
yaml2jest app-tests -o my-app
```

> use `app-tests.yaml` file as source and generate the output file `my-app.app.test.js`

### Code

Use the `app-tests.yaml` as described for CLI.

```js
const {createSuite} = 'yaml2test`;
const yamljs = require('yamljs');

let items = yamljs.load('app-tests.yaml');
let code = createSuite(items);
console.log(code);
```
