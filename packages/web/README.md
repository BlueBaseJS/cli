@bluebase/cli-web
===============================

An Web plugin for BlueRain CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-web.svg)](https://npmjs.org/package/@bluebase/cli-web)

[![CircleCI](https://circleci.com/gh/BlueBaseJS/cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueBaseJS/cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueBaseJS/cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueBaseJS/cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueBaseJS/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueBaseJS/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@bluebase/cli-web.svg)](https://npmjs.org/package/@bluebase/cli-web)
[![License](https://img.shields.io/npm/l/@bluebase/cli-web.svg)](https://github.com/BlueBaseJS/cli/blob/master/package.json)

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
@bluebase/cli-web/0.0.1 darwin-x64 node-v11.4.0
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
* [`bluebase web:start`](#bluebase-webstart)

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

_See code: [src/commands/web.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.1/src/commands/web.ts)_

## `bluebase web:build`

```
USAGE
  $ bluebase web:build

OPTIONS
  --appJsPath=appJsPath                              [default: ./bluebase/web/App] Path to App.js file relative to the
                                                     root directory

  --assetsDir=assetsDir                              [default: ./assets/web] Path to assets directory relative to the
                                                     root directory

  --buildDir=buildDir                                [default: ./build/web] Path to build directory relative to the root
                                                     directory

  --configDir=configDir                              [default: ./bluebase/web] Path to config directory relative to the
                                                     root directory

  --webpackClientConfigPath=webpackClientConfigPath  [default: ./bluebase/web/client-webpack-config.ts] Path to
                                                     webpackClientConfigPath file relative to the root directory

  --webpackServerConfigPath=webpackServerConfigPath  [default: ./bluebase/web/server-webpack-config.ts] Path to
                                                     webpackServerConfigPath file relative to the root directory
```

_See code: [src/commands/web/build.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.1/src/commands/web/build.ts)_

## `bluebase web:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase web:init

OPTIONS
  --appJsPath=appJsPath                              [default: ./bluebase/web/App] Path to App.js file relative to the
                                                     root directory

  --assetsDir=assetsDir                              [default: ./assets/web] Path to assets directory relative to the
                                                     root directory

  --buildDir=buildDir                                [default: ./build/web] Path to build directory relative to the root
                                                     directory

  --configDir=configDir                              [default: ./bluebase/web] Path to config directory relative to the
                                                     root directory

  --webpackClientConfigPath=webpackClientConfigPath  [default: ./bluebase/web/client-webpack-config.ts] Path to
                                                     webpackClientConfigPath file relative to the root directory

  --webpackServerConfigPath=webpackServerConfigPath  [default: ./bluebase/web/server-webpack-config.ts] Path to
                                                     webpackServerConfigPath file relative to the root directory

EXAMPLE
  $ bluebase web:init
```

_See code: [src/commands/web/init.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.1/src/commands/web/init.ts)_

## `bluebase web:start`

```
USAGE
  $ bluebase web:start

OPTIONS
  --appJsPath=appJsPath                              [default: ./bluebase/web/App] Path to App.js file relative to the
                                                     root directory

  --assetsDir=assetsDir                              [default: ./assets/web] Path to assets directory relative to the
                                                     root directory

  --buildDir=buildDir                                [default: ./build/web] Path to build directory relative to the root
                                                     directory

  --configDir=configDir                              [default: ./bluebase/web] Path to config directory relative to the
                                                     root directory

  --webpackClientConfigPath=webpackClientConfigPath  [default: ./bluebase/web/client-webpack-config.ts] Path to
                                                     webpackClientConfigPath file relative to the root directory

  --webpackServerConfigPath=webpackServerConfigPath  [default: ./bluebase/web/server-webpack-config.ts] Path to
                                                     webpackServerConfigPath file relative to the root directory
```

_See code: [src/commands/web/start.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.1/src/commands/web/start.ts)_
<!-- commandsstop -->
