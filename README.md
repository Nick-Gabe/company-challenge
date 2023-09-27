# Challenge Monorepo
This is a monorepo created using `Turbo`, to make an easier connection between all the apps contained by the entire application.

Here you can find the documentation about the monorepo as a whole, but if you want a more in-depth explanation of each app and how they're made, you can check their inner README's:

## Apps
- [README](./apps/frontend/README.md) | `frontend`: Made with React, Typescript and Tailwind
- [README](./apps/backend/README.md) | `backend`: REST api in Python and Flask
- [README](./apps/backend/README.md#about-the-policy-db) | `policyDB`: Local database with sqlite and sqlalchemy
- [README](./apps/backend/README.md#how-the-execution-engine-works) | `execution engine`: REST Endpoint made in Python

## Packages
- `eslint-config-custom`: shared `eslint` configurations

## How to run
The repo uses `pnpm` as the package manager, so if you don't have it you can install it using the following:
```
npm install -g pnpm@8.6.10
```
Now you can install the repository dependencies _(for apps and packages)_ by running:
```
pnpm install
```
After installing the dependencies you can use any of the following commands:
- `dev` - Runs development
- `build` - Generates a production build
- `lint` - Lints the project

By default it will run for all apps simultaneously, but if you want to run only a specific app you should use:
```
pnpm dev --scope=<app-name>
```
