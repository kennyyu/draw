#!/bin/bash

if [[ -n `git status --porcelain` ]]; then
    echo "git status is not clean. Rerun when git status is empty."
    exit 1
fi

# Exit on first failure
set -e

# Print all statements
set -x

CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
PUBLISH_BRANCH="gh-pages-local-$RANDOM"

# Publish gh pages on a new local branch
git checkout -b $PUBLISH_BRANCH

# Build our bundle
npm run clean
npm run build

# We need to remove our .gitignore so that generated files are not ignored
rm .gitignore

# Add our assets
git add build

# Now publish the branch to github
PUBLISH_TIME=`date`
git commit -am "Site published at $PUBLISH_TIME"
git push --force origin HEAD:gh-pages
git checkout $CURRENT_BRANCH

echo "Site published! Publish branch locally at $PUBLISH_BRANCH"
