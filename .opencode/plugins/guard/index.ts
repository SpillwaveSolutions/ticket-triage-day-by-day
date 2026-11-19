import { Plugin } from "@opencode/plugin"
import { appendFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"

// An exact project-relative file, or a directory prefix ending in "/".
const DEFAULT_LOCKED = ["package.json", "opencode.jsonc", ".opencode/"]
// Any .env file except .env.example: the pattern from the tested envguard.
const ENV_FILE = /\.env(?!\.example)/
// Outside the project, so it never shows in git status or a watched config directory.
const LOG = join(homedir(), "opencode-guard.log")

export default Plugin.define({
  id: "guard",
  async setup(ctx) {
    const locked: string[] = Array.isArray(ctx.options?.locked) ? ctx.options.locked : DEFAULT_LOCKED
    const isLocked = (p: string) => locked.some((l) => (l.endsWith("/") ? p.startsWith(l) : p === l))

    await ctx.permission.hook("evaluate", async (event) => {
      const path = event.metadata?.path
      const targets = typeof path === "string" ? [...event.resources, path] : [...event.resources]

      if (targets.some((t) => ENV_FILE.test(t))) {
        event.effect = "deny"
        event.message = "guard: .env files are off limits"
        return
      }

      const file = event.action === "edit" ? targets.find(isLocked) : undefined
      if (file) {
        event.effect = "deny"
        event.message = `guard: ${file} is changed by a human, not the agent`
        return
      }

      // A substring match on the command text: a name built at run time gets past it.
      if (event.action === "shell" && targets.some((cmd) => locked.some((l) => cmd.includes(l)))) {
        event.effect = "deny"
        event.message = "guard: shell commands that touch package.json, opencode.jsonc, or .opencode/ need a human"
      }
    })

    // Fires for every attempted command, denied ones included: a record of attempts, not of runs.
    await ctx.shell.hook("create.before", async (event) => {
      await appendFile(LOG, `${new Date().toISOString()}\t${event.cwd}\t${event.command}\n`)
    })
  },
})
