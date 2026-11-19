# Plan: damage rule for classify()

Rule order: refund, then damage, then shipping, then other.
Damage plus a money-back request is a refund. Damage alone is shipping.

1. Route damage alone to shipping.
   Files: test/classify.test.js, src/classify.js.
   Test: "The box showed up crushed and the mug inside is in pieces" returns "shipping".
   Fails today: it returns "other".
   Change: one damage check ("crushed", "broken", "in pieces") between the refund check and the shipping check.

2. Keep damage plus money back as a refund.
   Files: test/classify.test.js.
   Test: "The box showed up crushed and I want my money back" returns "refund".
   Passes today, because the refund check runs first. It pins the order: it fails if the damage check ever moves above the refund check.
   Change: none.

Risk: "broken" also matches tickets like "the link in your email is broken". Out of scope; note it for later.
