@blueeast/bluerain-cli-web
==========================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@blueeast/bluerain-cli-web.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-web)

[![CircleCI](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueEastCode/bluerain-cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueEastCode/bluerain-cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueEastCode/bluerain-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueEastCode/bluerain-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@blueeast/bluerain-cli-web.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-web)
[![License](https://img.shields.io/npm/l/@blueeast/bluerain-cli-web.svg)](https://github.com/BlueEastCode/bluerain-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @bluebase/cli-web
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli-web/2.0.0 linux-x64 node-v10.13.0
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bluebase web [FILE]`](#bluebase-web-file)
* [`bluebase web:build`](#bluebase-webbuild)
* [`bluebase web:init`](#bluebase-webinit)

## `bluebase web [FILE]`

describe the command here

```
USAGE
  $ bluebase web [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ oclif-example hello
  		hello world from ./src/hello.ts!
```

_See code: [src/commands/web.ts](https://github.com/BlueBaseJS/cli/blob/v2.0.0/src/commands/web.ts)_

## `bluebase web:build`

```
USAGE
  $ bluebase web:build

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/web/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/web] Path to config directory relative to the root directory
```

_See code: [src/commands/web/build.ts](https://github.com/BlueBaseJS/cli/blob/v2.0.0/src/commands/web/build.ts)_

## `bluebase web:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase web:init

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/web/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/web] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain web:init
```

_See code: [src/commands/web/init.ts](https://github.com/BlueBaseJS/cli/blob/v2.0.0/src/commands/web/init.ts)_
<!-- commandsstop -->
