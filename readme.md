# EEGL Angular App v1.0

This is an opinionated framework consisting of leading open-source technologies for web development. It uses the concept of total separation for the frontend and backend. The frontend lives in `/client` and `/dist` folders (uncompiled, compiled), the backend in `/api` and `/.htaccess` provides the connection between these (also the option to switch between a live preview dev environment and the production one). The framework has to function under certain restrictions (LAMP stack, no option to edit vhost configuration ... ).

## Frontend setup

The frontend is based on Yeoman's gulp-webapp generator, which means it uses npm, bower and gulp for previewing and building the site.
To get started you'll need to have node.js, npm, bower and gulp installed. If you have these run, `npm install && bower install` from the root directory to get the dependencies.
You may need to build modernizr:
```js
cd bower_components/modernizr/
npm install
./bin/modernizr -c lib/config-all.json
//outputs to ./modernizr.js
```

##  Gulp

Gulp provides code & image minification, scss precompilation and live preview for the site.
- To start a server for preview and live reload, type `gulp serve` – it fires up an expressJS instance, that can be accessed through an apache proxy, or directly by visiting `http://localhost:9000`.
- To build the site, type `gulp`.

## Auto injecting JavaScript

Gulp searches for all scripts under `/client/app/` and injects them into `index.html`. You'll still need to take care of vendor dependencies, as wiredep is not enabled by default in the gulpfile.

## Templates and data

The site utilizes AngularJS as its javascript frontend framework, which provides streamlined templating and 2-way data binding.
The site's data (content & copy) is in `/client/data/data.js` or fetched in the router's `resolve` method (check the styleguide](https://github.com/EEGL/eegl-styleguide/blob/master/angular-styleguide.md#routing-resolves) for examples). The templates are in `/client/app/*/**`. The header and footer are located in `index.html` and Angular loads the appropriate templates into the main view, based on UI Router's configuration in `/client/app/app.config.js`. Common page elements, that span across multiple pages, are in self-contained directives (`/client/app/directives/`).

Also there are code blocks / directives available for things like:
- parallax animations
- dynamically loading routes from JSON files
- changing route states based on scroll position

## Coding style

There is a [styleguide](https://github.com/EEGL/eegl-styleguide/blob/master/angular-styleguide.md), read it.

## Backend

Backend lives under /api and its purpose is to provide (possibly) RESTful endpoints.
There are multiple frameworks that can live under there, including laravel/wordpress/plain php.

## License

Copyright (c) 2015-2016 EEGL Interactive Kft.

This work is licensed under a [Creative Commons Attribution-NoDerivatives 4.0 International License](http://creativecommons.org/licenses/by-nd/4.0/).
