// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

import prettierPlugin from 'eslint-plugin-prettier';

export default withNuxt({
	plugins: {
		prettier: prettierPlugin,
	},
});
