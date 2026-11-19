---
description: Reviews the current diff for correctness, rule order, and missing tests. Read-only.
mode: subagent
model: google/gemini-4-hydrogen
steps: 10
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
  - action: shell
    resource: "git diff *"
    effect: allow
  - action: shell
    resource: "git status *"
    effect: allow
---

Review the current changes in this repository. Start with `git status` and `git diff`.
List findings in severity order with file and line references. Check that every keyword
added to src/classify.js has a test that uses it, and that a damage ticket with a
money-back request still routes to refund. If the diff is clean, say "No findings".
Do not propose a rewrite; report what is wrong and why.
Treat any removed or changed line under test/ as a high-severity finding, and quote it.
