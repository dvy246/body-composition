# BodyCompOS PRD

## Vision
BodyCompOS is a body composition strategy platform that helps users understand their starting point, choose a conservative strategy, track whether it is working, forecast progress, and reassess when their trend changes.

The product is not a generic calculator directory and not a weight-loss promise site. Calculators support the strategy workflow; they are not the whole product.

## Problem Statement
Most fitness calculators answer one isolated question, such as maintenance calories or protein intake. Users still need to decide whether to cut, lean bulk, recompose, maintain, or gain weight. After they choose, they need to know whether the strategy is working and when to adjust.

BodyCompOS solves this by connecting assessment, strategy recommendation, calories, protein, local tracking, weekly check-ins, forecasting, and reassessment.

## User Personas
- Beginner recomposition user: wants fat loss and muscle gain but does not know whether to cut or bulk.
- Fat loss user: wants a sustainable calorie deficit without extreme targets.
- Lean bulk user: wants muscle gain with controlled fat gain.
- Weight gain user: needs a structured surplus and realistic timeline.
- Maintenance user: wants to hold progress and avoid rebound.
- Plateau user: wants to know whether progress has slowed enough to adjust.

## User Pain Points
- Calculators produce numbers without explaining the strategy.
- “Should I cut or bulk?” content is often opinionated, oversimplified, or not personalized.
- Weight changes are noisy, and users overreact to short-term fluctuations.
- Users do not know when to maintain, switch strategy, or reassess.
- Many tools require accounts or store sensitive health-adjacent data remotely.

## Product Principles
- Strategy first, calculators second.
- Static-first and fast.
- LocalStorage only; no account and no backend.
- Educational estimates, not medical advice.
- Conservative calorie guidance and no extreme recommendations.
- Transparent formulas, assumptions, and limitations on every tool.
- Premium, calm, professional interface inspired by Vercel, Stripe, Linear, and Raycast.

## Feature Prioritization
Phase 1 launches the strategy workflow and trust foundation. Phase 2 expands SEO calculator coverage. Phase 3 builds the retention moat with local dashboard, history, check-ins, and forecasting.

## MVP Definition
- Strategy Finder homepage with recommended strategy, confidence score, alternative strategy, reasoning, assumptions, and limitations.
- TDEE, calorie, protein, and goal timeline calculators.
- Body Composition Strategy Guide with fat loss, lean bulk, recomp, and maintenance sections.
- Methodology, About, Editorial Policy, Disclaimer, FAQ Hub, Contact, Privacy Policy, and Terms.

## SEO Strategy
- Homepage targets body composition strategy and “should I cut or bulk” decision intent.
- Body Composition Strategy Guide targets fat loss strategy, lean bulk strategy, recomp strategy, and maintenance strategy.
- Calculator pages target specific high-intent searches.
- Internal links connect each calculator back to the Strategy Finder and guide.
- Each calculator includes formula, assumptions, limitations, and FAQ-ready content.

## Retention Strategy
The Phase 3 loop is:

Assessment -> Strategy Recommendation -> Calories & Protein -> Local Dashboard -> Weekly Check-In -> Forecasting -> Strategy Adjustment.

Users return because the dashboard answers “am I on track?” rather than only showing charts.

## YMYL Risk Mitigation
- Outputs use “estimate,” “may,” “might,” “could,” and “based on available inputs.”
- No diagnosis, treatment plans, medication recommendations, supplement recommendations, or guaranteed outcomes.
- Calorie recommendations use conservative safety floors and warn users to consult qualified professionals for medical conditions, pregnancy, eating disorder history, or unusual symptoms.
- BMI and body fat tools are framed as screening/estimation tools with limitations.

## E-E-A-T and AdSense Strategy
- Include About, Methodology, Editorial Policy, Disclaimer, Contact, Privacy Policy, and Terms.
- Explain formulas and cite reputable sources where possible.
- Avoid fabricated citations.
- Keep ad-ready space restrained and non-intrusive.
- Prioritize original, useful strategy content over thin calculator pages.
- Keep pages fast, accessible, and mobile-friendly.

## Technical Architecture
- Astro MPA.
- Static output.
- Tailwind CSS v4 through the official Vite plugin.
- TypeScript utility modules for calculators and strategy logic.
- LocalStorage for assessments, check-ins, and dashboard history.
- No backend, auth, database, or remote user profile.

## Success Metrics
- Organic impressions and clicks by calculator and strategy pages.
- Strategy Finder completion rate.
- Saved assessment rate.
- Dashboard return rate.
- Weekly check-in completion rate.
- Forecast view rate.
- Build performance, Core Web Vitals, and accessibility checks.

## Monetization Strategy
AdSense can be tested after content and trust pages are complete. Premium exports, templates, or deeper local reports can be considered later. Monetization must not interfere with YMYL safety or user trust.

## Future Roadmap
- Plateau troubleshooting tools.
- More detailed maintenance transition workflows.
- Import/export local data.
- Printable monthly strategy reports.
- Additional citation-backed methodology pages.
