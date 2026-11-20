import { readFileSync } from "node:fs";

const raw = readFileSync(0, "utf8");
let payload = null;
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}

if (payload === null || typeof payload !== "object") {
  process.exit(0);
}

const toolName = payload.toolName;
const argsText =
  typeof payload.toolArgs === "string"
    ? payload.toolArgs
    : JSON.stringify(payload.toolArgs ?? "");
const shellTool = toolName === "bash" || toolName === "powershell";
const push = /\bgit\s+push\b/.test(argsText);

if (shellTool && push) {
  process.stdout.write(
    JSON.stringify({
      permissionDecision: "deny",
      permissionDecisionReason: "git push stays refused",
    }),
  );
}
