# UX Audit - BodyCompOS

Audit date: 2026-06-24

Scope: current user journeys, page structure, copy, YMYL messaging, roadmap coverage, and retention loop quality.

## Executive Summary

The product concept is strong, but the live UX still behaves like a calculator website with a dashboard attached. The primary user journey should be:

1. Assessment
2. Strategy recommendation
3. Calories and protein
4. Forecasting
5. Progress tracking
6. Dashboard

Current homepage and navigation partially support this, but dashboard messaging appears too early and too often, calculator pages are generic, and trust/compliance copy is too visible in conversion-critical surfaces.

## Current Journey Audit

| Journey Step | Current State | UX Problem | Priority |
|---|---|---|---|
| Assessment | Strategy Finder is on homepage. | Inputs are presented as a plain calculator form instead of a guided assessment. | P0 |
| Strategy Recommendation | Output shows strategy, confidence, alternative, calories, and protein range. | Reasoning is sparse; confidence model is opaque; result does not feel like a decision-support report. | P0 |
| Calories + Protein | Strategy Finder computes targets, calculators exist. | Targets are not integrated into one coherent plan view. | P0 |
| Forecasting | Dashboard has a simple trend forecast. | Forecasting is hidden in dashboard and depends on manual check-ins; no forecast preview in core strategy flow. | P1 |
| Progress Tracking | Check-ins exist. | Saved assessments, goal progress, body fat trend, monthly reassessment, and reports are not complete. | P1 |
| Dashboard | Exists as localStorage prototype. | Product messaging overemphasizes dashboard relative to strategy system. | P0 |

## YMYL Messaging Audit

The app currently protects itself, but the copy is too disclaimer-forward in visible surfaces.

Examples:

- Homepage hero includes "Educational estimates only. No diagnosis, treatment plan, medication advice, or guaranteed outcome." (`src/components/StrategyFinder.astro:18`)
- Calculator intro says results should be interpreted with assumptions below (`src/components/CalculatorTool.astro:16`)
- Every calculator page has a visible "Safety note" block (`src/pages/calculators/[slug].astro:25-27`)
- Strategy guide description says "YMYL-conscious guide" (`src/data/site.ts:29`)
- Footer repeats "Not medical advice." on every page (`src/layouts/Layout.astro:79`)

Required UX shift:

- Keep legal protection and conservative language.
- Move detailed risk language to Disclaimer, Methodology, Editorial Policy, and page footnotes.
- Use confident educational language in calculator outputs.
- Avoid user-facing labels like "YMYL-conscious."
- Replace warning-heavy blocks with concise "How to interpret this estimate" sections.

Recommended visible copy pattern:

- Output surface: "Use this as a starting estimate. Reassess after 2-4 weeks of consistent trend data."
- Methodology page: detailed formula assumptions, limitations, and professional guidance conditions.
- Disclaimer page: full legal/medical boundaries.

## Dashboard Messaging Audit

Dashboard appears too prominently:

- Primary nav includes Dashboard next to Strategy, Guide, Calculators, and Methodology (`src/layouts/Layout.astro:16-21`)
- Header CTA says "Open dashboard" (`src/layouts/Layout.astro:68`)
- Hero chips include "Local dashboard" before product value is established (`src/components/StrategyFinder.astro:9-12`)
- Result CTA says "View saved dashboard" (`src/components/StrategyFinder.astro:224`)
- Calculator result CTA says "Track in dashboard" (`src/components/CalculatorTool.astro:239`)

Required hierarchy:

1. Assessment
2. Strategy Recommendation
3. Calories + Protein
4. Forecasting
5. Progress Tracking
6. Dashboard

UX recommendation:

- Rename primary CTA to "Start assessment" or "Find my strategy."
- Move dashboard CTA to secondary nav or post-result action.
- Position dashboard as "Saved progress" or "Tracking" rather than the product center.
- Homepage should sell the strategy system, not localStorage.

## Feature Coverage Audit

### Phase 1

| Feature | Current Status | Notes |
|---|---|---|
| Strategy Finder | Partial | Exists, but needs premium guided assessment and richer result reasoning. |
| TDEE Calculator | Partial | Dedicated route exists, but uses generic form/content. |
| Calorie Calculator | Partial | Dedicated route exists, generic form/content. |
| Protein Calculator | Partial | Dedicated route exists, generic form/content. |
| Goal Timeline Calculator | Partial | Dedicated route exists, generic form/content. |
| Body Composition Strategy Guide | Partial | Route exists, content is thin. |
| Methodology | Partial | Route exists, content is thin and uncited. |
| About | Partial | Route exists, lacks credible product story and trust signals. |
| Editorial Policy | Partial | Route exists, thin. |
| Disclaimer | Partial | Route exists, thin but present. |
| FAQ Hub | Partial | Route exists, not structured as a real hub. |
| Contact | Partial | Route exists, placeholder domain/contact. |
| Privacy Policy | Partial | Route exists, basic localStorage note. |
| Terms | Partial | Route exists, thin. |

