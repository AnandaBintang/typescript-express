## Learning Express.js with Typescript

A dummy project to learn how express.js work with typescript.

## Deployment

To deploy this project run

```bash
npm install
yarn prepare
yarn dev
yarn migrate:dev
```

To lint this project run
```bash
yarn lint
```

To build this project run
```bash
yarn build
yarn prod
```

Git setup for this project
```bash
npx husky add .husky/pre-commit "npm test"
yarn format
git commit -m "blablabla"
```

## Documentation

[API Documentation](https://documenter.getpostman.com/view/18743612/2s9YkjANtB)