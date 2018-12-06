<div align="center">
	<img width=150 height=150 src="../../assets/logo.png">
  <h1>
		BlueRain CLI - Storybook Native
	</h1>
  <p>📱 Brings BlueRain projects to Storybooks on React Native.</p>
</div>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@blueeast/bluerain-cli-storybook.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-storybook)

[![CircleCI](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueEastCode/bluerain-cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueEastCode/bluerain-cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueEastCode/bluerain-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueEastCode/bluerain-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@blueeast/bluerain-cli-storybook.svg)](https://npmjs.org/package/@blueeast/bluerain-cli-storybook)
[![License](https://img.shields.io/npm/l/@blueeast/bluerain-cli-storybook.svg)](https://github.com/BlueEastCode/bluerain-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
```sh-session
$ yarn add @blueeast/bluerain-cli
$ bluerain plugins:install @blueeast/bluerain-cli-storybook
```
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
  --configDir=configDir  [default: ./bluerain/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook:init
```

_See code: [lib/commands/storybook/init.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/storybook/init.js)_

## `bluebase storybook:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluebase storybook:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/storybook] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/storybook] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook:start
```

_See code: [lib/commands/storybook/start.js](https://github.com/BlueBaseJS/cli/blob/v2.0.0/lib/commands/storybook/start.js)_
<!-- commandsstop -->
