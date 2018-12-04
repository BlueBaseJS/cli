# Todo

## CLI
- [ ] Finalize structure of bluerain dir
- [ ] Finalize structure of build dir
- [ ] Finalize structure of icons, images and assets (https://github.com/jantimon/favicons-webpack-plugin)
- [ ] Make path to bluerain dir configurable
- [ ] Deprecate bluerain-cli-core, its an extra overhead. Use oclif hooks instead
- [ ] Have a splash screen

## Web
- [ ] Improve webpack builder to be less web specfic & restructure platform config structures
- [ ] Loose hotDevelopment codebase in web. Make the process simpler.
- [ ] Generate vendor dlls
- [ ] Command to generate a static build
- [ ] Implement build command for web

## Electron
- [ ] Implement build command for electron
- [ ] Import app from web plugin







### Dir Structure

should we have a common assets?

bluerain-project
├─ assets
├─ bluerain
│  ├─ common
│  │  ├─ boot.ts
│  ├─ electron
│  │  ├─ boot.ts
│  │  ├─ config.ts
│  │  ├─ webpack.config.ts
│  │  ├─ assets/
│  ├─ expo
│  │  ├─ boot.ts
│  │  ├─ config.ts
│  │  ├─ webpack.config.ts
│  │  ├─ assets/
│  ├─ web
│  │  ├─ boot.ts
│  │  ├─ config.ts
│  │  ├─ webpack.config.ts
│  │  ├─ assets/
├─ build
│  ├─ electron-dev
│  ├─ electron-linux
│  ├─ electron-macos
│  ├─ electron-windows
│  ├─ expo-android
│  ├─ expo-dev
│  ├─ expo-ios
│  ├─ web
│  ├─ web-static
├─ tsconfig.ts