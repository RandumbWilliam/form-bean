import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', 'shadcn-nuxt', 'nuxt-security', '@nuxt/fonts'],
	css: ['~/assets/css/tailwind.css'],
	vite: {
		plugins: [tailwindcss()],
	},
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui',
	},
	fonts: {
		families: [
			{
				name: 'Geist',
				provider: 'google',
				weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
			},
		],
	},
});
