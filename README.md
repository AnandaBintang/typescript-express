npm install
yarn prepare
yarn dev

<!-- To linting -->
yarn lint

<!-- To Build -->
yarn build
yarn prod

<!-- Git Setup -->
npx husky add .husky/pre-commit "npm test"
yarn format
git commit -m "blablabla"