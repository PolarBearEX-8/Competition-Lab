Visit the website: [Competition Lab](https://polarbearex-8.github.io/Competition-Lab/)

## Daily AI web research

The `Daily AI Research` Action runs at **03:17 Asia/Bangkok**, with manual runs available. It uses **gemini-3.5-flash-lite** for three requests: plan up to six search queries, analyze public web evidence, and produce validated JSON (up to 12 events). Existing active events are rechecked three at a time, rotating by date. The model is never asked to invent current information from memory.

### Enable

1. Add your Gemini Developer API key as **Settings → Secrets and variables → Actions → GEMINI_API_KEY**. Select a Free Tier project if you want free-only operation. Add a second secret **TAVILY_API_KEY** from https://app.tavily.com using its free plan; leave paid billing disabled for free-only use. No Google Search grounding or paid-model fallback is used. Check current model quotas/prices at https://ai.google.dev/gemini-api/docs/pricing.
2. Push the changes to `main`, then run **Actions → Daily AI Research → Run workflow**.
3. Keep GitHub Pages configured for **GitHub Actions**. This workflow publishes its tested build directly because `GITHUB_TOKEN` commits do not trigger the separate push deployment.

Search uses Tavily Search (basic depth, up to six queries per run) and requests page text along with search snippets. Gemini chooses the queries and analyzes results; this is web research, not a fixed event-data feed. Basic searches cost one credit each; the free plan currently includes 1,000 credits/month, so one six-query run daily is about 180 credits per 30 days. Check https://www.tavily.com/pricing for current terms. An empty/blocked response or exhausted quota stops publication. No login, social images, JavaScript interaction or application-form status is checked. Snippet-only discoveries become `watch`; snippets cannot overwrite an existing verified event.

Records in `src/data/researched.json` overlay curated events by normalized name + organizer, preserving unrelated records. Evidence and queries are stored in `research/YYYY-MM-DD.json`; token usage is printed in workflow logs. Data validation and a successful build precede commit and deployment. Review reports for important deadlines/eligibility: source presence and schema checks do not guarantee factual accuracy.

Local checks (Node.js 24): `npm ci`, `node --test scripts/daily-research.test.mjs`, `npm run build`. Set `GEMINI_API_KEY` through your secret manager before running `node scripts/daily-research.mjs`. Never commit API keys. Daily runs use three model requests; both AI free quotas and GitHub Actions limits apply.
