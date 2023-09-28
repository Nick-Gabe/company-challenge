# ConfigFrontend
_React + Typescript + Vite_

## Table of contents:
- [ConfigFrontend](#configfrontend)
  - [Table of contents:](#table-of-contents)
  - [Description](#description)
  - [Commands](#commands)
    - [Run development](#run-development)
    - [Build](#build)
    - [Preview](#preview)
    - [Linting](#linting)
    - [Codebase](#codebase)

## Description
- The frontend is made using React with Typescript, along with Tailwind for styling.
- It also has Eslint and Prettier for greater code quality and maintaining standards.
- It uses ky as the HTTP client to communicate with Backend.

It is structured using two architectures: [FSD](https://feature-sliced.design/) _(Feature Sliced Design)_ and [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) _(Model-view-controller)_.

I decided to use both because taking into account the context of the product, many features could be added to help the user create their execution logic. Besides, MVC is perfect for better visualizing and separating the logic of manipulating data from the user interface.

## Commands
_Ideally you should run commands in the root of the project_

### Run development
```
pnpm dev
```
It will try to start the frontend application in [localhost:5173](http://localhost:5173).

### Build
```
pnpm build
```
It will compile typescript and then generate a production build for React placed in the folder `dist`.

### Preview
```
pnpm preview
```
It starts running the production build that was generated.

### Linting
```
pnpm lint
```
It will check through the code to find inconsistencies, if you use `--fix` along with the command it will try to automatically solve some errors.


### Codebase

```
frontend
├─ public (contains static assets for the frontend)
├─ src/api (houses API-related code and services)
├─ src/app
│   ├─ providers (holds state and context providers)
│   ├─ styles (stores stylesheets and CSS files)
├─ src/contexts (contains React context providers)
├─ src/entities (stores data models and entity-related logic)
├─ src/features (houses feature-specific components and logic)
├─ src/pages (contains page-level components)
├─ src/shared (stores shared components and utilities)
├─ src/widgets (houses reusable widgets and UI components)
├─ .eslintrc.js (configuration file for ESLint)
├─ package.json (contains project scripts and dependencies)
├─ index.html (the main HTML file for your application)
└─ tailwind.config.js (configuration for the Tailwind CSS framework)
```