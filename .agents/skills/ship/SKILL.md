---
name: ship
description: Run the tests and check the working tree, and stop at the first failure. Use when asked to ship, verify, or finish a change.
---

# Ship

1. Run npm test. Stop if it fails.
2. Run git status --short and list every changed file.

If a step fails, report which step and the lines of output that explain it.
