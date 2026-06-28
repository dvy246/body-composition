## Goal
- Build and deploy the "Build Your Day" Daily Nutrition Strategy feature for BodyCompOS — a strategy-first nutrition hub with per-strategy guidance, interactive macro visualization, eating situations, beyond-macros guidance, and a daily checklist.

## Constraints & Preferences
- MPA architecture only (no client-side routing, all standalone Astro pages with `<a>` navigation).
- Mobile-first responsive design using existing breakpoint patterns (`sm:`, `lg:`, `<details>` TOC).
- All content must be educational, non-prescriptive, and YMYL-safe with disclaimer on every page.
- No AI meal generation, no personalized meal plans, no meal logging, no accounts required.
- All data reads from existing `bodycompos.latestAssessment` localStorage key — no new forms or inputs.
- Checklist persists to localStorage with daily auto-reset (`bodycompos.buildYourDay.checklist`).
- Zero breaking changes to existing pages — all modifications are additive only.

## Progress
### Done
- Full codebase exploration: mapped all page patterns, localStorage schemas, component structures, CSS utilities, and responsive breakpoints across 60+ existing Astro files.
- Created 10 new files implementing the full "Build Your Day" feature:
  - `/src/pages/build-your-day/index.astro` — Hub page with `CollectionPage` schema
  - `/src/pages/build-your-day/cutting.astro` — Fat loss nutrition + targets + mini-bars + checklist
  - `/src/pages/build-your-day/lean-bulk.astro` — Lean bulk nutrition + targets + checklist
  - `/src/pages/build-your-day/aggressive-bulk.astro` — Aggressive bulk nutrition + targets + checklist
  - `/src/pages/build-your-day/recomp.astro` — Body recomp nutrition + targets + checklist
  - `/src/pages/build-your-day/maintain.astro` — Maintenance nutrition + targets + checklist
  - `/src/pages/guides/how-to-eat-in-a-calorie-deficit.astro` — Editorial guide (Article + FAQPage schema)
  - `/src/pages/guides/high-protein-diet-for-body-composition.astro` — Editorial guide (Article + FAQPage schema)
  - `/src/pages/compare/lean-bulk-vs-maingaining.astro` — Comparison page (Article schema)
- Modified 7 existing files for cross-linking, navigation, and integration:
  - `src/layouts/Layout.astro` — Added 2 nav items under Guides (How to Eat in a Deficit, High Protein Diet) and 1 under Compare (Lean Bulk vs Maingaining)
  - `src/pages/guides/index.astro` — Added 2 guide cards, updated reading time from ~47 to ~60 min
  - `src/pages/compare/index.astro` — Added 1 comparison card (Lean Bulk vs Maingaining)
  - `src/components/DashboardApp.astro` — Added dynamic "Build Your Day" nutrition card (reads `latestAssessment` from localStorage, shows strategy name, calorie target, and CTA link)
  - `src/pages/assess.astro` — Added "Build Your Day" as step 3 in the Next-Steps Strategic Pathway with dynamic calorie display and strategy-specific URL
  - `src/pages/body-composition-strategy-guide.astro` — Added "Build Your Day" as step 5 in the Next Steps workflow grid
  - `src/pages/guides/protein-nutrition.astro` — Updated Related Reading cross-links to include the 2 new guides
- Build verified: `npm run build` succeeds with 69 pages, zero errors across all files.

### In Progress
- (none — all phases complete)

### Blocked
- (none)

## Key Decisions
- Renamed "Daily Nutrition Strategy" → "Build Your Day" across all pages, URLs, and navigation labels.
- Hub architecture with 5 separate strategy pages (cutting, lean-bulk, aggressive-bulk, recomp, maintain) instead of a single page with tabs — each targets unique SEO keywords.
- Checklist uses localStorage with daily date-based reset (not session-only) — persistence matches user's recommendation.
- Aggressive-bulk gets its own page instead of merging into lean-bulk — all 5 assessment strategies have dedicated guidance.
- Checklist lives on each strategy page with different items per strategy (not on hub page).
- Macro visualization uses existing `.mini-bar` CSS class with percentage-based widths computed client-side from `latestAssessment.target`.
- Dashboard nutrition card renders conditionally — hidden when no assessment exists, shows strategy name + calories + CTA when data available.
- assess.astro pathway step 3 dynamically shows the user's exact calorie target from their latest assessment.
- Sealed decision to NOT build AI meal generation, personalized meal plans, meal logging, or accounts — verified against user's explicit constraints.

## Next Steps
- (No remaining work — all 10 new files created, 7 existing files modified, build passing)
- Potential future work: mobile audit at 375px/768px/1024px breakpoints, schema validation via Google Rich Results Test, deployment.

## Critical Context
- All 10 new pages compile and render independently (MPA architecture) — no client-side routing dependencies.
- Cutting page serves as the canonical template for all 5 strategy pages — identical structure with strategy-specific content differences.
- All strategy pages read `bodycompos.latestAssessment` from localStorage — uses same data key as DashboardApp.astro and assess.astro.
- Checklist localStorage key `bodycompos.buildYourDay.checklist` is unique — no conflict with existing keys.
- Existing `bodycompos.checkins` and `bodycompos.latestAssessment` keys remain untouched.
- `.mini-bar` CSS class (verified in `src/styles/global.css:464-478`) reused for macro visualization.
- Guide pages follow exact template of `protein-nutrition.astro` with `TableOfContents` component and `IntersectionObserver` scroll highlighting.
- Comparison page follows exact template of `cut-vs-recomp.astro` with manual sidebar TOC.
- `engineGoalLabels` from `src/lib/engines` used in DashboardApp.astro to map `recommended` keys to display names.

## Relevant Files
- `src/pages/build-your-day/index.astro` — Hub page with CollectionPage schema, auto-detect banner
- `src/pages/build-your-day/cutting.astro` — Template strategy page
- `src/pages/build-your-day/lean-bulk.astro` — Lean bulk strategy
- `src/pages/build-your-day/aggressive-bulk.astro` — Aggressive bulk strategy
- `src/pages/build-your-day/recomp.astro` — Body recomposition strategy
- `src/pages/build-your-day/maintain.astro` — Maintenance strategy
- `src/pages/guides/how-to-eat-in-a-calorie-deficit.astro` — Educational guide
- `src/pages/guides/high-protein-diet-for-body-composition.astro` — Educational guide
- `src/pages/compare/lean-bulk-vs-maingaining.astro` — Comparison page
- `src/pages/guides/protein-nutrition.astro` — Template for guide pattern
- `src/pages/compare/cut-vs-recomp.astro` — Template for comparison pattern
- `src/components/TableOfContents.astro` — Reusable TOC component
- `src/components/DashboardApp.astro` — Dashboard with dynamic nutrition card
- `src/styles/global.css` — Contains `.mini-bar` class for macro visualization
- `src/lib/engines.ts` — `macros()`, `engineGoalLabels`, strategy recommendation engine
