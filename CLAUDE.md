# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`ticket-triage`: a minimal Node.js ES-module library that classifies support-ticket text into a category (`"refund"`, `"shipping"`, or `"other"`). No dependencies, no build step, no linter configured.

## Commands

- Run all tests: `npm test` (runs Node's built-in test runner, `node --test`, which auto-discovers files under `test/`)
- Run a single test file: `node --test test/classify.test.js`
- Run a single test by name: `node --test --test-name-pattern="refund"`

## Architecture

- `src/classify.js` exports `classify(text)`. It lowercases the input and does ordered keyword matching with `includes()`. **Rule order matters**: the first matching category wins, so a ticket mentioning both "refund" and "package" is classified as `"refund"`. Anything unmatched falls through to `"other"`.
- `test/classify.test.js` uses `node:test` + `node:assert/strict` with one-line `test(...)` cases per category. Add new cases in the same style.

## Conventions

- ES modules (`"type": "module"`), so relative imports need the `.js` extension.
- Code style: no semicolons, double quotes, 2-space indent.
