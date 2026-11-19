---
name: Release Notes
description: Draft release notes from git history and prepare a release. Use when the user asks for release notes, a changelog, or to prepare or cut a release.
---

# Workflow

1. Run `scripts/changelog.sh` to list the commits since the last tag.
2. Group the commits under Added, Changed, and Fixed. For a classifier change, name the ticket category it affects: refund, shipping, or other.
3. If the user asked to prepare a release, not only for notes, read `references/release-checklist.md` and follow it step by step.
4. Show the draft to the user. Do not write `CHANGELOG.md`, edit `package.json`, or create a tag until the user approves.
