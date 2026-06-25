# UI Audit - BodyCompOS

Audit date: 2026-06-24

Scope: current Astro implementation in `src/`, generated static output from `npm run build`, and product-quality requirements for a premium body composition strategy platform. No product feature implementation was done during this audit pass.

## Executive Summary

The current UI has the right product ambition in the PRD, but the interface still reads as a polished calculator prototype rather than a premium decision-support platform. The strongest issues are broken dark-mode semantics, generic calculator composition, weak trust presentation, thin visual hierarchy, and heavy reliance on card grids.

Severity: Critical before feature expansion.

Build status: `npm run build` succeeds and generated 30 static pages.

Dev server note: `astro dev --background` exited before becoming ready, and `astro dev status` reported no running server. This audit therefore used source inspection and static build output.

## Target Experience

The product should feel closer to Vercel, Stripe, Linear, Raycast, and Notion in the following ways:

- Clear, confident hierarchy instead of calculator-directory layout.
- Quiet scientific authority rather than warning-heavy copy.
- Dense but readable decision surfaces.
- Strong semantic color system that works in light and dark modes.
- Polished forms, results, tables, and charts.
- Fast, restrained interactions.
- Trust pages and methodology that feel transparent rather than defensive.

## Current Strengths

- Astro static build is fast and simple.
- Tailwind v4 is configured through the Vite plugin.
- There is an initial theme system and visible focus ring.
- Strategy Finder exists and is positioned on the homepage.
- Calculator pages are generated for most roadmap calculator slugs.
- Local dashboard exists as a supporting prototype.

## Critical UI Findings

| Severity | Area | Finding | Evidence | Required Fix |
|---|---|---|---|---|
| Critical | Dark mode | Primary buttons become near-white background with white text because `--color-ink` becomes light in dark mode while `.button-primary` keeps `color: white`. | `src/styles/global.css:25-33`, `src/styles/global.css:98-104` | Replace color roles with semantic tokens: `--primary`, `--primary-foreground`, `--accent`, `--accent-foreground`. |
| Critical | Dark mode | Logo can become white-on-light in dark mode because `bg-ink` uses the light dark-mode ink token and `text-white` stays white. | `src/layouts/Layout.astro:51`, `src/styles/global.css:25-33`, `src/styles/global.css:317-318` | Add explicit brand mark tokens: `--brand-mark`, `--brand-mark-foreground`. |
| Critical | Dark mode | Navigation hover state can become white-on-white because `hover:bg-white` is hardcoded while `hover:text-ink` maps to light text in dark mode. | `src/layouts/Layout.astro:56` | Use tokenized nav classes or component classes: `nav-link`, `nav-link:hover`. |
| Critical | Theme system | Dark mode is patched with global utility overrides instead of semantic design tokens. This is brittle and makes utility class behavior unpredictable. | `src/styles/global.css:312-318` | Remove global `.bg-white`, `.bg-paper`, `.text-white` overrides and migrate components to semantic roles. |
| High | Visual hierarchy | Homepage hero is mostly text plus a form card; it lacks a premium data-product first impression. | `src/components/StrategyFinder.astro:4-21` | Rebuild hero around assessment, recommendation, calories/protein, forecast, and progress artifacts. |
| High | Calculator UI | Every calculator uses the same generic form, including irrelevant fields such as target body fat or waist on pages that may not require them. | `src/components/CalculatorTool.astro:27-85` | Create calculator-specific input models and result layouts. |
| High | Surface system | The app relies on repeated `rounded-lg border bg-white p-5` cards, which creates a basic calculator-site feel. | `src/pages/index.astro:23`, `src/components/StrategyFinder.astro:111`, `src/components/CalculatorTool.astro:107-115` | Build a small product UI system: app shell, panels, metric cells, result rows, decision cards, article blocks. |
| High | Typography | Type scale is large and heavy in many places but not refined. It lacks a premium editorial/data-product rhythm. | `src/components/StrategyFinder.astro:7`, `src/components/CalculatorTool.astro:15` | Establish a type scale for hero, section, panel, metric, label, help text, and article content. |
| Medium | Spacing | Spacing is locally reasonable but not systematic; repeated `p-5`, `gap-4`, and `mt-8` values dominate. | Multiple components | Define spacing tokens and component-level spacing rules. |
| Medium | Charts | Charts are minimal SVG polylines and progress bars with no axis labels, confidence bands, body fat trend, or accessible data table pairing. | `src/components/DashboardApp.astro:129-153`, `src/styles/global.css:275-296` | Create chart tokens and accessible chart components for trend, forecast, and confidence states. |
| Medium | Interactions | Buttons and inputs have basic hover/focus states, but there is no high-quality interaction language for panels, results, empty states, or saved data. | `src/styles/global.css:82-151` | Standardize interaction states across buttons, cards, nav, tabs, form controls, charts, and tables. |

