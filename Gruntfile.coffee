module.exports = (grunt) ->

  grunt.initConfig

    uglify:
      components:
        options:
          # mangle: false
          compress: true
          wrap: true
        files:
          'lib/index.js': [
            'bower_components/zeptojs/src/zepto.js'
            'bower_components/zeptojs/src/event.js'
            '_scripts/index.js'
          ]

    cssmin:
      combine:
        options:
          keepSpecialComments: 0
        files:
          'lib/the.css': [
            '_styles/main.css'
          ]

    assemble:
      options:
        flatten: true
        layoutdir: '_templates'
        partials: '_partials/*.hbs'
      pages:
        options:
          layout: 'default.hbs'
        files:
          '.': [
            '_pages/*.hbs'
          ]

    shell:
      jqmNpmInstall:
        command: 'npm install'
        options:
          stdout: true
          execOptions:
            cwd: 'bower_components/jquery-mobile'
      jqmBowerInstall:
        command: 'grunt dist'
        options:
          stdout: true
          execOptions:
            cwd: 'bower_components/jquery-mobile'

  grunt.registerTask 'default', ['assemble']
  # grunt.registerTask 'default', ['assemble', 'cssmin', 'uglify']
  grunt.registerTask 'jqm', ['shell']

  grunt.loadNpmTasks 'grunt-shell'
  # grunt.loadNpmTasks 'grunt-contrib-uglify'
  # grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'assemble'
