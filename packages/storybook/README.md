@bluebase/cli-storybook
===============================

An Web plugin for BlueRain CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-storybook.svg)](https://npmjs.org/package/@bluebase/cli-storybook)

[![CircleCI](https://circleci.com/gh/BlueBaseJS/cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueBaseJS/cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueBaseJS/cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueBaseJS/cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueBaseJS/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueBaseJS/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@bluebase/cli-storybook.svg)](https://npmjs.org/package/@bluebase/cli-storybook)
[![License](https://img.shields.io/npm/l/@bluebase/cli-storybook.svg)](https://github.com/BlueBaseJS/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @bluebase/cli-storybook
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli-storybook/0.0.3 darwin-x64 node-v11.4.0
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bluebase storybook:init`](#bluebase-storybookinit)
* [`bluebase storybook:start`](#bluebase-storybookstart)

## `bluebase storybook:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase storybook:init

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook:init
```

_See code: [lib/commands/storybook/init.js](https://github.com/BlueBaseJS/cli/blob/v0.0.3/lib/commands/storybook/init.js)_

## `bluebase storybook:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook:start
```

_See code: [lib/commands/storybook/start.js](https://github.com/BlueBaseJS/cli/blob/v0.0.3/lib/commands/storybook/start.js)_
<!-- commandsstop -->
