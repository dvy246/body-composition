# Design Improvement Plan - BodyCompOS

Audit date: 2026-06-24

Purpose: prioritize quality fixes before any new feature expansion. This plan turns the UI, UX, and SEO audits into an implementation sequence.

## Product North Star

BodyCompOS should become a premium Body Composition Operating System:

- Assessment first.
- Strategy recommendation second.
- Calories and protein third.
- Forecasting fourth.
- Progress tracking fifth.
- Dashboard last, as supporting retention.

The dashboard is not the product. The strategy system is the product.

## Implementation Freeze Rule

Do not add net-new roadmap features until P0 quality repairs are complete:

- Semantic design tokens.
- Dark mode fixed.
- Homepage hierarchy corrected.
- Calculator UX no longer generic.
- YMYL copy moved to the right surfaces.
- SEO foundations in place.

## P0 - Foundation Repair

### 1. Semantic Design Token System

Replace current `ink/paper/panel/line` dependence with semantic roles:

- `--background`
- `--foreground`
- `--card`
- `--card-foreground`
- `--popover`
- `--popover-foreground`
- `--muted`
- `--muted-foreground`
- `--border`
- `--input`
- `--ring`
- `--primary`
- `--primary-foreground`
- `--secondary`
- `--secondary-foreground`
- `--accent`
- `--accent-foreground`
- `--success`
- `--warning`
- `--destructive`
- chart tokens
- table tokens
- nav tokens

Acceptance criteria:

- No global `.bg-white`, `.bg-paper`, or `.text-white` dark-mode overrides.
- Buttons, cards, nav, footer, inputs, tables, charts, and focus states work in light and dark mode.
- Primary button has correct contrast in both themes.
- Header logo has correct contrast in both themes.

### 2. Component Surface System

Create reusable classes or components for:

- App shell/header/footer.
- Navigation links.
- Assessment panel.
- Result panel.
- Metric cells.
- Strategy reasoning rows.
- Calculator form groups.
- Article/content blocks.
- Trust/source blocks.
- Tables.
- Chart panels.
- Empty states.

Acceptance criteria:

- No repeated hardcoded `rounded-lg border border-line bg-white p-5` patterns in product pages.
- Cards are used for individual repeated items, not as nested page sections.
- Surfaces remain restrained and data-product focused.

### 3. Dark Mode QA Pass

Audit pages:

- Homepage.
- One calculator page.
- One info page.
- FAQ page.
- Dashboard.

Acceptance criteria:

- No white-on-white or dark-on-dark text.
- Hover states preserve contrast.
- Inputs and selects have readable text and visible borders.
- Charts and progress bars are visible.
- Table borders and text are readable.
- Focus states are visible.

## P1 - Premium Product Experience

### 4. Homepage Rebuild

Required homepage hierarchy:

1. Assessment
2. Strategy Recommendation
3. Calories + Protein
4. Forecasting
5. Progress Tracking
6. Dashboard

Recommended structure:

- Hero: product name/value and assessment entry.
- Assessment module: guided form or compact evaluator.
- Strategy output preview: recommendation, confidence, alternative, key reasons.
- Targets module: calories, protein, estimated pace.
- Forecast preview: what changes after check-ins.
- Progress loop: weekly check-in and reassessment.
- Calculator system: secondary supporting tools.
- Trust strip: methodology, privacy, editorial policy, disclaimer.

Acceptance criteria:

- "Dashboard" is not a hero chip or primary CTA.
- Primary CTA is assessment/strategy focused.
- Legal language is subtle and not dominant.

### 5. Strategy Finder Upgrade

Upgrade from calculator form to decision-support assessment.

Required result sections:

- Recommended strategy.
- Confidence score.
- Alternative strategy.
- Why this recommendation.
- Calories target.
- Protein range.
- What to monitor.
- When to reassess.
- Save assessment action.

Acceptance criteria:

- Result feels like a strategy report, not three metric cards.
- Methodology link is present but not warning-heavy.
- Saved assessment action does not over-promote the dashboard.

### 6. Calculator-Specific UX

Create calculator definitions that control:

- Inputs.
- Required/optional fields.
- Formula used.
- Primary result.
- Secondary result.
- Interpretation.
- Related calculators.
- SEO title.
- Meta description.
- FAQs.
- Schema.

