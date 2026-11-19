#!/bin/sh
# Prints commits since the last tag, or all commits when no tag exists.
last=$(git describe --tags --abbrev=0 2>/dev/null)
if [ -n "$last" ]; then git log --oneline "$last"..HEAD; else git log --oneline; fi
