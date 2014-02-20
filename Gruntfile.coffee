module.exports = (grunt) ->

  grunt.initConfig

    uglify:
      components:
        options:
          # mangle: false
          compress: true
          wrap: true
        files:
          'public/js/app.js': [
            'bower_components/zeptojs/src/zepto.js'
            'bower_components/zeptojs/src/event.js'
            '_scripts/app.js'
          ]

    less:
      custom:
        options:
          compress: true
        files:
          'public/css/custom.css': '_styles/*.less'

    assemble:
      options:
        flatten: true
        layoutdir: '_templates'
        partials: '_partials/*.hbs'
      pages:
        options:
          layout: 'default.hbs'
        files:
          'public': '_pages/*.hbs'

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

  grunt.registerTask 'default', ['less', 'assemble']
  grunt.registerTask 'jqm', ['shell']

  grunt.loadNpmTasks 'grunt-shell'
  # grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'assemble'
