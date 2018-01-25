# README

## What is this repository for?

Front End code repo for **Adroit Site Generator kit**

## Prerequisites

* Node v8.3.0
* NPM v5.6.0

### Technologies

The client side application is comprised of the following technologies:

#### For generating Static Markup - AEM Components on Server Side

* [Handlebars](http://assemble.io/)
* [Assemble](http://assemble.io/)

#### For Client Side

* [ReactJS](http://react-bootstrap.github.io/)
* [Redux](http://redux.js.org/)
* [React-Router](https://github.com/rackt/react-router)

#### Build Tools, Transpiler & Package Manager

* [Babel](https://babeljs.io/)
* [Webpack](https://webpack.js.org/)
* [Gulp](https://gulpjs.com/) - Only for Assemble.io plugin as that is not available in Webpack
* [NPM](https://www.npmjs.com/)

### Developer Tools

#### [VS Code](https://code.visualstudio.com/)

Visual Studio Code is a free code editor redefined and optimized for building and debugging modern web and cloud applications.

##### VS Code - User Preference

```json
{
	"editor.formatOnSave": true,
	"[handlebars]": {
		"editor.formatOnSave": false
	},
	"editor.renderWhitespace": "all"
}
```

##### VS Code Plugins

* [Editor Config](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [JavaScript ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [SASS linter](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint)

### Getting Started - Code & Environment - Setup

* Go to the root folder (where package.json is available) and run the following command:s

```bash
$ npm install
```

* Go to the root folder and then to generators folder (where package.json is available) and run the following command:s

```bash
$ npm install
```

* Go back to the root folder and then run below command to start the server:

```bash
$ npm start
```

#### Create FE Components

Please use the below command to create any new command:

```bash
$ node generators --name <component-name> --dir <director name>
```

## How to Build & Run

Build application for Dev Env and runs webpack-dev-server

> npm run web

Linting JavaScript code from command line

> npm run lint

Build & Analyse the Webpack Build

> npm run build:analyse

Simulate Prod Server: To avoid webpack-dev-server [publicPath & assets issue] after deployment

> npm run serve
