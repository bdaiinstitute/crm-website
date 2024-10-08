# GitHub pages example <!-- omit from toc -->

[![ProjectPage](https://img.shields.io/badge/Project-Page-Green)](https://effective-funicular-2kqy14r.pages.github.io/)
[![CI](https://github.com/bdaiinstitute/crm-website/actions/workflows/deploy.yaml/badge.svg)](https://github.com/bdaiinstitute/crm-website/actions/workflows/deploy.yaml)

## Table of Contents <!-- omit from toc -->

- [Introduction](#introduction)
- [Website deployment](#website-deployment)
- [Dependencies](#dependencies)
  - [Node.js](#nodejs)
  - [nvm](#nvm)
  - [npm](#npm)
  - [pnpm](#pnpm)
  - [Vite](#vite)
- [How to build and run the website locally](#how-to-build-and-run-the-website-locally)
- [Extra packages](#extra-packages)
- [Development environment](#development-environment)
- [Project layout](#project-layout)

## Introduction

This repository houses the source code for the Contact Rich Manipulation project website.

## Website deployment

The website's development is managed within the `main` branch of this repository.

Each commit to the `main` branch automatically triggers a GitHub Action, as specified in the `gh-pages.yaml` workflow file. This automated process builds the website and deploys the resulting assets to the `gh-pages` branch.

GitHub Pages utilizes the `gh-pages` branch to host and serve the compiled website, ensuring it is publicly accessible. This configuration effectively segregates the development process (`main` branch) from the deployment process (`gh-pages` branch).

The URL for the published website can be found under the "Pages" section in the project settings menu.

## Dependencies

### Node.js

Node.js is an open-source, cross-platform JavaScript runtime environment that enables developers to execute JavaScript code outside of a web browser. It provides the essential tools for modern JavaScript development, making it easy to manage dependencies for our React project.

### nvm

`nvm` (Node Version Manager) is a utility that simplifies the installation, management, and switching between different versions of Node.js. You can install nvm by following the instructions in this tutorial:

https://github.com/nvm-sh/nvm#install--update-script

Once installed, you can set up the LTS version of Node.js with the following commands:

```bash
nvm install --lts
nvm ls-remote --lts
nvm use --lts
```

### npm

`npm` (Node Package Manager) comes bundled with Node.js and is widely used to manage and distribute JavaScript packages. React and its related libraries are available through npm.

### pnpm

`pnpm` (Performant npm) is a fast and efficient package manager for JavaScript, offering an alternative to npm and yarn. It is used in this project to create, compile, and run the React application locally. To install pnpm, run the following command:

```bash
npm install --g pnpm
```

### Vite

Vite is a modern build tool and development server optimized for frontend frameworks like React. This project was initialized using Vite with the following command:

```bash
pnpm create vite . --template react-ts
```

## How to build and run the website locally

To install all required dependencies and run the website run the following commands:

```bash
pnpm install
pnpm build
pnpm dev
```

- **pnpm install:** This is for setting up the environment and downloading all required packages.

- **pnpm build:** This is only necessary when preparing for production deployment. During development, you generally don't need to run it unless you want to test a production build.

- **pnpm dev** This is sufficient for running your app in development mode after installing dependencies.

## Extra packages

The typical way to add additional packages to the React project is using the following command:

```bash
pnpm add <package>
```

Examples:

```bash
pnpm add @fortawesome/fontawesome-svg-core
pnpm add @fortawesome/free-brands-svg-icons
pnpm add @fortawesome/free-solid-svg-icons
pnpm add @fortawesome/react-fontawesome
pnpm add jpswalsh/academicons
pnpm add three @types/three @react-three/fiber @react-three/drei
pnpm add urdf-loader
pnpm add react-hot-toast
```

## Development environment

We use VSCode and Chrome to develop and test this website.

**VSCode**

Install the following extensions in VSCode.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): this extension integrates ESLint into VS Code. To install ESLint run

  ```bash
  pnpm install -g eslint
  ```

- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense): plugin to autocomplete filenames.

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): it is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary. To install Prettier run:

  ```bash
  pnpm install -g prettier
  ```

- [React Import Sorter](https://marketplace.visualstudio.com/items?itemName=MrOnline.react-import-sorter): extension to sort imports.

**Chrome**

Install the following extensions in Chrome.

- [React Development Tools](https://chromewebstore.google.com/detail/fmkadmapgofadopljbjfkapdkoienihi): it adds React debugging tools to the Chrome Developer Tools.

## Project layout

- **dist/:** This folder contains the production-ready, compiled output of your project. After building the project (usually with Vite or another build tool), all the files required for deployment, including optimized JavaScript, CSS, and other assets, are placed in this directory. This is the folder that gets served to users in a live environment, such as GitHub Pages.

- **public/:** This folder contains static assets used by the website such as images or HTML files.

- **src/:** This folder contains the React application's source code.

- **.env:** This file is used to define environment variables.

- **.npmrc:** This is a configuration file for npm and pnpm. It contains various settings related to npm's functionality, such as registry URLs, authentication tokens, package versioning rules, and other preferences.

- **.prettierrc:** This is a configuration file used by Prettier, an opinionated code formatter that ensures consistent formatting for your code.

- **eslint.config.js:** This file contains the configuration for ESLint, a static code analysis tool used to identify and fix problems in JavaScript and TypeScript code. It defines linting rules, environments, and any custom settings for code quality enforcement.

- **package.json:** This is the core file for managing a Node.js project. It lists the project's metadata (name, version, etc.), dependencies, scripts, and configuration for the project, including the packages required to run and build the application.

- **pnpm-lock.yaml:** This file is automatically generated by pnpm. It locks the exact versions of dependencies used in the project, ensuring that the same dependency versions are installed each time, helping maintain consistency across different environments.

- **tsconfig.app.json:** This file is a TypeScript configuration specifically for the application's code. It typically extends the base tsconfig.json and customizes settings for compiling the main application code, such as module resolution and compiler options.

- **tsconfig.json:** The main TypeScript configuration file. It defines compiler options, file inclusions, and project-specific settings for TypeScript. It is often extended by other TypeScript configuration files for more specific use cases.

- **tsconfig.node.json:** This configuration file is tailored for Node.js-specific code in a TypeScript project. It includes settings and compiler options that are relevant when writing Node.js scripts or server-side code.

- **vite.config.ts:** This is the configuration file for Vite, the build tool and development server. It defines settings related to how Vite builds and serves the project, including plugins, paths, and optimizations tailored for your frontend framework (like React).
