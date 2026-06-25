# BodyCompOS Build Plan

| Task | Priority | Complexity | Dependencies | SEO Impact | User Impact |
|---|---:|---:|---|---|---|
| Configure Astro, Tailwind v4, global layout, metadata, navigation, and footer | P0 | M | Existing Astro project | High | High |
| Create `PRD.md` and `BUILD_PLAN.md` | P0 | S | Research and approved plan | Medium | Medium |
| Build shared calculator and strategy logic | P0 | L | Project foundation | High | High |
| Build Strategy Finder homepage with confidence engine | P0 | L | Shared logic | Very high | Very high |
| Build TDEE, calorie, protein, and goal timeline calculators | P0 | M | Shared logic | High | High |
| Build Body Composition Strategy Guide | P0 | M | Layout and content model | Very high | High |
| Build About, Methodology, Editorial Policy, Disclaimer, FAQ, Contact, Privacy, and Terms | P0 | M | Layout | High | High |
| Build Phase 2 calculator pages | P1 | L | Calculator page system | Very high | Medium |
| Build local dashboard, saved assessments, progress tracking, local history, and charts | P1 | L | LocalStorage schema | Medium | Very high |
| Build weekly check-in, monthly reassessment, adherence score, and body composition score | P1 | L | Dashboard | Medium | Very high |
| Build forecast engine with ETA, pace, confidence, and on-track status | P1 | L | Tracking history | High | Very high |
| Verify build, responsiveness, keyboard accessibility, copy safety, and metadata | P0 | M | All pages | High | High |

## Implementation Notes
- Keep all user data in `localStorage`.
- Use static Astro pages and progressive enhancement for calculators.
- Every output must be framed as an estimate.
- Avoid extreme calorie recommendations and deterministic medical language.
- Use `[DOMAIN]` as the canonical placeholder until a production domain is provided.
