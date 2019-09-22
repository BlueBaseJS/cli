<div align="center">
	<img height=125 src="./assets/logo.jpg">
  <h1>
		BlueBase CLI Web
	</h1>
  <p>🤖 BlueBase CLI plugin to build web apps.</p>
</div>

<hr />

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bluebase/cli-web.svg)](https://npmjs.org/package/@bluebase/cli-web)

## Table of Contents

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

## Usage

<!-- usage -->

```sh-session
$ npm install -g @bluebase/cli-web
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli-web/0.0.31 darwin-x64 node-v12.10.0
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```

<!-- usagestop -->

## Commands

<!-- commands -->

- [`bluebase web:build`](#bluebase-webbuild)
- [`bluebase web:init`](#bluebase-webinit)
- [`bluebase web:start`](#bluebase-webstart)

### `bluebase web:build`

```
USAGE
  $ bluebase web:build

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the project root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the project root directory
  --configDir=configDir  [default: ./bluebase/web] Path to config directory relative to the project root directory
  --static               Create a static project.
```

_See code: [src/commands/web/build.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.31/src/commands/web/build.ts)_

### `bluebase web:init`

Initializes a directory with an example project.

```
USAGE
  $ bluebase web:init

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the project root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the project root directory
  --configDir=configDir  [default: ./bluebase/web] Path to config directory relative to the project root directory
  --static               Create a static project.

EXAMPLE
  $ bluebase web:init
```

_See code: [src/commands/web/init.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.31/src/commands/web/init.ts)_

### `bluebase web:start`

```
USAGE
  $ bluebase web:start

OPTIONS
  --assetsDir=assetsDir  [default: ./assets/web] Path to assets directory relative to the project root directory
  --buildDir=buildDir    [default: ./build/web] Path to build directory relative to the project root directory
  --configDir=configDir  [default: ./bluebase/web] Path to config directory relative to the project root directory
  --static               Create a static project.
```

_See code: [src/commands/web/start.ts](https://github.com/BlueBaseJS/cli/blob/v0.0.31/src/commands/web/start.ts)_

<!-- commandsstop -->
