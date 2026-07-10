import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://bodystrategyhub.com',
	integrations: [],
	redirects: {
		'/calculators/basal-metabolic-rate-calculator': '/calculators/bmr-calculator',
		'/terms': '/terms-conditions',
		'/privacy': '/privacy-policy',
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
