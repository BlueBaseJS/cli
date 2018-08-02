# BlueRain CLI Web

A CLI tool to run or build a BlueRain project for web.

## Features

- 🔀 Supports `react-router` v4 as the router.
- 🚄 `express` server.
- ✂️ Code splitting - easily define code split points in your source using `react-async-component`.
- 🌍 Server Side Rendering.
- 😎 Progressive Web Application ready, with offline support, via a Service Worker.
- 🐘 Long term browser caching of assets with automated cache invalidation.
- 📦 All source is bundled using Webpack v3.
- 🚀 Full TypeScript support
- 🔧 Centralised application configuration with helpers to avoid boilerplate in your code. Also has support for environment specific configuration files.
- 🔥 Extreme live development - hot reloading of ALL changes to client/server source, with auto development server restarts when your application configuration changes.  All this with a high level of error tolerance and verbose logging to the console.
- ⛑ SEO friendly - `react-helmet` provides control of the page title/meta/styles/scripts from within your components.
- 🤖 Optimised Webpack builds via HappyPack and an auto generated Vendor DLL for smooth development experiences.
- 🍃 Tree-shaking, courtesy of Webpack.
- 👮 Security on the `express` server using `helmet` and `hpp`.
- 🏜 Asset bundling support. e.g. images/fonts.
- 🎛 Preconfigured to support development and optimised production builds.

## Getting started

```bash
git clone https://github.com/ctrlplusb/react-universally my-project
cd my-project
npm install
npm run develop
```

Now go make some changes to the `Home` component to see the tooling in action.

## Docs

- [Project Overview](/internal/docs/PROJECT_OVERVIEW.md)
- [Project Configuration](/internal/docs/PROJECT_CONFIG.md)
- [Package Script Commands](/internal/docs/PKG_SCRIPTS.md)
- [FAQ](/internal/docs/FAQ.md)
- [Feature Branches](/internal/docs/FEATURE_BRANCHES.md)
- [Deploy your very own Server Side Rendering React App in 5 easy steps](/internal/docs/DEPLOY_TO_NOW.md)
- [Changelog](/CHANGELOG.md)
