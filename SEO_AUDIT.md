# SEO Audit - BodyCompOS

Audit date: 2026-06-24

Scope: Astro routes, metadata, canonical behavior, generated static output, structured data, robots/sitemap, internal linking, and SEO content depth.

## Executive Summary

The application has broad static route generation, but technical SEO is incomplete. Calculator pages exist, but titles are generic, canonical URLs use `[DOMAIN]`, homepage and dashboard lack canonicals, structured data is absent, robots and sitemap are missing, and calculator pages are thin because they all share the same generic component and generic support copy.

Build status: `npm run build` generated 30 pages.

## Route Coverage

Generated routes include:

- `/`
- `/dashboard`
- `/body-composition-strategy-guide`
- `/methodology`
- `/about`
- `/editorial-policy`
- `/disclaimer`
- `/faq`
- `/contact`
- `/privacy-policy`
- `/terms`
- 19 calculator pages under `/calculators/`

Phase 2 route caveat:

- User requirement references BMR Calculator. Current route is `/calculators/basal-metabolic-rate-calculator`, not `/calculators/bmr-calculator`.
- If keyword targeting requires "BMR Calculator", add or redirect to `/calculators/bmr-calculator`.

## Metadata Audit

Current layout supports:

- `<title>`
- meta description
- optional canonical
- `og:title`
- `og:description`
- `og:type`
- `twitter:card`

Evidence: `src/layouts/Layout.astro:33-39`

Missing or weak:

- Home canonical is missing.
- Dashboard canonical is missing.
- Canonicals use `[DOMAIN]` placeholder for dynamic pages.
- `og:url` missing.
- `og:site_name` missing.
- `og:image` missing.
- `twitter:title` missing.
- `twitter:description` missing.
- `twitter:image` missing.
- No per-page robots meta control.
- No article metadata where relevant.
- No `lastmod` source for sitemap.

## Title Audit

Current title pattern:

- Homepage: `BodyCompOS | Body Composition Strategy Finder`
- Calculator pages: `${calculator.title} | BodyCompOS`
- Info pages: `${page.title} | BodyCompOS`
- Dashboard: `Local Dashboard | BodyCompOS`

Problems:

- Calculator titles are too generic.
- Titles do not consistently include keyword modifiers or value proposition.
- Dashboard is over-positioned.
- Info page titles do not capture trust/search intent.

Required examples:

- `TDEE Calculator - Estimate Maintenance Calories | BodyCompOS`
- `Protein Calculator - Daily Protein Intake Calculator | BodyCompOS`
- `Calorie Calculator - Cutting, Maintenance, and Lean Bulk Targets | BodyCompOS`
- `Body Fat Calculator - Estimate Body Fat Percentage | BodyCompOS`
- `FFMI Calculator - Fat-Free Mass Index and Lean Mass | BodyCompOS`
- `BMI Calculator - Body Mass Index Calculator With Context | BodyCompOS`
- `Body Composition Strategy Guide - Cut, Bulk, Recomp, or Maintain | BodyCompOS`
- `Methodology - Body Composition Formulas and Assumptions | BodyCompOS`

## Canonical Audit

Current issue:

- `DOMAIN` is `[DOMAIN]` in `src/data/site.ts`.
- Generated calculator canonical example: `[DOMAIN]/calculators/tdee-calculator`.
- Homepage and dashboard do not pass canonical props.

Evidence:

- `src/data/site.ts:1`
- `src/pages/calculators/[slug].astro:19`
- `src/pages/[slug].astro:15`
- `src/pages/index.astro:7-11`
- `src/pages/dashboard.astro:6-9`

Required fix:

- Define a real site URL in `astro.config.mjs` or a typed site config.
- Generate absolute canonicals for all pages.
- Add canonical to homepage and dashboard or mark dashboard noindex if not intended for search.

## Structured Data Audit

Current status: missing.

No `application/ld+json` appears in generated pages.

Required schema:

- Organization schema on sitewide layout.
- WebApplication schema on homepage.
- BreadcrumbList schema on all non-home pages.
- FAQPage schema on FAQ hub and calculator FAQ sections.
- Article schema for strategy guide, methodology, editorial policy, and possibly calculator explainers.
- SoftwareApplication or WebApplication schema may be appropriate for calculators if implemented carefully.

Schema requirements:

- Must use real canonical URLs.
- Must not fabricate author credentials.
- Must keep medical claims conservative.
- Must match visible page content.

