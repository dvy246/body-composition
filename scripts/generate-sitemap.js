import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://bodycompos.com';
const DIST_DIR = path.resolve('dist');
const SITEMAP_FILE = path.join(DIST_DIR, 'sitemap.xml');
const SITEMAP_INDEX_FILE = path.join(DIST_DIR, 'sitemap-index.xml');

function getHtmlFiles(dir, fileList = []) {
	if (!fs.existsSync(dir)) return fileList;
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			getHtmlFiles(filePath, fileList);
		} else if (file.endsWith('.html')) {
			fileList.push(filePath);
		}
	});
	return fileList;
}

try {
	if (!fs.existsSync(DIST_DIR)) {
		console.error('dist directory does not exist. Run astro build first.');
		process.exit(1);
	}
	
	const htmlFiles = getHtmlFiles(DIST_DIR);
	const urls = htmlFiles.map((file) => {
		let relPath = path.relative(DIST_DIR, file)
			.replace(/\\/g, '/') // standardize backslashes
			.replace(/index\.html$/, '') // remove index.html
			.replace(/\/$/, ''); // remove trailing slash
		
		return `${SITE_URL}/${relPath}`;
	});

	// Generate sitemap.xml
	const lastmod = new Date().toISOString().slice(0, 10);
	let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
	urls.forEach((url) => {
		sitemapXml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>\n`;
	});
	sitemapXml += `</urlset>`;

	fs.writeFileSync(SITEMAP_FILE, sitemapXml);
	console.log(`Generated sitemap.xml with ${urls.length} URLs.`);

	// Generate sitemap-index.xml for robots.txt pointer compliance
	let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE_URL}/sitemap.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n</sitemapindex>`;
	fs.writeFileSync(SITEMAP_INDEX_FILE, indexXml);
	console.log(`Generated sitemap-index.xml.`);
} catch (error) {
	console.error('Error generating sitemap:', error);
}
