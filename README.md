npm install
yarn prepare



<!-- Git Setup -->
npx husky add .husky/pre-commit "npm test"
yarn format
git commit -m "blablabla"