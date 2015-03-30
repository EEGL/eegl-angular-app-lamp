'use strict';
// based on yeoman generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.sass({
      outputStyle: 'nested',
      // sourceComments: 'map',
      includePaths: ['app/bower_components'],
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
  var ngAnnotate = require('gulp-ng-annotate');
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', ngAnnotate()))
    .pipe($.if('*.js', $.uglify({mangle: true})))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true, empty: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  var vectorFilter = $.filter('!**/*.svg');
  var jpegRecompress = require('imagemin-jpeg-recompress');

  return gulp.src(['app/images/**/*'], {base: "app/"})
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {convertShapeToPath: false},
        {convertStyleToAttrs: false},
        {mergePaths: false}
      ]
    }))
    .pipe(jpegRecompress({ quality: 'high', min: 60, max: 90 }) )
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  // return $.bowerFiles()
  return gulp.src('app/styles/fonts/**/*.{ttf,woff,eof,eot,svg}')
    .pipe($.flatten()) // now they're scss imports, so I guess I'll need this
    .pipe(gulp.dest('dist/styles/'))
    .pipe($.size());
});
gulp.task('font-awesome', function () {
  // return $.bowerFiles()
  return gulp.src(['app/bower_components/font-awesome/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts/'))
    .pipe($.size());
});

gulp.task('extras', function () {
  return gulp.src(['app/*.*', 'app/data/*.*', '!app/*.html', 'app/templates/**/*.html'], { dot: true, base: "app/"})
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', ['html', 'images', 'fonts', 'font-awesome', 'extras']);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('connect', ['styles'], function () {
  var server = require('express');
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = server()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('app'))
    .use(serveStatic('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'))
    .all('/*', function(req, res) {
      res.sendFile('index.html', { root: 'app' });
    });

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('connect-norl', ['styles'], function () {
  var server = require('express');
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = server()
    .use(serveStatic('app'))
    .use(serveStatic('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'))
    .all('/*', function(req, res) {
      res.sendFile('index.html', { root: 'app' });
    });

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/**/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*',
    // '**/*.php'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
  // gulp.watch('**/*.php', ['html']);
  // gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve', ['connect', 'watch'], function () {
  // require('opn')('http://localhost:9000');
});

gulp.task('server', ['connect-norl'], function () {

  // watch for changes
  gulp.watch([
    'app/**/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*',
  ])

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
});
