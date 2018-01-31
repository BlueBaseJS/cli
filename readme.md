# bluerain-cli

bluerain-cli is used to start, build bluerain projects for web, electron and react-native.

## Installation

Install cli globally.

```bash
npm install -g @blueeast/bluerain-cli
```

## Usage

```bash
bluerain
```

bluerain command will start the wizard, which will have three option run, build, create and these option will have futher platform options.

## Help

```bash
bluerain --help
```

It shows the available commands and there description.

## Custom Webpack Config

Custom webpack configuration can be added in extend and full control mode.

### Custom Webpack Config Location

* For web webpack config file will be placed at `web/webpack.config.js` to add or extend webpack configuration.
* For electron webpack config file will be placed at `electron/webpack.config.js` to add or extend webpack configuration.

### Default mode

The default Webpack config of bluerain is balanced for a medium-size project or a library. But if you already have your own Webpack setup, that's not useable.

That's why we allow you to customize our Webpack setup by providing a `webpack.config.js` file exporting a **webpack 3** compatible config.

There are a few ways to do it:

### Extend Mode

You'll get _extend-mode_ by returning an object.

Let's say you want to add [SASS](http://sass-lang.com/) support to bluerain project. This is how to do it.
Simply add the following content to a file called `webpack.config.js` in the above described directory for web and electron.

```JavaScript
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}
```

Since this config file stays in the bluerain-cli directory, you need to set the include path as above. If the config directory stays in a different directory, you need to set the include path relative to that.

You also need to install the loaders (style, css, and sass) used in above config manually.

### Webpack Options

You can add any kind of Webpack configuration options with the above config, whether they are plugins, loaders, or aliases.

For the advanced usage we strongly recommend [full control mode](#full-control-mode).

### Full Control Mode

Sometimes, you will want to have full control over the webpack configuration.
Maybe you want to add different configurations for dev and production environments.
That's where you can use our full control mode.

To enable that, you need to export a **function** from the above `webpack.config.js` file, just like this:

```js
const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = (baseConfig, configType) => {
	// configType has a value of 'development' or 'production'
	// You can change the configuration based on that.
	// 'production' is used when building the bluerain project.

	// Make whatever fine-grained changes you need
	baseConfig.module.rules.push({
		test: /\.scss$/,
		loaders: ["style-loader", "css-loader", "sass-loader"],
		include: path.resolve(__dirname, "../")
	});

	// Return the altered config
	return baseConfig;
};
```

Storybook uses the config returned from the above function. So, try to edit the `baseConfig` with care. Make sure to preserve the following config options:

* entry
* output
* first loader in the module.loaders (Babel loader for JS)
* all existing plugins

> If your custom webpack config uses a loader that does not explicitly include specific file extensions via the `test` property, it is necessary to `exclude` the `.ejs` file extension from that loader.

## Commands

Following are bluerain-cli commands:

### run

`bluerain run` command is used to run the bluerain project in development mode. We have to enter the platform we want to run the bluerain project.

| Platform                | Description                                                                                                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bluerain run web`      | Runs the bluerain project for web in development mode. First a webmanifest file is created for pwa from the config of `bluerain.js` file and then [webpack](https://webpack.js.org/) is started in dev mode.                 |
| `bluerain run electron` | Runs the bluerain project for [electron](https://electronjs.org/) in development mode.A desktop application is started with the [webpack](https://webpack.js.org/) server and [electron](https://electronjs.org/).           |
| `bluerain run android`  | Runs the bluerain project for android in development mode using [expo](https://expo.io/). First a `exp.json` file is created for expo from the config of `bluerain.js` file and `exp start` command is executed in dev mode. |
| `bluerain run ios`      | Runs the bluerain project for ios in development mode using [expo](https://expo.io/). First a `exp.json` file is created for expo from the config of `bluerain.js` file and `exp start` command is executed in dev mode.     |

### build

`bluerain build` command is used to build the bluerain project in production mode. We have to enter the platform we want to build the bluerain project.

| Platform                 | Description                                                                                                                                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bluerain build web`     | Builds the bluerain project for web in production mode. First a webmanifest file is created for pwa from the config of `bluerain.js` file and then [webpack](https://webpack.js.org/) build is made in `web/build` directory.                              |
| `bluerain build linux`   | Builds the bluerain project for linux using [electron](https://electronjs.org/) in production mode.A build is made using [webpack](https://webpack.js.org/) and [electron-packager](https://github.com/electron-userland/electron-packager) for linux.     |
| `bluerain build macos`   | Builds the bluerain project for mac using [electron](https://electronjs.org/) in production mode.A build is made using [webpack](https://webpack.js.org/) and [electron-packager](https://github.com/electron-userland/electron-packager) for macos.       |
| `bluerain build windows` | Builds the bluerain project for windows using [electron](https://electronjs.org/) in production mode.A build is made using [webpack](https://webpack.js.org/) and [electron-packager](https://github.com/electron-userland/electron-packager) for windows. |
| `bluerain build android` | Builds the bluerain project for android in production mode using [expo](https://expo.io/). First a `exp.json` file is created for expo from the config of `bluerain.js` file and `exp build:android` command is executed.                                  |
| `bluerain build ios`     | Builds the bluerain project for ios in development mode using [expo](https://expo.io/). First a `exp.json` file is created for expo from the config of `bluerain.js` file and `exp build:ios` command is executed.                                         |

### create

`bluerain create` command is used to create the bluerain project,bluerain plugin or bluerain app.

| Option                    | Description                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bluerain create project` | Create the bluerain project to use for different platforms, `bluerain.js` file is created which will contain `apps`, `plugins`, `paltform` and `config` required for booting `bluerain-os`.                        |
| `bluerain create app`     | Create the bluerain app structure which contains dummy bluerain app and `bluerain.js` file is also created which will contain `apps`, `plugins`, `paltform` and `config` required for booting `bluerain-os`.       |
| `bluerain create plugin`  | Create the bluerain plugin structure which contains dummy bluerain plugin and `bluerain.js` file is also created which will contain `apps`, `plugins`, `paltform` and `config` required for booting `bluerain-os`. |

## bluerain.js

After running `bluerain create` command `bluerain.js` file will be created, which will be:

```js
// This file contain all the apps, plugins and configuration which are required
// for booting bluerain-os. see https://blueeast.gitbooks.io/bluerain-os/
module.exports = {
    apps:[
        // All bluerain apps will also be added in this array
    ],
        plugins:[
                // All bluerain plugins will be added here
        ],
    platform:[
        // Bluerain platform will be added here
    ]
    config: {
        // Configurations for bluerain-os will be added here
        title: 'Bluerain OS',
        plugins: {
            // Plugins related configurations will be added here
        },
        theme: {
            colors:{
                primary:'#3949ab'
            }
        }
    }
};
```

Apps, plugins, platform and config will be added in this file and run/build using bluerain commands.
