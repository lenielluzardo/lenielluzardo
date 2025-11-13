#!/bin/bash
set -e

LOG_INIT_SUBMODULE="echo Git submodules: Syncing and Initializing..."
GIT_BRANCH="git branch"
GIT_SUBMODULE_SYNC="git submodule sync"
INIT_SUBMODULE="git submodule update --init"
LOG_UPDATE_SUBMODULE="echo Git submodules: Fetching from remote..."
UPDATE_SUBMODULE="git submodule update --remote --recursive"
LOG_GIT_CHECKOUT="echo Git: checkout to blog branch..."
GIT_CHECKOUT="git checkout -b blog"
LOG_GIT_ADD="echo Git: Adding submod last pointer commit..."
GIT_ADD="git add ./src/blog"
LOG_GIT_COMMIT="echo Git: Commiting change..."
GIT_COMMIT="git commit -m update submodule pointer commit"
LOG_GIT_PUSH="echo Git: Commiting change..."
GIT_PUSH="git push --set-upstream origin blog"
BUILD_SITE="npm install && npx eleventy"


$GIT_BRANCH
$GIT_SUBMODULE_SYNC
$LOG_INIT_SUBMODULE
$INIT_SUBMODULE
$LOG_UPDATE_SUBMODULE
$UPDATE_SUBMODULE
$LOG_GIT_CHECKOUT
$GIT_CHECKOUT
$LOG_GIT_ADD
$GIT_ADD
$LOG_GIT_COMMIT
$GIT_COMMIT
$LOG_GIT_PUSH
$GIT_PUSH
$BUILD_SITE