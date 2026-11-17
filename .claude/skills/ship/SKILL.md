---
name: ship
description: Check that Ticket Triage is ready to commit. Runs the tests and lists the changed files. Use before every commit.
disable-model-invocation: true
---

Check that this repository is ready to commit:

1. Run `npm test` as its own command, with no other command joined to it. If any test fails, list each failing test by name.
2. Run `git status --short` as a separate command, and list each changed or new file.
3. End with one line: `Ready to commit` if every test passed, or `Not ready` if any test failed.

Do not commit, stage, or change any file.
