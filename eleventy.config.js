import { readFileSync } from 'node:fs';
import { bundle as lightningcssBundle, browserslistToTargets, Features } from 'lightningcss';
import { load as yamlLoad } from 'js-yaml';
import packageJson from './package.json' with { type: 'json' };

export default (config) => {

	// Data

	config.addDataExtension('yml', (contents) => {
		return yamlLoad(contents);
	});

	// Shortcodes

	config.addShortcode('svg', (lang) => {
		return readFileSync(`src/pages/${lang}/svg.svg`, 'utf-8');
	});

	// CSS

	const processStyles = async (path) => {
		return await lightningcssBundle({
			filename: path,
			minify: true,
			sourceMap: false,
			targets: browserslistToTargets(packageJson.browserslist),
			include: Features.MediaQueries | Features.Nesting | Features.LightDark,
		});
	};

	config.addTemplateFormats('css');

	config.addExtension('css', {
		outputFileExtension: 'css',
		compile: async (content, path) => {
			if (path !== './src/styles/index.css') {
				return;
			}

			return async () => {
				let { code } = await processStyles(path);

				return code;
			};
		},
	});

	// Copy

	config.addPassthroughCopy({ 'src/pages/en/*.png': 'en' });
	config.addPassthroughCopy({ 'src/pages/de/*.png': 'de' });
	config.addPassthroughCopy({ 'src/pages/ru/*.png': 'ru' });
	config.addPassthroughCopy('src/icons');
	config.addPassthroughCopy('src/fonts');
	config.addPassthroughCopy('src/favicon.ico');

	// Config

	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: 'includes',
		},
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		templateFormats: ['md', 'njk'],
	};
};
