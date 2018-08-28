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
* [`bluerain storybook:init`](#bluerain-storybookinit)
* [`bluerain storybook:start`](#bluerain-storybookstart)

## `bluerain storybook:init`

Initializes a directory with an example project.

```
USAGE
  $ bluerain storybook:init

OPTIONS
  --buildDir=buildDir    [default: ./build/storybook] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook:init
```

_See code: [src/commands/storybook/init.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.1/src/commands/storybook/init.ts)_

## `bluerain storybook:start`

Starts or restarts a local server for your app and gives you a URL to it.

```
USAGE
  $ bluerain storybook:start

OPTIONS
  --buildDir=buildDir    [default: ./build/storybook] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluerain/storybook] Path to config directory relative to the root directory

EXAMPLE
  $ bluerain storybook:start
```

_See code: [src/commands/storybook/start.ts](https://github.com/BlueEastCode/bluerain-cli/blob/v2.0.0-beta.1/src/commands/storybook/start.ts)_
<!-- commandsstop -->
