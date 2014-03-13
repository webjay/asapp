module.exports = (grunt) ->

  grunt.initConfig

    uglify:
      components:
        options:
          mangle: false
          compress: true
          wrap: false
          # sourceMap: true
          # sourceMapIncludeSources: true
        files:
          'public/js/app.js': [
            'bower_components/lodash/dist/lodash.underscore.js'
            'bower_components/backbone/backbone.js'
            'bower_components/backbone-forms/distribution/backbone-forms.js'
            '_tmp/templates.js'
            '_scripts/models/*.js'
            '_scripts/collections/*.js'
            '_scripts/views/*.js'
            '_scripts/*.js'
          ]

    less:
      app:
        options:
          compress: true
        files:
          'public/css/app.css': '_styles/*.less'

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
      bbform:
        options:
          processContent: (src) ->
            src.replace /(^\s+|\s+$)/gm, ''
        files:
          '_tmp/templates.js': '_templates/*.jst'

    watch:
      scripts:
        files: ['_scripts/**/*.js']
        tasks: ['uglify']

  grunt.registerTask 'default', ['less', 'assemble', 'jst', 'uglify']
  grunt.registerTask 'scripts', ['jst', 'uglify']
  grunt.registerTask 'jqm', ['shell']

  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jst'
