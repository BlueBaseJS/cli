const hooks = require('semantic-release-monorepo-hooks');
const output = hooks();

module.exports = {
	branches: [
		'master',
		'next',
		{ branch: 'beta', prerelease: true },
		{ branch: 'alpha', prerelease: true },
	],
	prepare: [
		'@semantic-release/changelog',
		'@semantic-release/npm',
		{
			path: '@semantic-release/git',
			message:
				'chore(' +
				output.package +
				'): release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
		},
	],
	publish: ['@semantic-release/npm'],
	verifyConditions: ['@semantic-release/npm', '@semantic-release/git'],
	monorepo: {
		analyzeCommits: ['@semantic-release/commit-analyzer'],
		generateNotes: ['@semantic-release/release-notes-generator'],
	},
	debug: true,
};
