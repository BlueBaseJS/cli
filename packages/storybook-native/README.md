<div align="center">
	<img width=150 height=150 src="../../assets/logo.png">
  <h1>
		BlueRain CLI - Storybook Native
	</h1>
  <p>📱 Brings BlueRain projects to Storybooks on React Native.</p>
</div>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@blueeast/bluerain-cli-storybook-native.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-storybook-native)

[![CircleCI](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueEastCode/bluerain-cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueEastCode/bluerain-cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueEastCode/bluerain-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueEastCode/bluerain-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@blueeast/bluerain-cli-storybook-native.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-storybook-native)
[![License](https://img.shields.io/npm/l/@blueeast/bluerain-cli-storybook-native.svg)](https://github.com/BlueEastCode/bluerain-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
```sh-session
$ yarn add @blueeast/bluerain-cli
$ bluerain plugins:install @blueeast/bluerain-cli-storybook-native
```
# Commands
<!-- commands -->
* [`bluebase storybook-native:init`](#bluebase-storybook-nativeinit)
* [`bluebase storybook-native:start`](#bluebase-storybook-nativestart)
* [`bluebase storybook-native:start:expo`](#bluebase-storybook-nativestartexpo)
* [`bluebase storybook-native:start:server`](#bluebase-storybook-nativestartserver)

## `bluebase storybook-native:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase storybook-native:init

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook-native:start
```

_See code: [lib/commands/storybook-native/init.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/storybook-native/init.js)_

## `bluebase storybook-native:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook-native:start

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook-native:start
```

_See code: [lib/commands/storybook-native/start.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/storybook-native/start.js)_

## `bluebase storybook-native:start:expo`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook-native:start:expo

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:start
```

_See code: [lib/commands/storybook-native/start/expo.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/storybook-native/start/expo.js)_

## `bluebase storybook-native:start:server`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook-native:start:server

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:start
```

_See code: [lib/commands/storybook-native/start/server.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/storybook-native/start/server.js)_
<!-- commandsstop -->
