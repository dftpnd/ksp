var config       = require('../config')
if(!config.tasks.css) return

var gulp         = require('gulp')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass')
var minify       = require('gulp-minify-css')
var handleErrors = require('../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

config.tasks.css.sass.functions = require('../lib/sassFunctions');

var cssTask = function () {
  return gulp.src(paths.src)
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(minify())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('cssProduction', cssTask)
module.exports = cssTask
