@blueeast/bluerain-cli
======================

CLI tool to make life with BlueRain easier!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@blueeast/bluerain-cli.svg)](https://npmjs.org/package/@blueeast/bluerain-cli)

[![CircleCI](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master.svg?style=shield)](https://circleci.com/gh/BlueEastCode/bluerain-cli/tree/master)

[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/BlueEastCode/bluerain-cli?branch=master&svg=true)](https://ci.appveyor.com/project/BlueEastCode/bluerain-cli/branch/master)
[![Codecov](https://codecov.io/gh/BlueEastCode/bluerain-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueEastCode/bluerain-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@blueeast/bluerain-cli.svg)](https://npmjs.org/package/@blueeast/bluerain-cli)
[![License](https://img.shields.io/npm/l/@blueeast/bluerain-cli.svg)](https://github.com/BlueEastCode/bluerain-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @blueeast/bluerain-cli
$ bluerain COMMAND
running command...
$ bluerain (-v|--version|version)
@blueeast/bluerain-cli/4.0.0-beta.1 darwin-x64 node-v10.8.0
$ bluerain --help [COMMAND]
USAGE
  $ bluerain COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bluerain help [COMMAND]`](#bluerain-help-command)
* [`bluerain plugins`](#bluerain-plugins)
* [`bluerain plugins:install PLUGIN...`](#bluerain-pluginsinstall-plugin)
* [`bluerain plugins:link PLUGIN`](#bluerain-pluginslink-plugin)
* [`bluerain plugins:uninstall PLUGIN...`](#bluerain-pluginsuninstall-plugin)
* [`bluerain plugins:update`](#bluerain-pluginsupdate)

## `bluerain help [COMMAND]`

display help for bluerain

```
USAGE
  $ bluerain help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.0.5/src/commands/help.ts)_

## `bluerain plugins`

list installed plugins

```
USAGE
  $ bluerain plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ bluerain plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.5.4/src/commands/plugins/index.ts)_

## `bluerain plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ bluerain plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ bluerain plugins:add

EXAMPLES
  $ bluerain plugins:install myplugin 
  $ bluerain plugins:install https://github.com/someuser/someplugin
  $ bluerain plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.5.4/src/commands/plugins/install.ts)_

## `bluerain plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ bluerain plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ bluerain plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.5.4/src/commands/plugins/link.ts)_

## `bluerain plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ bluerain plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ bluerain plugins:unlink
  $ bluerain plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.5.4/src/commands/plugins/uninstall.ts)_

## `bluerain plugins:update`

update installed plugins

```
USAGE
  $ bluerain plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.5.4/src/commands/plugins/update.ts)_
<!-- commandsstop -->
