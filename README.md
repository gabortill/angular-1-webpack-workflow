# AngularJS 1 workflow
Front-end workflow for angular 1 projects based on webpack

## How to start
```sh
git clone https://github.com/gabortill/angular-1-webpack-workflow.git YOUR-PROJECT-NAME
cd YOUR-PROJECT-NAME
npm install
npm start
```

## Features
Import scss files to the module
```js
import './root.css';
import angular from 'angular';

angular.module('root', []);
```

Import html files to the component
```js
import template from './root.html';

export default {
    template,
};
```

#### .js
- lint
- babel
- hash generated filename
- ngAnnotate
- watch

#### .test.js
- code coverage generated to `./coverage` folder
- code coverage overview after every `npm test` in the terminal

#### .css
- import to component
- minify
- sourceMap
- hash generated filename
- watch

#### index.html
- copy to dist folder
- .css file name is hashed after every generation
- .js file name is hashed after every generation

#### .html
- lint
- minify
- import to component
- watch

## Recommended folder structure
```
src/
┣━ index.html
┃
┗━ app/
    ┣━ root.component.js
    ┣━ root.html
    ┣━ root.module.js
    ┣━ root.scss
    ┃
    ┣━ components/
    ┃  ┣━ components.module.js
    ┃  ┃
    ┃  ┣━ home/
    ┃  ┃   ┣━ home.component.js
    ┃  ┃   ┣━ home.controller.js
    ┃  ┃   ┣━ home.controller.test.js
    ┃  ┃   ┣━ home.html
    ┃  ┃   ┣━ home.module.js
    ┃  ┃   ┣━ home.scss
    ┃  ┃   ┣━ home.service.js
    ┃  ┃   ┗━ home.service.test.js
    ┃  ┃
    ┃  ┗━ calendar/
    ┃      ┣━ calendar.component.js
    ┃      ┣━ calendar.controller.js
    ┃      ┣━ calendar.controller.test.js
    ┃      ┣━ calendar.html
    ┃      ┣━ calendar.module.js
    ┃      ┣━ calendar.scss
    ┃      ┣━ calendar.service.js
    ┃      ┣━ calendar.service.test.js
    ┃      ┃
    ┃      ┗━ calendar-grid/
    ┃          ┣━ calendar-grid.component.js
    ┃          ┣━ calendar-grid.controller.js
    ┃          ┣━ calendar-grid.controller.test.js
    ┃          ┣━ calendar-grid.html
    ┃          ┣━ calendar-grid.module.js
    ┃          ┣━ calendar-grid.scss
    ┃          ┣━ calendar-grid.service.js
    ┃          ┗━ calendar-grid.service.test.js
    ┃
    ┗━ styles/
        ┗━ colors.css
```

## Scripts
- `npm run check:dependencies` check for outdated, incorrect, and unused dependencies
- `npm run build` generates a dist folder which contains the production ready code
- `npm run build:open` npm run build then opens the app in the browser
- `npm run commit` prompts conventional commit message interface
- `npm run lint:all` runs all the linting scripts
- `npm run lint:html` runs the html linting
- `npm run lint:js` runs the js linting
- `npm run lint:sass` runs the sass linting
- `prepush` git hook fires all the linting and test before every git push
- `npm start` serves your application
- `npm test` runs unit tests and code coverage
