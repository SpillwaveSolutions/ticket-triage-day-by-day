---
description: |
  This workflow checks, on a schedule, that npm test would be the gate
  for Ticket Triage. It does not edit the repository and it does not
  open a pull request.

on:
  schedule: daily
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

network: defaults

tools:
  bash: ["cat", "ls", "find", "grep", "head", "tail", "wc"]

safe-outputs:
  create-issue: false
---

# Test gate

Check that `npm test` would be the gate for Ticket Triage. Read the repository. Do not change it.

## What to include

- Read `package.json` and confirm the test script is `node --test`.
- State that `npm test` is the pass or fail gate.
- State that an agent exit status is not that gate.

## What to leave alone

- Do not edit `src/classify.js`.
- Do not edit `test/classify.test.js`.
- Do not edit `package.json`.
- Do not open a pull request.
- Do not merge.
- Do not enable auto-merge.
- Do not run git.

## Process

1. Read `package.json` with the allowed read commands.
2. Report only whether the test script is `node --test`.
3. Stop. Do not create an issue, a comment, or a pull request.
