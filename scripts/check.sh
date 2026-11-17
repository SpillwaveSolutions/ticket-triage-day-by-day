#!/usr/bin/env bash
# Ask Claude Code to run the tests with no one at the keyboard.
# Print its one-line answer, and exit 1 unless the answer ends in FAIL 0.
answer=$(claude -p "Run npm test. Reply with one line only: PASS <number> FAIL <number>." --output-format json | jq -r '.result')
echo "$answer"
[[ "$answer" == *"FAIL 0" ]]
