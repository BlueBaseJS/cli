module.exports = function (api) {
	// Cache the returned value forever and don't call this function again.
	api.cache(true);

	return {
		"plugins": [
			"@babel/proposal-class-properties",
			"@babel/proposal-object-rest-spread",
			"@babel/transform-runtime",
		],
		"presets": [
			[
				"@babel/preset-env",
				{
					"targets": {
						"node": true
					}
				}
			],
			"@babel/react",
			"@babel/typescript",
		]
	};
}