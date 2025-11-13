#!/bin/bash
set -e

INIT_SUBMODULE="git submodule update --init --recursive"
UPDATE_SUBMODULE="git submodule update --remote"
GIT_CHECKOUT="git checkout -b blog"
GIT_ADD="git add ./src/blog"
GIT_COMMIT="git commit -m \"update submodule pointer commit\""
GIT_PUSH="git push --set-upstream origin blog"
BUILD_SITE="npm install && npx eleventy"

$INIT_SUBMODULE
$UPDATE_SUBMODULE
$GIT_CHECKOUT
$GIT_ADD
$GIT_COMMIT
$GIT_PUSH
$BUILD_SITE