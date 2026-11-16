# Plan: `priority(text)` in `src/priority.js`

## Context
`ticket-triage` currently only classifies tickets by category (`src/classify.js`). We want a second, independent signal: urgency. `priority(text)` returns `"high"` if the ticket mentions **urgent**, **asap**, or **immediately**, else `"normal"`.

## Approach
Mirror the existing `classify()` pattern in `src/classify.js` so the library stays consistent:

- New file `src/priority.js` with a one-line header comment and `export function priority(text)`.
- Lowercase the input once (`text.toLowerCase()`), then `includes()` checks for `"urgent"`, `"asap"`, `"immediately"` → `"high"`; otherwise `"normal"`.
- Style: no semicolons, double quotes, 2-space indent, ES module.
- No changes to `classify.js`. Priority is orthogonal to category (a ticket can be `"damaged"` + `"high"`).

## Tests: new file `test/priority.test.js`
Same style as `test/classify.test.js` (`node:test` + `node:assert/strict`, one-line `test(...)` cases):

| Test name | Input | Expected |
|---|---|---|
| urgent | `"This is urgent"` | `"high"` |
| asap | `"Please reply asap"` | `"high"` |
| immediately | `"Fix this immediately"` | `"high"` |
| normal | `"Where is my package?"` | `"normal"` |
| uppercase | `"URGENT: box crushed"` | `"high"` |
| mixed case | `"Need it ASAP"` | `"high"` |
| urgently (substring) | `"I urgently need help"` | `"high"` |
| empty string | `""` | `"normal"` |
| independent of category | `classify("Refund me immediately")` is `"refund"` and `priority(...)` is `"high"` | both hold |

## Edge cases (and how this plan handles them)
1. **Case**: handled by lowercasing (`URGENT`, `Asap`).
2. **Word variants**: `urgent` matches `urgently` but **not** `urgency`. Accept for now; note it.
3. **Negation**: `"not urgent"` / `"no rush, not asap"` → `"high"` (false positive). Plain keyword matching can't detect this; document as a known limitation, matching `classify`'s simplicity. Could add a test that pins current behavior so a future change is deliberate.
4. **Punctuated forms**: `"a.s.a.p."` won't match. Known limitation; not in scope.
5. **Substring false positives**: `"asap"` inside another word is unlikely in English; acceptable.
6. **Empty / whitespace**: returns `"normal"`.
7. **Non-string input** (`null`, `undefined`): throws on `.toLowerCase()`, same as `classify`. Keep consistent; don't add guards unless requested.

## Verification
- `npm test`: all existing classify tests plus new priority tests pass.
- `node --test test/priority.test.js` to run just the new file.
