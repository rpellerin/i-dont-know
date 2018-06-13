#!/bin/bash
cd build
git init
git remote add origin https://${GH_TOKEN}@github.com/rpellerin/i-dont-know.git
git fetch origin
git add -A
date=$(date --iso-8601=seconds)
git commit --no-verify -m "Release-$date"
git checkout -b gh-pages origin/gh-pages
git cherry-pick master --strategy-option theirs
git push -q origin gh-pages:gh-pages >/dev/null 2>&1
