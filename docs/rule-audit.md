# Rule audit: overlap tests

CLAUDE.md rule: _"Every new category or rule needs a test with a ticket that also matches an older rule."_

Method: each keyword counts as its own rule. A rule's age comes from the commit that introduced it in git history. Keywords added in the same commit are ordered by where they appear in the file. A rule passes when some test in `test/` has a ticket that contains this rule's keyword and also a keyword from an older rule.

Verdicts: **PASS** means the requirement is met. **PASS\*** means it is met only through a `classify.js` rule overlapping a `priority.js` rule. **FAIL** means no qualifying test exists. **N/A** marks the first rule or a default branch.

| File        | Rule                   | Added in | Qualifying test (ticket)                                                             | Older rule matched                                            | Verdict |
| ----------- | ---------------------- | -------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------- |
| classify.js | refund: `refund`       | 1e4bf2c  | none needed (first rule)                                                             | none                                                          | N/A     |
| classify.js | refund: `money back`   | 1e4bf2c  | none; "refund" ticket is `I want my money back`                                      | none                                                          | FAIL    |
| classify.js | shipping: `shipping`   | 1e4bf2c  | none (no ticket contains "shipping")                                                 | none                                                          | FAIL    |
| classify.js | shipping: `delivery`   | 1e4bf2c  | none (no ticket contains "delivery")                                                 | none                                                          | FAIL    |
| classify.js | shipping: `package`    | 1e4bf2c  | none; "shipping" ticket is `Where is my package?`                                    | none                                                          | FAIL    |
| classify.js | damaged: `broken`      | fc676a6  | none (no ticket contains "broken")                                                   | none                                                          | FAIL    |
| classify.js | damaged: `damage`      | 35afddf  | none; "water damage" ticket is `The box has water damage`                            | none                                                          | FAIL    |
| classify.js | damaged: `crushed`     | fc676a6  | "damaged" (`My package arrived crushed`)                                             | shipping: `package`                                           | PASS    |
| classify.js | cancel: `cancel`       | 7d82f5e  | "cancel loses to older rules" (`Cancel my order and refund me`)                      | refund: `refund`                                              | PASS    |
| classify.js | refund: `return`       | 2f8b9ff  | "return beats shipping" (`I want to return this package`)                            | shipping: `package`                                           | PASS    |
| classify.js | `other` (fallthrough)  | 1e4bf2c  | "other" (`Hello`)                                                                    | n/a                                                           | N/A     |
| priority.js | high: `urgent`         | e223c8e  | "uppercase" (`URGENT: box crushed`)                                                  | damaged: `crushed` (classify; test asserts only `priority()`) | PASS\*  |
| priority.js | high: `asap`           | e223c8e  | none; tickets: `Please reply asap`, `Need it ASAP`, `Please answer ASAP!!`           | none                                                          | FAIL    |
| priority.js | high: `immediately`    | e223c8e  | "independent of category" (`Refund me immediately`)                                  | refund: `refund` (classify)                                   | PASS\*  |
| priority.js | high: `critical`       | ee98fa8  | none; ticket is `This is critical`                                                   | none                                                          | FAIL    |
| priority.js | high: `emergency`      | 674a327  | "emergency, also matches the damaged rule" (`Emergency: my package arrived crushed`) | damaged: `crushed`, shipping: `package` (classify)            | PASS\*  |
| priority.js | `normal` (fallthrough) | e223c8e  | "normal", "empty string"                                                             | n/a                                                           | N/A     |
| priority.js | `isUrgent()` wrapper   | 59d82ab  | none (wrapper over `priority()`, adds no keyword)                                    | n/a                                                           | N/A     |

**Totals (18 rows):** 3 PASS, 3 PASS\*, 8 FAIL, 4 N/A.

## Notes

- No ticket pairs two `priority.js` keywords. All three priority passes depend on a `classify.js` keyword. If the rule means overlap with an older rule _in the same function_, then `immediately` and `emergency` become FAIL and `urgent` becomes N/A.
- `URGENT: box crushed` contains "crushed", but its test never calls `classify()`. That makes it weaker evidence than the `immediately` and `emergency` tests, which assert both functions.
- `Cancel my order Immediately.` contains "cancel". It does not count for `immediately`, because `cancel` (7d82f5e) was added after `immediately` (e223c8e).
- Most of the FAIL rows are keywords from the first commits, which were written before the CLAUDE.md rule existed (0f87368). Of the rules added after it, only `critical` (ee98fa8) fails.

Produced by a 4-agent workflow (one auditor and one adversarial verifier per source file). `src/` and `test/` were not modified.
