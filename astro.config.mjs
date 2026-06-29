import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://bodystrategyhub.com',
	integrations: [],
	redirects: {
		'/calculators/bmr-calculator': '/calculators/tdee-calculator',
		'/calculators/body-fat-calculator': '/calculators/body-composition-calculator',
		'/terms': '/terms-conditions',
		'/privacy': '/privacy-policy',
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
