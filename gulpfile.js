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

// primary

gulp.task('default', ['dev'])

gulp.task('dev', ['live-js'])
gulp.task('build', ['build-nw'])

// util

gulp.task('clean', clean)

// development

gulp.task('live-js', liveJs)

// node-webkit

gulp.task('build-nw', ['build-nw-meta', 'build-nw-js', 'build-nw-html', 'build-nw-package'])
gulp.task('build-nw-meta', ['clean'], buildNwMeta)
gulp.task('build-nw-js', ['clean'], buildNwJs)
gulp.task('build-nw-html', ['build-nw-js'], buildNwHtml)
gulp.task('build-nw-package', ['build-nw-html', 'build-nw-meta'], buildNwPackage)


//
//


// development

var bundler = watchify(browserify('./app/index.js', watchify.args))
// brfs needed for watchify
bundler.transform('brfs')
bundler.on('update', liveJs) // on any dep update, runs the bundler

function liveJs() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    // source maps
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    // output
    .pipe(gulp.dest('./dist'))
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

function buildNwHtml() {
  var inliner = HtmlInline({
    basedir: './dist/',
    ignoreScripts: false,
    ignoreImages: true,
    ignoreStyles: true,
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
