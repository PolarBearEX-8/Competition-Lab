import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, mergeEvents, currentEvents, searchEvidence, rotateSources, researchDocs } from './daily-research.mjs';
const record = Object.fromEntries('name organizer type fields open close gradeLevel description eligible eventDate location team cost prize discoverySource checked'.split(' ').map(k => [k, 'Unknown']));
Object.assign(record, { name: 'Camp 2026', organizer: 'CU', registrationState: 'watch', applyLink: 'https://example.org/apply', officialWebsite: 'https://example.org/event' });
test('invalid URLs, states, dates and extra properties cannot be published', () => {
  validate(record);
  for (const patch of [{ applyLink: 'javascript:alert(1)' }, { registrationState: 'maybe' }, { closeAt: 'tomorrow' }, { unexpected: true }]) assert.throws(() => validate({ ...record, ...patch }));
});
test('updates replace matching event without deleting unrelated events; next edition stays separate', () => {
  const other = { ...record, name: 'Other camp' };
  const updated = { ...record, cost: 'Free' };
  const nextYear = { ...record, name: 'Camp 2027' };
  const result = mergeEvents([record, other], [updated, nextYear]);
  assert.equal(result.length, 3);
  assert.equal(result.find(c => c.name === record.name).cost, 'Free');
  assert.deepEqual(mergeEvents(result, [updated]), result);
});

test('curated TypeScript records load without executing frontend imports', async () => {
  const events = await currentEvents();
  assert.ok(events.length > 20);
  assert.ok(events.some(c => c.name === 'GreenMind AI Hackathon 2026'));
});

test('search evidence distinguishes snippets from retrieved pages and rejects invalid links', () => {
  const records = searchEvidence({ results: [
    { url: 'https://example.org/a', title: 'Camp', content: 'Snippet', raw_content: 'Page text' },
    { url: 'https://example.org/b', title: 'Other', content: 'Snippet' },
    { url: 'javascript:alert(1)', title: 'Invalid' },
  ] }, 'query');
  assert.equal(records.length, 2);
  assert.equal(records[0].pageText, 'Page text');
  assert.equal(records[1].pageText, undefined);
  assert.throws(() => searchEvidence({}, 'query'));
});

test('source rotation crosses month boundaries without resetting and handles short registries', () => {
  const sources = Array.from({ length: 11 }, (_, id) => ({ id }));
  const a = rotateSources(sources, '2026-09-30');
  const b = rotateSources(sources, '2026-10-01');
  assert.equal(a.length, 4);
  assert.equal(b[0].id, (a[0].id + 4) % 11);
  assert.equal(rotateSources(sources.slice(0, 2), '2026-10-03').length, 2);
  assert.throws(() => rotateSources([], '2026-10-03'));
});
test('daily prompts load expanded documentation and concrete source targets', async () => {
  const docs = await researchDocs('2026-10-03');
  assert.ok(docs.planner.includes('Cybersecurity'));
  assert.ok(docs.planner.includes('Today'));
  assert.ok(docs.planner.includes('domain'));
  assert.ok(docs.verifier.includes('Verification contract'));
  assert.ok(docs.verifier.includes('Unknown'));
});