## Technical SEO Audit

| Requirement | Current Status | Notes |
|---|---|---|
| `robots.txt` | Missing | No file found in `public/` or `dist/`. |
| `sitemap.xml` | Missing | No sitemap integration or generated file. |
| Canonicals | Partial | Dynamic pages use `[DOMAIN]`; home/dashboard missing. |
| Indexability | Partial | Pages are static and indexable by default, but canonical placeholder is a blocker. |
| Open Graph | Partial | Missing URL, site name, and image. |
| Twitter Cards | Partial | Only card type exists. |
| Structured data | Missing | No JSON-LD. |
| Internal linking | Partial | Home links first 6 calculators; FAQ links first 8 calculators; no complete calculator hub. |
| Breadcrumbs | Missing | Visual and schema breadcrumbs absent. |
| Sitemap coverage | Missing | Cannot verify without sitemap. |

## Calculator Page SEO Audit

Strengths:

- Dedicated pages exist for calculator slugs.
- Dynamic generation is simple and scalable.
- Each page gets a title and meta description.

Weaknesses:

- All calculators share the same generic form and support sections.
- Calculator-specific content is thin.
- No page-specific FAQ content.
- No formula-specific sections beyond a generic note.
- No keyword-rich H2/H3 structure per calculator.
- No related calculator modules beyond limited homepage/FAQ links.
- No schema.
- No breadcrumb.
- No updated date.

Required calculator page content model:

1. Calculator-specific hero and input set.
2. Primary result with interpretation.
3. Formula used.
4. Assumptions.
5. How to use the result in a strategy.
6. Related calculators.
7. FAQs.
8. Methodology/disclaimer links.
9. JSON-LD for breadcrumbs and FAQs.

## Internal Linking Audit

Current internal linking is too shallow:

- Header nav links to one calculator page as "Calculators" (`src/layouts/Layout.astro:19`).
- Homepage shows only first 6 calculators (`src/pages/index.astro:21-26`).
- FAQ links only first 8 calculators (`src/pages/[slug].astro:39-47`).
- No dedicated `/calculators` hub.
- Calculator pages do not link to sibling calculators contextually.
- Footer trust links are present.

Required fix:

- Add a calculator hub at `/calculators`.
- Use category groups: Energy, Protein/Macros, Body Composition, Goal Planning, Tracking.
- Add breadcrumb links.
- Add related calculator modules on every calculator page.
- Link from Methodology to calculator formula sections.
- Link from Strategy Guide to relevant calculators and Strategy Finder.

## Trust and E-E-A-T SEO Audit

Current trust pages are present but thin:

- About: basic mission and privacy.
- Methodology: formulas listed but no sources.
- Editorial Policy: standards and corrections, but generic.
- Contact: placeholder.
- Disclaimer: basic.
- Privacy and Terms: basic.

Required trust upgrades:

- Add last updated dates.
- Add source/reference sections on methodology and calculators.
- Add transparent editorial process.
- Add correction/contact workflow with real contact path.
- Add ownership statement without pretending medical credentials.
- Add privacy detail for localStorage and future analytics policy.
- Avoid unsupported medical claims.

## Competitor Baseline

- [Calculator.net TDEE Calculator](https://www.calculator.net/tdee-calculator.html) has broad internal related links, formula explanation, unit options, and calculator network discoverability.
- [OmniCalculator FFMI Calculator](https://www.omnicalculator.com/health/ffmi) has author/reviewer modules, sources, related calculators, table of contents, FAQs, and content depth.

BodyCompOS can differentiate by making the strategy system the core SEO asset, then using calculators as supporting keyword pages.

## Priority SEO Fixes

P0:

- Replace `[DOMAIN]` with real site URL config.
- Add canonical to all pages.
- Add full Open Graph and Twitter metadata.
- Add `robots.txt`.
- Add sitemap generation.
- Add Organization and WebApplication schema.
- Add Breadcrumb schema.

P1:

- Create `/calculators` hub.
- Expand calculator metadata with SEO titles and descriptions.
- Add calculator-specific content models.
- Add FAQ schema on FAQ and calculator pages.
- Add Article schema to guide/methodology/editorial content.

P2:

- Add source/reference modules.
- Add last updated dates.
- Add related calculator graph.
- Add noindex rules for any non-search utility pages if needed.
- Add automated SEO tests for metadata and sitemap coverage.

