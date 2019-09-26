<div align="center">
	<img height=125 src="./assets/logo.jpg">
  <h1>
		BlueBase CLI Expo
	</h1>
  <p>🤖 BlueBase CLI plugin to build expo apps.</p>
</div>

<hr />

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-expo.svg)](https://npmjs.org/package/@bluebase/cli-expo)

# Table of Contents

<!-- toc -->
* [Table of Contents](#table-of-contents)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @bluebase/cli-expo
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli-expo/0.0.28 darwin-x64 node-v12.10.0
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`bluebase expo:build`](#bluebase-expobuild)
* [`bluebase expo:build:android`](#bluebase-expobuildandroid)
* [`bluebase expo:build:ios`](#bluebase-expobuildios)
* [`bluebase expo:init`](#bluebase-expoinit)
* [`bluebase expo:start`](#bluebase-expostart)

## `bluebase expo:build`

creates a expo build directory with app.json file

```
USAGE
  $ bluebase expo:build

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase expo:build
```

_See code: [src/commands/expo/build.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.28/src/commands/expo/build.ts)_

## `bluebase expo:build:android`

creates a build for android.

```
USAGE
  $ bluebase expo:build:android

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase expo:build:android
```

_See code: [src/commands/expo/build/android.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.28/src/commands/expo/build/android.ts)_

## `bluebase expo:build:ios`

creates a build for ios.

```
USAGE
  $ bluebase expo:build:ios

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase expo:build:ios
```

_See code: [src/commands/expo/build/ios.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.28/src/commands/expo/build/ios.ts)_

## `bluebase expo:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase expo:init

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase expo:init
```

_See code: [src/commands/expo/init.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.28/src/commands/expo/init.ts)_

## `bluebase expo:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase expo:start

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/expo/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/expo] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/expo] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/expo] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase expo:start
```

_See code: [src/commands/expo/start.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.28/src/commands/expo/start.ts)_
<!-- commandsstop -->
