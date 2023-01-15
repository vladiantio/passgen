#!/usr/bin/env sh

# Source: https://vitejs.dev/guide/static-deploy.html#github-pages

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'Deploy'

git push -f git@github.com:vlantio/password-generator.git main:gh-pages

cd -
