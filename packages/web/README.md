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
$ npm install -g @blueeast/bluerain-cli-web
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@blueeast/bluerain-cli-web/2.0.0-beta.6 darwin-x64 node-v10.8.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example web [FILE]`](#oclif-example-web-file)
* [`oclif-example web:build`](#oclif-example-webbuild)
* [`oclif-example web:init`](#oclif-example-webinit)
* [`oclif-example web:start`](#oclif-example-webstart)

## `oclif-example web [FILE]`

describe the command here

```
USAGE
  $ oclif-example web [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ oclif-example hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/web.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.6/src/commands/web.ts)_

## `oclif-example web:build`

```
USAGE
  $ oclif-example web:build

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/web] Path to config directory relative to the root directory
```

_See code: [src/commands/web/build.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.6/src/commands/web/build.ts)_

## `oclif-example web:init`

Initializes a directory with an example project.

```
USAGE
  $ oclif-example web:init

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/web] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain web:init
```

_See code: [src/commands/web/init.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.6/src/commands/web/init.ts)_

## `oclif-example web:start`

```
USAGE
  $ oclif-example web:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/web] Path to config directory relative to the root directory
```

_See code: [src/commands/web/start.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.6/src/commands/web/start.ts)_
<!-- commandsstop -->
