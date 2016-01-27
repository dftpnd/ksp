var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')
var parallel   = require('gulp-ll');

// Run following tasks in parallel
parallel.tasks(['cssProduction', 'webpack:production', 'images', 'copy', 'fonts', 'html']);

var productionTask = function(cb) {
  var tasks = getEnabledTasks('production');
  var revTask = config.tasks.rev.enabled ? ['rev'] : [];

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, revTask, cb)
}

gulp.task('production', productionTask)
module.exports = productionTask
