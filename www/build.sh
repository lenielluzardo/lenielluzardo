#!/bin/bash
set -e

INIT_SUBMODULE="echo \"Git submodules: Initializing...\" && git submodule update --init --recursive"
UPDATE_SUBMODULE="echo \"Git submodules: Fetching from remote...\" && git submodule update --remote"
GIT_CHECKOUT="echo \"Git: checkout to blog branch...\" && git checkout -b blog"
GIT_ADD="echo \"Git: Adding submod last pointer commit...\" && git add ./src/blog"
GIT_COMMIT="echo \"Git: Commiting change...\" && git commit -m \"update submodule pointer commit\""
GIT_PUSH="echo \"Git: Commiting change...\" && git push --set-upstream origin blog"
BUILD_SITE="npm install && npx eleventy"

$INIT_SUBMODULE
$UPDATE_SUBMODULE
$GIT_CHECKOUT
$GIT_ADD
$GIT_COMMIT
$GIT_PUSH
$BUILD_SITE