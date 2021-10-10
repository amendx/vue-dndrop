#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist


git init
git add -A
git commit -m 'docs(deploy)'


# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:amendx/vue-dndrop.git master:gh-pages

cd -