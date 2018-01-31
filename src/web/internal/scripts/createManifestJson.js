const path = require('path');
const fs = require('fs');
const kebabCase = require('lodash.kebabcase');

/**
 * function to create/update web-manifest file according to the config in bluerain.js
 */
function createManifestJson() {
	// revision 1328428 of https://developer.mozilla.org/en-US/docs/Web/Manifest
	// TODO: Need to resolve plugin app require statements build/run issues
	// currently resolving by commenting and then after webpack starts uncommenting plugins/apps
	let bootConfig = require(path.resolve(process.cwd(), 'bluerain.js'));
	bootConfig = bootConfig.config;
	const manifestJson = {};
	manifestJson.name = bootConfig.title;
	manifestJson.short_name = bootConfig.slug || kebabCase(manifestJson.name);
	manifestJson.description = bootConfig.description;
	manifestJson.icons = bootConfig.icons;
	manifestJson.orientation = bootConfig.orientation;
	if (bootConfig.theme && bootConfig.theme.colors) {
		manifestJson.theme_color = bootConfig.theme.colors.primary;
	}
	if (bootConfig.loading ) {
		manifestJson.background_color = bootConfig.loading.backgroundColor;
	}
	manifestJson.dir = bootConfig.dir;
	manifestJson.display = bootConfig.display;
	manifestJson.lang = bootConfig.lang || bootConfig.locale;
	manifestJson.prefer_related_applications = bootConfig.prefer_related_applications;
	manifestJson.related_applications = bootConfig.related_applications;
	manifestJson.scope = bootConfig.scope;
	manifestJson.start_url = bootConfig.start_url;
	fs.writeFileSync(path.join(__dirname, '../../', 'manifest.webmanifest'), JSON.stringify(manifestJson));
}

module.exports = createManifestJson;
