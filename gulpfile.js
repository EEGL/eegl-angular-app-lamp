'use strict';
// based on yeoman generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('client/assets/styles/main.scss')
    .pipe($.plumber())
    .pipe($.sass({
      outputStyle: 'nested',
      sourceComments: 'map',
      includePaths: ['/bower_components'],
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest('.tmp/assets/styles'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src('client/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
    .pipe($.size());
});

gulp.task('index', function () {
  var angularFilesort = require('gulp-angular-filesort'),
      inject = require('gulp-inject')

  return gulp.src('./client/index.html')
    .pipe(inject(
      gulp.src('./client/app/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
        .pipe(angularFilesort()),
      {relative: true}))
    .pipe(gulp.dest('./client'))
})

gulp.task('html', ['styles', 'scripts'], function () {
  var ngAnnotate = require('gulp-ng-annotate');

  return gulp.src('client/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.' ,'bower_components']}))
    .pipe($.if('*.js', ngAnnotate()))
    .pipe($.if('*.js', $.uglify({mangle: true})))
    .pipe($.if('*.css', $.csso()))
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true, empty: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  var jpegRecompress = require('imagemin-jpeg-recompress');

  return gulp.src(['client/assets/images/**/*'], {base: 'client/assets/'})
    .pipe($.if('!**/*.svg', $.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {convertShapeToPath: false},
        {convertStyleToAttrs: false},
        {mergePaths: false}
      ]
    })))
    // .pipe(jpegRecompress({ quality: 'high', min: 60, max: 90 }) )
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  // return $.bowerFiles()
  return gulp.src('client/fonts/**/*.{ttf,woff,eof,eot,svg,css}')
    // .pipe($.flatten()) // if they're scss imports, we'll need this
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

gulp.task('font-awesome', function () {
  // return $.bowerFiles()
  return gulp.src(['client/bower_components/font-awesome/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts/'))
    .pipe($.size());
});

gulp.task('extras', function () {
  return gulp.src(['client/*.*', 'client/data/*.*', '!client/*.html', 'client/app/**/*.html'], { dot: true, base: "client/"})
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', ['index', 'html', 'images', 'fonts', 'font-awesome', 'extras']);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('client/styles/*.scss')
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(gulp.dest('client/styles'));

  gulp.src('client/*.html')
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('client'));
});

gulp.task('connect', ['index', 'styles'], function () {
  var server = require('express');
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = server()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('client'))
    .use(serveStatic('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in client/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('client'))
    // redirect all requests to /, so angular will take care of routing
    .all('/*', function(req, res) {
      res.sendFile('index.html', { root: 'client' });
    });

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'client/**/*.html',
    '.tmp/styles/**/*.css',
    'client/**/*.js',
    'client/assets/images/**/*',
  ]).on('change', $.livereload.changed);

  gulp.watch('client/assets/styles/**/*.scss', ['styles']);
  gulp.watch('client/**/*.js', ['index','scripts']);
  gulp.watch('client/assets/images/**/*', ['images']);
});

gulp.task('serve', ['connect', 'watch']);
