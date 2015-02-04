var fs = require('fs')
var gulp = require('gulp')
var gutil = require('gulp-util')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var watchify = require('watchify')
var browserify = require('browserify')
var HtmlInline = require('html-inline')
var NwBuilder = require('node-webkit-builder')
var del = require('del')
var browserSync = require('browser-sync')
var runSequence = require('gulp-run-sequence')
var connect = require('gulp-connect')
var sass = require('gulp-sass')
var concatCss = require('gulp-concat-css')
var addsrc = require('gulp-add-src')

// primary

gulp.task('default', ['live-dev'])
gulp.task('build', ['build-nw'])

// util

gulp.task('clean', clean)

// development

gulp.task('dev', function(callback){
  runSequence('clean', ['dev-js', 'dev-css', 'dev-html'], callback)
})
gulp.task('dev-js', devJs)
gulp.task('dev-css', devCss)
gulp.task('dev-html', devHtml)

gulp.task('live-dev', ['dev', 'dev-server'], function() {
  gulp.watch('./app/**/*.scss', ['dev-css'])
  gulp.watch('./app/**/*.js', ['dev-js'])
  gulp.watch('./app/**/*.html', ['dev-html'])
  gutil.log(gutil.colors.bgGreen('Watching for changes...'))
})

// node-webkit

gulp.task('build-nw', function(callback){
  runSequence('clean', ['build-nw-meta', 'build-nw-js', 'build-nw-css', 'build-nw-html', 'build-nw-package'], callback)
})
gulp.task('build-nw-meta', buildNwMeta)
gulp.task('build-nw-js', buildNwJs)
gulp.task('build-nw-css', buildNwCss)
gulp.task('build-nw-html', ['build-nw-js', 'build-nw-css'], buildNwHtml)
gulp.task('build-nw-package', ['build-nw-meta', 'build-nw-html'], buildNwPackage)

gulp.task('dev-server', startServer)


//
//


// development

function startServer() {
  connect.server({
    root: './dist',
    livereload: true,
  })
}

var bundler = watchify(browserify('./app/index.js', watchify.args))
// brfs needed for watchify
bundler.transform('brfs')
// bundler.on('update', devJs) // on any dep update, runs the bundler

function devJs() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    // source maps
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    // output
    .pipe(gulp.dest('./dist'))
    // reload
    .pipe(connect.reload())
}

function devCss(){
  return gulp.src('./app/**/*.scss')
    // compile sass
    .pipe(sass())
    // add lib css
    .pipe(addsrc('./lib/flexboxgrid.css'))
    // build bundle
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
}


function devHtml() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
}

// util

function clean(cb) {
  del(['dist'], cb)
}

// node-webkit builds

function buildNwMeta() {
  return gulp.src('./nw-container/package.json')
    .pipe(gulp.dest('./dist/'))
}

function buildNwJs() {
  return browserify('./nw-container/index.js').bundle()
    // log errors
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    // perform bundle
    .pipe(source('bundle.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist/'))
}

function buildNwCss(){
  return gulp.src('./app/**/*.scss')
    .pipe(sass())
    // add lib css
    .pipe(addsrc('./lib/flexboxgrid.css'))
    // build bundle
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest('./dist/'))
}

function buildNwHtml() {
  var inliner = HtmlInline({
    basedir: './dist/',
    ignoreScripts: false,
    ignoreImages: false,
    ignoreStyles: false,
  })
  inliner.on('error', gutil.log.bind(gutil, 'HtmlInline Error'))
  return fs.createReadStream('./app/index.html')
    .pipe(inliner)
    // name it, build it
    .pipe(source('index.html'))
    .pipe(gulp.dest('./dist/'))
}

function buildNwPackage(callback) {
  var nw = new NwBuilder({
    cacheDir: './_cache',
    files: './dist/{package.json,index.html}',
    buildDir: './dist/node-webkit',
    platforms: ['win', 'osx', 'linux'],
  })
  nw.on('log',  console.log)
  nw.build(function (err) {
    if (err) {
      throw err
    } else {
      callback()
    }
  })
}
