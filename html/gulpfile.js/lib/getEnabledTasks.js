var config = require('../config')
var compact = require('lodash/array/compact')

// Grouped by what can run in parallel
var assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'copy']
var codeTasks = ['html', 'css', 'js']

module.exports = function(env) {
  var jsTasks = {
    watch: 'webpack:watch',
    development: 'webpack:watch',
    production: 'webpack:production'
  }
  var cssTasks = {
    watch: 'css',
    development: 'css',
    production: 'cssProduction'
  }

  var matchFilter = function(task) {
    if(config.tasks[task]) {
      if(task === 'js') {
        task = jsTasks[env] || jsTask.watch
      }
      if(task === 'css' && config.tasks.rev.enabled === false) {
        task = cssTasks[env] || cssTask.watch
      }
      return task
    }
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter)),
    codeTasks: compact(codeTasks.map(matchFilter))
  }
}
