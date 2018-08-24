@blueeast/bluerain-cli-expo
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
boo
<!-- usage -->
```sh-session
$ npm install -g @blueeast/bluerain-cli-expo
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@blueeast/bluerain-cli-expo/2.0.0-aplha.7 darwin-x64 node-v10.8.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example expo ACTION`](#oclif-example-expo-action)

## `oclif-example expo ACTION`

Brings BlueRain projects to expo platform

```
USAGE
  $ oclif-example expo ACTION

OPTIONS
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo start
```

_See code: [src/commands/expo.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-aplha.7/src/commands/expo.ts)_
<!-- commandsstop -->
