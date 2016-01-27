var config = require('../config');
if (!config.tasks.copy) return;

var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');

var paths = {
    src: path.join( config.root.src, config.tasks.copy.src, '/**/*'),
    dest: path.join( config.root.dest, config.tasks.copy.dest)
};

var copyTask = function () {
    return gulp
        .src([paths.src])
        .pipe(changed(paths.dest))
        .pipe(gulp.dest(paths.dest))
};

gulp.task('copy', copyTask);
module.exports = copyTask
