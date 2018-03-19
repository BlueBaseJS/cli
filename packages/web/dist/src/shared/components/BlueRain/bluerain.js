'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// This file contain all the apps, plugins and configuration which are required
// for booting bluerain-os. see https://blueeast.gitbooks.io/bluerain-os/
exports.default = {
  platform: [require('@blueeast/bluerain-platform-reactxp')],
  apps: [
    // All bluerain apps will also be added in this array
  ],
  plugins: [
  // All bluerain plugins will be added here
  require('@blueeast/bluerain-plugin-react-router'), require('@blueeast/bluerain-plugin-redux')],
  config: {
    // Configurations for bluerain-os will be added here
    title: 'Bluerain OS',

    wallpaper: {
      //  backgroundColor: 'red',
      source: 'https://placeimg.com/1000/800/tech',
      resizeMode: 'cover'
    },

    plugins: {}
  }
};