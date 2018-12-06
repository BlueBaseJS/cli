<div align="center">
	<img width=150 height=150 src="../../assets/logo.png">
  <h1>
		BlueRain CLI Expo
	</h1>
  <p>📱 Brings BlueRain projects to expo platform.</p>
</div>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@blueeast/bluerain-cli-expo.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-expo)

[![CircleCI](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueEastCode/bluerain-cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueEastCode/bluerain-cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueEastCode/bluerain-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueEastCode/bluerain-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@blueeast/bluerain-cli-expo.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-expo)
[![License](https://img.shields.io/npm/l/@blueeast/bluerain-cli-expo.svg)](https://github.com/BlueEastCode/bluerain-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
```sh-session
$ yarn add @blueeast/bluerain-cli
$ bluerain plugins:install @blueeast/bluerain-cli-expo
```
# Commands
<!-- commands -->
* [`bluebase expo:build:android`](#bluebase-expobuildandroid)
* [`bluebase expo:build:ios`](#bluebase-expobuildios)
* [`bluebase expo:init`](#bluebase-expoinit)
* [`bluebase expo:start`](#bluebase-expostart)

## `bluebase expo:build:android`

creates a build for android.

```
USAGE
  $ bluebase expo:build:android

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:build:android
```

_See code: [lib/commands/expo/build/android.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/expo/build/android.js)_

## `bluebase expo:build:ios`

creates a build for ios.

```
USAGE
  $ bluebase expo:build:ios

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:build:ios
```

_See code: [lib/commands/expo/build/ios.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/expo/build/ios.js)_

## `bluebase expo:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase expo:init

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:init
```

_See code: [lib/commands/expo/init.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/expo/init.js)_

## `bluebase expo:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase expo:start

OPTIONS
  --appJsPath=appJsPath  [default: ./bluerain/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:start
```

_See code: [lib/commands/expo/start.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/expo/start.js)_
<!-- commandsstop -->
