#!/usr/bin/env sh

set -e

# build
cd docs/.vuepress/dist
npm run build


git init
git add -A
git commit -m 'docs(deploy)'


git push -f git@github.com:amendx/vue-dndrop.git master:gh-pages

cd -