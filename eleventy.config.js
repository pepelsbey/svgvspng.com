import { bundle as lightningcssBundle, browserslistToTargets, Features } from 'lightningcss';
import packageJson from './package.json' with { type: 'json' };

export default (config) => {

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

	[
		'src/(en|de|ru)/*',
		'src/icons',
		'src/fonts',
		'src/favicon.ico',
	].forEach((path) => config.addPassthroughCopy(path));

	// Config

	return {
		dir: {
			input: 'src',
			output: 'dist',
		},
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		templateFormats: ['md', 'njk'],
	};
};
