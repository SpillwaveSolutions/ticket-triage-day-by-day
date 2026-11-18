#!/usr/bin/env bash
# One ticket in, one reviewed branch out. Run it from the main checkout. The merge stays with you.
ticket="$1"; name=$(basename "$ticket" .md)
git worktree add -q ".claude/worktrees/$name" -b "$name" || exit 1
cd ".claude/worktrees/$name" && mkdir -p .loop
log() { echo "$*" | tee -a .loop/factory.txt; }
# 1. Spec: Claude turns the ticket into tests. It writes only test/$name.test.js.
claude -p "Read $ticket. Write test/$name.test.js with node:test tests for what it asks. Follow the test rule in CLAUDE.md. Do not change any other file." --permission-mode acceptEdits > .loop/spec.txt
# 2. Red gate: the new tests exist, src/ is unchanged, and the new tests fail.
[ -f "test/$name.test.js" ] && git diff --quiet -- src/ || { log "spec: no test file, or src/ changed: stop"; exit 1; }
node --test "test/$name.test.js" > /dev/null 2>&1 && { log "red gate: the new tests already pass: stop"; exit 1; }
log "spec: test/$name.test.js fails, as it should before the change"
git add "test/$name.test.js"
# 3. Build: the Day 25 loop, with npm test as the gate.
./scripts/loop.sh "Do what $ticket asks. Change only files in src/." || { log "build: the loop stopped, read .loop/ledger.txt"; exit 1; }
# 4. Review: a judge that can read files and run git diff, and nothing else.
#    On REJECT, Claude gets the review word for word, the tests run again, and the judge looks again.
for review in 1 2; do
  verdict=$(claude -p "Review a change. Read $ticket and CLAUDE.md, and run git diff HEAD. On the first line, reply APPROVE if the change does what the ticket asks and follows CLAUDE.md. Otherwise reply REJECT, then the reasons." --permission-mode dontAsk --allowedTools "Read" "Bash(git diff *)")
  echo "$verdict" > ".loop/review-$review.txt"; log "review $review: $(head -1 ".loop/review-$review.txt")"
  [[ "$verdict" == APPROVE* ]] && break
  [ "$review" = 2 ] && { log "review: rejected twice, read .loop/review-2.txt: stop"; exit 1; }
  claude -p "A reviewer rejected your change for $ticket. Fix what the review says. Change only files in src/. The review:
$verdict" --permission-mode acceptEdits > .loop/fix.txt
  ./scripts/loop.sh "Do what $ticket asks. Change only files in src/." || { log "build: the loop stopped, read .loop/ledger.txt"; exit 1; }
done
git add -A && git commit -q -m "$(head -1 "$ticket" | sed 's/^# //')"
log "ready: branch $name. Read it, then merge it from the main checkout with: git merge $name"
