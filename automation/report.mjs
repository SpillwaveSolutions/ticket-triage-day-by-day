import assert from "node:assert/strict"
import { spawnSync, execFileSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"

const binary = process.env.CODEX_BIN || "codex"
const prompt = "Read AGENTS.md and inspect git status --short and git rev-parse HEAD. Run npm test. Do not edit, commit, push, or publish. Return the current head, count of passing tests, whether status is clean, whether this checkout is ready, and a short reason matching the schema."
const run = spawnSync(binary, ["exec", "--sandbox", "workspace-write", "--json", "--output-schema", "automation/report.schema.json", "-o", "automation/report.json", prompt], { encoding: "utf8" })
writeFileSync("automation/events.jsonl", run.stdout || "")
writeFileSync("automation/run.stderr.log", run.stderr || "")
if (run.error) throw run.error
assert.equal(run.status, 0, "Codex process must exit successfully; inspect the logs")
const report = JSON.parse(readFileSync("automation/report.json", "utf8"))
assert.deepEqual(Object.keys(report).sort(), ["clean", "head", "ready", "reason", "tests_passed"])
const head = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim()
assert.equal(report.head, head)
assert.equal(report.tests_passed, 7)
assert.equal(report.clean, true)
assert.equal(report.ready, true)
assert.equal(typeof report.reason, "string")
assert.ok(report.reason.length > 0)
assert.equal(execFileSync("git", ["status", "--short"], { encoding: "utf8" }), "")
console.log(JSON.stringify(report, null, 2))
console.log("Validated report for " + head)
