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
* [`bluerain storybook-native:init`](#bluerain-storybook-nativeinit)
* [`bluerain storybook-native:start`](#bluerain-storybook-nativestart)
* [`bluerain storybook-native:start:expo`](#bluerain-storybook-nativestartexpo)
* [`bluerain storybook-native:start:server`](#bluerain-storybook-nativestartserver)

## `bluerain storybook-native:init`

Initializes a directory with an example project.

```
USAGE
  $ bluerain storybook-native:init

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook-native:start
```

_See code: [src/commands/storybook-native/init.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.8/src/commands/storybook-native/init.ts)_

## `bluerain storybook-native:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluerain storybook-native:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook-native:start
```

_See code: [src/commands/storybook-native/start.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.8/src/commands/storybook-native/start.ts)_

## `bluerain storybook-native:start:expo`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluerain storybook-native:start:expo

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:start
```

_See code: [src/commands/storybook-native/start/expo.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.8/src/commands/storybook-native/start/expo.ts)_

## `bluerain storybook-native:start:server`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluerain storybook-native:start:server

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain expo:start
```

_See code: [src/commands/storybook-native/start/server.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.8/src/commands/storybook-native/start/server.ts)_
<!-- commandsstop -->
