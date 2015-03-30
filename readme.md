EEGL Angular App for LAMP stack
===============================

This is an opiniated framework consisiting of leading open-source technologies for web development. It uses the concept of total separation for the frontend and backend. The frontend lives in /app and /dist folders (uncompiled, compiled), the backend in /api and /.htaccess provides the connection between these (also the option to switch between a live preview dev environment and the production one). The framework has to function under certain restrcitions (LAMP stack, no option to edit vhost configutaion ... ).

Frontend setup
=============

The frontend is based on Yeoman's gulp-webapp generator, which means it uses npm, bower and gulp for previewing and building the site.
To get started you'll need to have node.js, npm, bower and gulp installed. If you have these run, 'npm install' && 'bower install' from the root directory to get the dependencies.

Using Gulp
==========

Gulp provides code & image minification, scss precompilation and live preview for the site.
To start a server for preview and live reload, type 'gulp serve'. To build the site, type 'gulp'.
To start a server without livereload, type 'gulp server' – it fires up an expressJS instance, that can be accessed through an apache proxy.

Templates and data
==================

The site utilizes AngularJS as its javascript frontend framework, which provides streamlined templating and 2-way data binding.
The site's data (content & copy) is in 'app/scripts/data.js' or fetched via an async call in main.js. The templates are in 'app/templates/'. The header and footer are located in 'index.html' and Angular loads the appropriate templates into the main view, based on UI Router's configuration in 'app/scripts/app.js'. Common page elements, that span across multiple pages, are in self-contained Angular directives ('/app/scripts/directives/') and templates for those are in 'app/templates/partials/'.

Also there are code blocks / directives avaliable for things like:
- parallax animations
- dynamically loading routes from JSON files
- changing route states based on scroll position

Coding style
============

Coding style is based mostly on GitHub's recomondation for writing JavaScript.

Backend
=======

Backend lives under /api and its pourpose is to provide (possibly) RESTful endpoints.
There are multiple frameworks that can live under there, including laravel/wordpress/plain php.

ToDo
====
- add Jade templating
- bower auto includes
