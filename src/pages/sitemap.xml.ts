import type { APIRoute } from 'astro';
import { allPagePaths, absoluteUrl } from '../data/site';

export const GET: APIRoute = () => {
	const todayStr = new Date().toISOString().slice(0, 10);
	
	const xmlUrls = allPagePaths
		.filter(path => path !== 'dashboard')
		.map(path => {
			const loc = absoluteUrl(path === '' ? '' : `/${path}`);
			const changefreq = path === '' ? 'daily' : 'weekly';
		const priority = path === '' ? '1.0' : path.startsWith('calculators/') ? '0.8' : '0.5';
		
		return `  <url>
    <loc>${loc}</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
	}).join('\n');

	const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

	return new Response(sitemapXml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=14400'
		},
	});
};
