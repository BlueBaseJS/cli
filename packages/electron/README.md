<div align="center">
	<img height=125 src="./assets/logo.jpg">
  <h1>
		BlueBase CLI Electron
	</h1>
  <p>🤖 BlueBase CLI plugin to build electron apps.</p>
</div>

<hr />

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-electron.svg)](https://npmjs.org/package/@bluebase/cli-electron)

# Table of Contents

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @bluebase/cli-electron
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@bluebase/cli-electron/0.0.5 darwin-x64 node-v11.4.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`oclif-example electron:init`](#oclif-example-electroninit)
- [`oclif-example electron:start`](#oclif-example-electronstart)

## `oclif-example electron:init`

Initializes a directory with an example project.

```
USAGE
  $ oclif-example electron:init

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/electron] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/electron] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/electron] Path to config directory relative to the root directory

EXAMPLE
  $ bluebase electron:init
```

_See code: [src/commands/electron/init.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.5/src/commands/electron/init.ts)_

## `oclif-example electron:start`

```
USAGE
  $ oclif-example electron:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/electron] Path to assets directory relative to the root directory
  --buildDir=buildDir    [default: ./build/electron] Path to build directory relative to the root directory
  --configDir=configDir  [default: ./bluebase/electron] Path to config directory relative to the root directory
```

_See code: [src/commands/electron/start.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.5/src/commands/electron/start.ts)_

<!-- commandsstop -->
