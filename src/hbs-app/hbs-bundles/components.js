import { Application } from 'stimulus';
import { definitionsFromContext } from 'stimulus/webpack-helpers';

const application = Application.start();

const context = require.context('../fe-components', true, /\.js$/);

application.load(definitionsFromContext(context));

// SCSS - Dependency
require('stylesheets/index.scss');

// HBS - Base Layout
require('handlebars/layouts/base.hbs');

// HBS - Pages
require('handlebars/pages/index.hbs');
require('handlebars/pages/home-page.hbs');

// HBS - Components

