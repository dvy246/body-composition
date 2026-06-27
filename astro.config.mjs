import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://bodycompos.com',
	integrations: [sitemap()],
	redirects: {
		'/calculators/bmr-calculator': '/calculators/tdee-calculator',
		'/calculators/body-fat-calculator': '/calculators/body-composition-calculator',
		'/terms': '/terms-conditions',
		'/privacy': '/privacy-policy',
	},
	server: {
		host: '127.0.0.1',
		port: 4321,
	},
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			entries: ['src/**/*.astro', 'src/**/*.ts', 'src/**/*.js'],
		},
		server: {
			watch: {
				ignored: [
					'**/node_modules/**',
					'**/.git/**',
					'**/.astro/**',
					'**/.gemini/**',
					'**/.opencode/**',
					'**/.qodo/**',
					'**/.agents/**',
					'**/dist/**'
				],
			},
		},
	},
});