## Design Token Audit

Current tokens:

- `--color-ink`
- `--color-ink-muted`
- `--color-paper`
- `--color-panel`
- `--color-line`
- `--color-accent`
- `--color-accent-strong`
- `--color-positive`
- `--color-caution`
- `--color-danger`
- `--focus-ring`
- `--panel-glass`
- `--subtle-panel`

Problems:

- Token names describe visual color, not semantic component roles.
- `ink` is used both as text and primary button background, which breaks dark mode.
- No `--background`, `--foreground`, `--card`, `--card-foreground`, `--muted`, `--muted-foreground`, `--border`, `--input`, `--ring`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--success`, `--warning`, `--destructive`.
- No chart token set.
- No table token set.
- No navigation token set.
- No elevated surface token set.

Required semantic token system:

```css
:root {
  --background: #fbfcfd;
  --foreground: #101418;
  --card: #ffffff;
  --card-foreground: #101418;
  --muted: #f2f5f7;
  --muted-foreground: #5d6875;
  --border: #dce3ea;
  --input: #ffffff;
  --ring: rgb(8 145 178 / 0.36);
  --primary: #0f172a;
  --primary-foreground: #ffffff;
  --accent: #0891b2;
  --accent-foreground: #062f3c;
  --success: #059669;
  --warning: #b45309;
  --destructive: #b42318;
  --chart-actual: #0891b2;
  --chart-forecast: #f59e0b;
  --chart-band: rgb(245 158 11 / 0.16);
}
```

Dark mode must define the same roles, not override utility classes globally.

## Accessibility Audit

| Area | Status | Notes |
|---|---|---|
| Focus states | Partial | Global `:focus-visible` exists, but skip link uses hardcoded white surface. |
| Contrast | Failing | Dark-mode primary button/logo/nav hover can fail severely. |
| Form labels | Partial | Inputs have labels, but no grouped fieldsets or contextual help. |
| Error handling | Missing | Invalid fields rely mostly on browser validation; no visible or announced custom errors. |
| Charts | Partial | SVG has role and label, but no data table fallback or color-independent series patterns. |
| Tables | Partial | Dashboard table lacks caption and richer scope/context. |
| Mobile nav | Weak | Primary nav is hidden on mobile with no replacement menu. |
| Motion | Missing | No `prefers-reduced-motion` strategy for future transitions. |

## Competitor and Reference Advantages

Fitness calculator competitors:

- [Calculator.net TDEE Calculator](https://www.calculator.net/tdee-calculator.html): broad internal calculator network, unit modes, formula settings, explanatory content, and related links.
- [OmniCalculator FFMI Calculator](https://www.omnicalculator.com/health/ffmi): calculator-specific content, author/reviewer trust modules, source list, table of contents, related calculators, FAQ, and feedback prompts.

Premium product references:

- Vercel/Linear/Raycast style products generally win on restraint, sharp hierarchy, dense but calm data surfaces, and highly consistent token systems.
- Stripe/Notion style products create trust through content architecture, excellent typography, and careful progressive disclosure.

BodyCompOS opportunity:

- Beat generic calculators by connecting assessment, strategy, target setting, forecasting, and reassessment.
- Beat content-heavy calculators by keeping outputs clean and moving methodology/disclaimer detail into dedicated pages.
- Beat dashboard-first tools by making the strategy recommendation the core product and the dashboard a retention loop.

## UI Quality Bar Before New Features

No new product features should be implemented until these are complete:

1. Replace the current color system with semantic tokens.
2. Fix all dark-mode contrast issues.
3. Replace global utility overrides with component-level tokenized classes.
4. Redesign homepage hierarchy around strategy workflow, not dashboard.
5. Create premium reusable surfaces for product shell, forms, results, metrics, charts, and article content.
6. Build calculator-specific layouts instead of one generic calculator form.
7. Run light/dark accessibility checks on homepage, calculator page, info page, and dashboard.

