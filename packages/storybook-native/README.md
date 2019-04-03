@bluebase/cli-storybook-native
===============================

An Web plugin for BlueRain CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-storybook-native.svg)](https://npmjs.org/package/@bluebase/cli-storybook-native)

[![CircleCI](https://circleci.com/gh/BlueBaseJS/cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueBaseJS/cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueBaseJS/cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueBaseJS/cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueBaseJS/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueBaseJS/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@bluebase/cli-storybook-native.svg)](https://npmjs.org/package/@bluebase/cli-storybook-native)
[![License](https://img.shields.io/npm/l/@bluebase/cli-storybook-native.svg)](https://github.com/BlueBaseJS/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @bluebase/cli-storybook-native
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli-storybook-native/0.0.7 darwin-x64 node-v11.4.0
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bluebase storybook-native:init`](#bluebase-storybook-nativeinit)
* [`bluebase storybook-native:start`](#bluebase-storybook-nativestart)

## `bluebase storybook-native:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase storybook-native:init

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook-native:start
```

_See code: [lib/commands/storybook-native/init.js](https://github.com/BlueBaseJS/cli/blob/v0.0.7/lib/commands/storybook-native/init.js)_

## `bluebase storybook-native:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook-native:start

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook-native:start
```

_See code: [lib/commands/storybook-native/start.js](https://github.com/BlueBaseJS/cli/blob/v0.0.7/lib/commands/storybook-native/start.js)_
<!-- commandsstop -->
