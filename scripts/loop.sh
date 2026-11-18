#!/usr/bin/env bash
# A retry loop. The gate is npm test, and each round shows Claude the gate's full output.
# Stops when the gate passes, when the same tests fail twice, when Claude changes test/, or after 3 rounds.
task="$1"; last=""; mkdir -p .loop
for round in 1 2 3; do
  npm test > .loop/gate.txt 2>&1 && { echo "round $round: gate passed" | tee -a .loop/ledger.txt; exit 0; }
  failed=$(grep '^not ok' .loop/gate.txt)
  echo "round $round: gate failed, $(echo "$failed" | wc -l | tr -d ' ') failing" | tee -a .loop/ledger.txt
  [ "$failed" = "$last" ] && { echo "same tests failed twice: stop" | tee -a .loop/ledger.txt; exit 2; }
  last="$failed"
  claude -p "$task Do not change any file in test/. The gate is npm test. It failed with this output:
$(cat .loop/gate.txt)" --permission-mode acceptEdits > .loop/round-$round.txt
  git diff --quiet -- test/ || { echo "round $round: Claude changed test/: stop" | tee -a .loop/ledger.txt; exit 3; }
done
npm test > .loop/gate.txt 2>&1 && { echo "after round 3: gate passed" | tee -a .loop/ledger.txt; exit 0; }
echo "gate still failing after 3 rounds: stop" | tee -a .loop/ledger.txt; exit 1
