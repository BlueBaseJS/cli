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
$ npm install -g @bluebase/cli
$ bluebase COMMAND
running command...
$ bluebase (-v|--version|version)
@bluebase/cli/2.0.0 linux-x64 node-v10.13.0
$ bluebase --help [COMMAND]
USAGE
  $ bluebase COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bluebase help [COMMAND]`](#bluebase-help-command)
* [`bluebase plugins`](#bluebase-plugins)
* [`bluebase plugins:install PLUGIN...`](#bluebase-pluginsinstall-plugin)
* [`bluebase plugins:link PLUGIN`](#bluebase-pluginslink-plugin)
* [`bluebase plugins:uninstall PLUGIN...`](#bluebase-pluginsuninstall-plugin)
* [`bluebase plugins:update`](#bluebase-pluginsupdate)

## `bluebase help [COMMAND]`

display help for bluebase

```
USAGE
  $ bluebase help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `bluebase plugins`

list installed plugins

```
USAGE
  $ bluebase plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ bluebase plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.3/src/commands/plugins/index.ts)_

## `bluebase plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ bluebase plugins:install PLUGIN...

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
  $ bluebase plugins:add

EXAMPLES
  $ bluebase plugins:install myplugin 
  $ bluebase plugins:install https://github.com/someuser/someplugin
  $ bluebase plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.3/src/commands/plugins/install.ts)_

## `bluebase plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ bluebase plugins:link PLUGIN

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
  $ bluebase plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.3/src/commands/plugins/link.ts)_

## `bluebase plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ bluebase plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ bluebase plugins:unlink
  $ bluebase plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.3/src/commands/plugins/uninstall.ts)_

## `bluebase plugins:update`

update installed plugins

```
USAGE
  $ bluebase plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.3/src/commands/plugins/update.ts)_
<!-- commandsstop -->
