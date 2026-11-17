---
name: tt-add-keyword
description: Add a keyword to one category in src/classify.js, with a test named after the keyword. Use when the user asks to add a keyword or a ticket phrase to a category.
---

# Add a keyword

The user names a keyword and a category, such as "chipped as damaged".

1. Add the keyword to the check for that category in `src/classify.js`. Change no other check.
2. Add one test to `test/classify.test.js`. Name the test after the keyword, and use a short ticket that contains it.
3. Run `npm test`.
4. Report the pass and fail counts. Do not commit.
