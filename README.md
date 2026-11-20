# Ticket Triage

Ticket Triage is the running example for the Spillwave day-by-day guides to AI coding agents. It is a small Node.js program that classifies a support ticket as `refund`, `shipping`, or `other`. It has no dependencies. The tests use the test runner that is built into Node.js.

Each guide grows Ticket Triage one day at a time with its own tool. Each guide has its own branch in this repository.

## Requirements

- Node.js 22 or later, as the Day 1 lessons use
- Git

## Run the tests

```bash
npm test
```

On `main`, three tests pass.

## Branches and guides

The `main` branch holds the Day 0 starting point. Every guide starts from these three files: `package.json`, `src/classify.js`, and `test/classify.test.js`.

| Guide | Branch | Tag prefix | Day 1 |
| --- | --- | --- | --- |
| Claude Code, Day-to-Day | `claude-code-daily` | `claude-code/` | [Part 1](https://spillwave.com/guides/claude_code_daily/part-01-install/) |
| Cursor, Day-to-Day | `cursor-guide` | `cursor/` | [Part 1](https://spillwave.com/guides/cursor/part-01-install/) |
| OpenAI Codex, Day-to-Day | `codex` | `codex/` | [Part 1](https://spillwave.com/guides/codex/part-01-install/) |
| OpenCode, Day-to-Day | `opencode` | `opencode/` | [Part 1](https://spillwave.com/guides/opencode/part-01-install/) |
| Pi, Day to Day | `pi` | `pi/` | [Part 1](https://spillwave.com/guides/pi/part-01-install/) |
| GitHub Copilot, Day-to-Day | `copilot` | `copilot/` | [Part 1](https://spillwave.com/guides/github_copilot/part-01-you-already-have-copilot/) |

The guides use different tools, so the branches do not have the same code. Use the branch for your guide.

## Day tags

Each guide branch has one tag for each day. The tag name is `<prefix>day-NN`, for example `claude-code/day-01` or `cursor/day-12`.

- `<prefix>day-00` is the starter project before Day 1.
- `<prefix>day-NN` is the project at the end of Day NN.
- If a day does not change the code, its tag is on the same commit as the tag of the day before.

To start a day, use the tag of the day before. For example, to start Day 5 of the Cursor guide:

```bash
git clone https://github.com/SpillwaveSolutions/ticket-triage-day-by-day.git ticket-triage
cd ticket-triage
git switch -C main cursor/day-04
git branch --unset-upstream main
git remote rename origin upstream
npm test
```

Your work goes on your own `main` branch, so the commands in the guides work as written. `git branch --unset-upstream main` stops your `main` from following the Day 0 `main` in this repository. Renaming the remote to `upstream` leaves the name `origin` free for your own repository.

To catch up later in the same clone, run `git switch -C main <prefix>day-NN`. This replaces your `main` with the end of Day NN. To keep your own work, run `git branch my-backup` first. The guide branches and tags do not change.

## Rebuilt commits

Some days were recorded while the guide was tested. Those commits keep their original messages. Other days were rebuilt from the lesson text. A rebuilt commit has the message `Day NN end state (<guide>)`.
