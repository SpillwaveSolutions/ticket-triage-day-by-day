#!/bin/bash
# tt-guard: Cursor runs this before any shell command that matches "rm -rf".
cat > /dev/null
echo '{"permission": "deny", "user_message": "tt-guard blocked rm -rf.", "agent_message": "A project hook blocked rm -rf. Do not delete folders with rm -rf in this project."}'
