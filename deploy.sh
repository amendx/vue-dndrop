#!/usr/bin/env sh

set -e

# build
npm run docs:build
cd docs/.vuepress/dist


git init
git add -A
git commit -m 'docs(deploy)'


git push -f git@github.com:amendx/vue-dndrop.git master:gh-pages

cd -