# yaml2test

Create tests from YAML notation

[![DeepScan grade](https://deepscan.io/api/teams/15501/projects/20018/branches/531871/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=15501&pid=20018&bid=531871)

## Install

Use `npm` and install with `-g` switch to have the `yaml2jest` CLI.

```bash
npm i -g yaml2test
```

## Usage

### CLI

Get help:

```bash
yaml2jest -h
```

Create test file from `.yaml` file:

```bash
yaml2jest app-tests
```

> use `app-tests.yaml` file as source and generate `app-tests.test.js` file, which is a `jest` compatible test file.

