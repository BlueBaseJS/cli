<div align="center">
	<img height=125 src="./assets/logo.jpg">
  <h1>
		BlueBase CLI Storybook Native
	</h1>
  <p>🤖 BlueBase CLI plugin to create React Native Storybook.</p>
</div>

<hr />  

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-storybook-native.svg)](https://npmjs.org/package/@bluebase/cli-storybook-native)

# Table of Contents 

<!-- toc -->
* [Table of Contents](#table-of-contents)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @bluebase/cli-storybook-native
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli-storybook-native/1.4.0 linux-x64 node-v12.18.3
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`bluebase storybook-native:init`](#bluebase-storybook-nativeinit)
* [`bluebase storybook-native:start`](#bluebase-storybook-nativestart)

## `bluebase storybook-native:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase storybook-native:init

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook-native:start
```

## `bluebase storybook-native:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook-native:start

OPTIONS
  --appJsPath=appJsPath  [default: ./bluebase/storybook-native/App] Path to App.js file relative to the root directory
  --assetsDir=assetsDir  [default: ./assets/storybook-native] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook-native] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook-native] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook-native:start
```
<!-- commandsstop -->