### Phase 2

| Feature | Current Status | Notes |
|---|---|---|
| Body Fat Calculator | Partial | Route exists, generic body fat output. |
| FFMI Calculator | Partial | Route exists, no normalized FFMI or interpretation table. |
| Lean Body Mass Calculator | Partial | Route exists. |
| Macro Calculator | Partial | Route exists. |
| Maintenance Calorie Calculator | Partial | Route exists. |
| Ideal Weight Calculator | Partial | Route exists. |
| BMI Calculator | Partial | Route exists. |
| Waist-to-Height Ratio Calculator | Partial | Route exists. |
| Body Composition Calculator | Partial | Route exists. |
| Calorie Surplus Calculator | Partial | Route exists. |
| Calorie Deficit Calculator | Partial | Route exists. |
| Target Weight Calculator | Partial | Route exists. |
| Muscle Gain Calculator | Partial | Route exists. |
| Body Recomposition Calculator | Partial | Route exists. |
| BMR Calculator | Partial | Current slug is `/calculators/basal-metabolic-rate-calculator`; requested convention likely expects `/calculators/bmr-calculator`. |

### Phase 3

| Feature | Current Status | Notes |
|---|---|---|
| Local Dashboard | Partial | Exists. |
| Saved Assessments | Partial | Strategy Finder saves assessments, but dashboard does not present saved assessments clearly. |
| Progress Tracking | Partial | Weekly check-ins exist. |
| Weight Trend Charts | Partial | Basic SVG line exists. |
| Body Fat Trend Charts | Missing | Body fat can be entered but no chart. |
| Goal Progress Tracking | Partial | Goal weight input and ETA exist, but no progress module. |
| Weekly Check-In System | Partial | Exists, but lacks edit/delete/import/export and validation states. |
| Forecasting Engine | Partial | Simple pace/ETA/status logic. |
| Monthly Reassessment | Missing | No monthly reassessment workflow. |
| Strategy Reassessment | Missing | No strategy switching logic based on trend divergence. |
| Progress Snapshot Reports | Missing | No report surface or export. |

## Calculator UX Findings

The shared calculator form is efficient to build but poor for users:

- TDEE users see body fat, waist, goal, target weight, and target body fat by default.
- Protein users see age, height, waist, activity, target body fat, and goal even though weight and goal are the core inputs.
- FFMI users do not get normalized FFMI or interpretation ranges.
- BMI users do not get clear category caveats or athletic/body composition context.
- Body fat users get an "entered estimate" instead of a real guided formula experience.
- Result bars are decorative and may imply precision without explaining scale.

Required UX direction:

- Each calculator needs a specific input model.
- Each result needs primary metric, interpretation, range/context, formula, assumptions, and next action.
- Calculator pages should link into the strategy system: "Use this result in Strategy Finder."
- Save actions should be explicit and not force dashboard language.

## Trust and E-E-A-T UX Findings

Current trust pages exist, but they are too thin to create premium confidence.

Problems:

- About page has no ownership, mission depth, revision policy, or product boundaries.
- Methodology page lists formulas but no citations, versioning, or update history.
- Editorial Policy is generic and not operational.
- Contact page uses `[DOMAIN]` placeholder.
- No author/reviewer model, even for formula-heavy pages.
- No "last updated" dates.
- No source/reference modules.

Competitor baseline:

- OmniCalculator shows creator and reviewer profiles, source lists, related calculators, table of contents, FAQs, and feedback prompts.
- Calculator.net provides broad related calculator links, formula explanations, and evergreen internal linking.

BodyCompOS should not copy these layouts, but it must meet or exceed their trust depth.

## Accessibility and Usability Risks

- No mobile primary navigation replacement.
- No custom error messaging for invalid or missing inputs.
- No announced validation errors beyond browser defaults.
- Generated result HTML is inserted after submit; focus is not moved to the result.
- Tables lack captions and richer semantic context.
- Charts need accessible data alternatives.
- Interactive cards/links need consistent hover and focus states.
- Some labels use "Gender" where formulas actually use biological sex; this should be handled carefully and respectfully with methodology context.

## UX Acceptance Criteria

Before new roadmap expansion:

1. Homepage communicates the strategy workflow in the required order.
2. Dashboard is positioned as supporting retention, not the product center.
3. Calculator outputs are clean and not dominated by warnings.
4. Detailed YMYL/compliance language lives in methodology/disclaimer/editorial pages.
5. Every core calculator has input fields that match the calculator purpose.
6. Strategy Finder result explains why the recommendation was made.
7. Trust pages include transparent methodology, sources, update policy, contact path, and privacy posture.
8. Mobile navigation and result focus behavior are fixed.