Acceptance criteria:

- TDEE page does not ask irrelevant target body fat inputs.
- Protein page focuses on body weight, goal, and optional training context.
- FFMI page includes normalized FFMI and interpretation.
- BMI page includes category and body-composition caveat.
- Body fat page uses an actual method or clearly says it is an entered estimate.

## P1 - Copy and Trust

### 7. YMYL Copy Rebalance

Move detailed legal/compliance copy into:

- Methodology.
- Disclaimer.
- Editorial Policy.
- Page footnotes.

Keep calculator outputs clean:

- Use "estimate", "starting point", and "reassess with trend data."
- Avoid "YMYL" in user-facing page descriptions.
- Avoid repeating "not medical advice" in every high-attention surface.

Acceptance criteria:

- No user-facing "YMYL-conscious" phrase.
- Hero copy feels confident.
- Calculator result areas are not warning dominated.

### 8. Trust Page Expansion

Upgrade:

- About.
- Methodology.
- Editorial Policy.
- Contact.
- Privacy Policy.
- Terms.
- Disclaimer.

Acceptance criteria:

- Real contact path or explicit launch placeholder strategy.
- Last updated dates.
- Formula/source sections.
- Clear localStorage privacy explanation.
- Correction/update policy.
- No fabricated credentials.

## P1 - SEO Foundation

### 9. Metadata System

Create per-page metadata:

- Title.
- Meta description.
- Canonical.
- OG title.
- OG description.
- OG URL.
- OG image.
- Twitter title.
- Twitter description.
- Twitter image.

Acceptance criteria:

- No `[DOMAIN]` output in generated HTML.
- Homepage and dashboard have canonical or intentional noindex handling.
- Calculator titles follow keyword-rich format.

### 10. Technical SEO

Create:

- `robots.txt`
- `sitemap.xml`
- Organization schema.
- WebApplication schema.
- Breadcrumb schema.
- FAQ schema.
- Article schema for relevant pages.

Acceptance criteria:

- Sitemap includes all indexable pages.
- Breadcrumb schema exists on calculator and info pages.
- FAQ schema only matches visible FAQ content.
- Article schema has real dates and no fabricated author credentials.

### 11. Calculator Hub and Internal Links

Add:

- `/calculators` hub.
- Category sections.
- Related calculators on each calculator page.
- Breadcrumb UI.
- Footer or secondary nav links to key pages.

Acceptance criteria:

- No major calculator is only discoverable from generated routes.
- Homepage links strategy system first and calculators second.
- FAQ hub links all major calculator categories.

## P2 - Retention and Dashboard Quality

### 12. Dashboard Repositioning

Keep dashboard as support feature:

- Saved assessments.
- Weekly check-ins.
- Weight trend.
- Body fat trend.
- Goal progress.
- Forecasting.
- Reassessment prompts.

Acceptance criteria:

- Dashboard page is useful after a strategy assessment.
- Dashboard is not the primary product claim.
- Empty state points users back to assessment.

### 13. Forecasting and Progress

Upgrade:

- Weight trend chart.
- Body fat trend chart.
- Forecast line with confidence band.
- Actual vs forecast visual distinction.
- Monthly reassessment.
- Strategy reassessment.
- Progress snapshot report.

Acceptance criteria:

- Chart has accessible legend and data table.
- Forecast differentiates actual and projected data.
- Reassessment copy is educational, not diagnostic.

## QA Checklist Before Development Continues

- `npm run build` passes.
- Light and dark mode manually checked on representative pages.
- Keyboard navigation checked.
- Mobile width checked at 320px and 375px.
- Tablet/desktop checked at 768px, 1024px, and 1440px.
- Metadata inspected in generated HTML.
- Sitemap and robots verified.
- Structured data validated.
- No generic white card dark-mode regressions.
- No excessive warning copy in calculator outputs.

## Recommended Implementation Order

1. Token system and dark-mode fix.
2. Layout/header/footer/nav cleanup.
3. Homepage hierarchy and Strategy Finder redesign.
4. Calculator definition/content system.
5. Metadata/canonical/OG/Twitter system.
6. Robots, sitemap, and schema.
7. Trust page expansion.
8. Calculator hub and related links.
9. Dashboard repositioning and retention upgrades.
10. Final accessibility, responsive, and SEO QA.

