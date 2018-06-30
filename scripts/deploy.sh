#!/bin/bash
cd build
git init
git remote add origin https://${GH_TOKEN}@github.com/rpellerin/i-dont-know.git
git fetch origin
git add -A
git commit -m 'Latest build' -n
git diff-index origin/gh-pages --binary -p > ../diff
git checkout -b gh-pages origin/gh-pages
git apply ../diff
git add -A
date=$(date --iso-8601=seconds)
git commit --no-verify -m "Release-$date"
git push -q origin gh-pages:gh-pages >/dev/null 2>&1
