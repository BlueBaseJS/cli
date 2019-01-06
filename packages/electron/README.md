@blueeast/bluerain-cli-electron
===============================

An Electron plugin for BlueRain CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@blueeast/bluerain-cli-electron.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-electron)

[![CircleCI](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueEastCode/bluerain-cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueEastCode/bluerain-cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueEastCode/bluerain-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueEastCode/bluerain-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@blueeast/bluerain-cli-electron.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-electron)
[![License](https://img.shields.io/npm/l/@blueeast/bluerain-cli-electron.svg)](https://github.com/BlueEastCode/bluerain-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @bluebase/cli-electron
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@bluebase/cli-electron/0.0.5 darwin-x64 node-v11.4.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example electron:init`](#oclif-example-electroninit)
* [`oclif-example electron:start`](#oclif-example-electronstart)

## `oclif-example electron:init`

Initializes a directory with an example project.

```
USAGE
  $ oclif-example electron:init

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/electron] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/electron] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/electron] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase electron:init
```

_See code: [src/commands/electron/init.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.5/src/commands/electron/init.ts)_

## `oclif-example electron:start`

```
USAGE
  $ oclif-example electron:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/electron] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/electron] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/electron] Path to config directory relative to the root directory
```

_See code: [src/commands/electron/start.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.5/src/commands/electron/start.ts)_
<!-- commandsstop -->
