Visit the website: [Competition Lab](https://polarbearex-8.github.io/Competition-Lab/)

## Daily AI web research

The `Daily AI Research` GitHub Action runs daily at **03:17 Asia/Bangkok** (GitHub schedules may be delayed) and can be started manually. It uses **Gemini 2.5 Flash-Lite + Google Search grounding**, then a second request converts research into validated data. It discovers Thai competitions/hackathons/camps and rechecks a subset of existing events, following the research guides in `src/data/Tools`. Each run is limited to two API requests and at most 12 records; it does not exhaustively check every event every day.

### Enable

1. Create a Gemini Developer API key at https://aistudio.google.com/apikey using a project on the **Free Tier**. Do not enable paid billing if you want a free-only setup. Available quota varies by project; see https://ai.google.dev/gemini-api/docs/pricing and https://ai.google.dev/gemini-api/docs/rate-limits. Search grounding is model-specific; this script deliberately uses `gemini-2.5-flash-lite`.
2. In this repository, open **Settings → Secrets and variables → Actions → New repository secret**, name it `GEMINI_API_KEY`, and paste your key. Never commit the key.
3. Merge this change into `main`, then open **Actions → Daily AI Research → Run workflow** to verify your key and quota.
4. Keep GitHub Pages configured to deploy from **GitHub Actions**. The daily workflow publishes its own tested build because commits made with `GITHUB_TOKEN` do not trigger the separate push deployment.

Data is stored in `src/data/researched.json`, overlaid on curated events by normalized name + organizer. Existing curated files are preserved, previous researched records are retained, and later editions have distinct names. The UI already handles past deadlines. Source reports and Google grounding metadata are retained in `research/YYYY-MM-DD.json`. No-search responses, malformed data, quota errors and build failures stop publication. Concurrent pushes fail safely rather than overwriting another commit. AI sources still require human judgment: schema and source checks cannot guarantee factual accuracy. Social posts/forms that cannot be accessed must be marked `watch`, with limitations in notes. Review research reports if dates or eligibility matter.

Local checks (Node.js 24): `npm ci`, `node --test scripts/daily-research.test.mjs`, `npm run build`. Local research: `GEMINI_API_KEY=... node scripts/daily-research.mjs` (prefer your shell's secret manager; do not store the key in source). No fallback to a paid model is configured. API limits/prices can change; check your AI Studio project before enabling billing. GitHub Actions usage is separate from AI quota.
