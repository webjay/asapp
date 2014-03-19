module.exports = (grunt) ->

  grunt.initConfig

    uglify:
      components:
        options:
          compress: false
          mangle: false
          # mangle: {
          #   except: ['jQuery', '$']
          # }
        files:
          'public/js/app.js': [
            'bower_components/jquery/dist/jquery.js'
            'bower_components/jQuery.serializeObject/dist/jquery.serializeObject.min.js'
            'bower_components/lodash/dist/lodash.underscore.js'
            'bower_components/backbone/backbone.js'
            'bower_components/momentjs/moment.js'
            'bower_components/pusher/dist/pusher.js'
            '_tmp/templates.js'
            '_scripts/models/*.js'
            '_scripts/collections/*.js'
            '_scripts/views/*.js'
            '_scripts/*.js'
            'bower_components/jquery-mobile/dist/jquery.mobile.js'
          ]

    less:
      app:
        files:
          '_tmp/app.css': '_styles/*.less'

    cssmin:
      all:
        files:
          'public/css/app.css': [
            'bower_components/jquery-mobile/dist/jquery.mobile.css'
            '_tmp/app.css'
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

    jst:
      app:
        options:
          processContent: (src) ->
            src.replace /(^\s+|\s+$)/gm, ''
        files:
          '_tmp/templates.js': '_templates/*.hjs'

    watch:
      options:
        atBegin: true
      scripts:
        files: ['_scripts/**/*.js']
        tasks: ['uglify']
      jst:
        files: ['_templates/*.hjs']
        tasks: ['jst', 'uglify']
      style:
        files: ['_styles/*.less']
        tasks: ['less', 'cssmin']
      assemble:
        files: ['_partials/*.hbs', '_pages/*.hbs', '_templates/*.hbs']
        tasks: ['assemble']

  grunt.registerTask 'default', ['less', 'cssmin', 'assemble', 'jst', 'uglify']
  grunt.registerTask 'scripts', ['jst', 'uglify']
  grunt.registerTask 'jqm', ['shell']

  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jst'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
