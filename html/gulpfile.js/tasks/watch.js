var config = require('../config')
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')
var parallel   = require('gulp-ll');

// Run following tasks in parallel
parallel.tasks(['css', 'images', 'copy', 'fonts', 'html']);

var watchTask = function() {
  var watchableTasks = ['fonts', 'iconFont', 'images', 'copy', 'svgSprite', 'html', 'css']

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName]
    if(task) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      watch(glob, function() {
       require('./' + taskName)()
      })
    }
  })
}

gulp.task('watch', ['browserSync'], watchTask)
module.exports = watchTask
