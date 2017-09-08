const path = require('path');
const root = path.dirname(__dirname);

module.exports = {
	root: root,
	app: {
		basePath: `${root}/app`,
		scripts: `${root}/app/**/*.js`,
		content: `${root}/app/**/*.json`,
		strings: `${root}/app/util/strings.js`
	},
	build: {
		basePath: `${root}/build/`,
		src: `${root}/build/src/`,
		zip: [`${root}/build/src/**/*`, `!${root}/build/src/package.json`],
		bundle: `${root}/build/build.zip`
	}
};
