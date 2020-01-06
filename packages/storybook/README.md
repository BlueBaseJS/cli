<div align="center">
	<img height=125 src="./assets/logo.jpg">
  <h1>
		BlueBase CLI Storybook
	</h1>
  <p>🤖 BlueBase CLI plugin to create Storybook projects.</p>
</div>

<hr /> 

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-storybook.svg)](https://npmjs.org/package/@bluebase/cli-storybook)

# Table of Contents 

<!-- toc -->
* [Table of Contents](#table-of-contents)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @bluebase/cli-storybook
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli-storybook/1.2.3 linux-x64 node-v12.14.0
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`bluebase storybook:init`](#bluebase-storybookinit)
* [`bluebase storybook:start`](#bluebase-storybookstart)

## `bluebase storybook:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase storybook:init

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook:init
```

_See code: [lib/commands/storybook/init.js](https://github.com/BlueBaseJS/cli/blob/v1.2.3/lib/commands/storybook/init.js)_

## `bluebase storybook:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase storybook:start
```

_See code: [lib/commands/storybook/start.js](https://github.com/BlueBaseJS/cli/blob/v1.2.3/lib/commands/storybook/start.js)_
<!-- commandsstop -->
