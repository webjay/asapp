module.exports = (grunt) ->

  grunt.initConfig

    uglify:
      bootstrap:
        options:
          compress: false
          mangle: false
        files:
          '_tmp/bootstrap.js': [
            # 'bower_components/bootstrap/js/tab.js'
            # 'bower_components/bootstrap/js/alert.js'
            'bower_components/bootstrap/js/modal.js'
            # 'bower_components/bootstrap/js/collapse.js'
            # 'bower_components/bootstrap/js/transition.js'
            'bower_components/bootstrap/js/button.js'
            'bower_components/bootstrap/js/dropdown.js'
          ]
      components:
        options:
          compress: false
          mangle: false
          # mangle: {
          #   except: ['jQuery', '$', 'Backbone', '_', 'io']
          # }
        files:
          '_tmp/components.js': [
            'bower_components/jquery/dist/jquery.js'
            'bower_components/jQuery.serializeObject/dist/jquery.serializeObject.min.js'
            'bower_components/lodash/dist/lodash.underscore.js'
            'bower_components/backbone/backbone.js'
            'bower_components/momentjs/moment.js'
            'bower_components/socket.io-client/socket.io.js'
          ]
      app:
        options:
          # compress: true
          compress: false
          sourceMap: true
          sourceMapIncludeSources: true
          mangle: false
        files:
          'public/js/app.js': [
            '_tmp/components.js'
            '_tmp/bootstrap.js'
            '_tmp/templates.js'
            '_scripts/models/*.js'
            '_scripts/collections/*.js'
            '_scripts/views/*.js'
            '_scripts/lib/*.js'
            '_scripts/*.js'
          ]

    less:
      bootstrap:
        options:
          compress: true
          paths: ['_scripts/less', 'bower_components/bootstrap/less']
        files:
          'public/css/bootstrap.min.css': ['_scripts/less/bootstrap.less']
      app:
        files:
          '_tmp/app.css': '_styles/*.less'

    cssmin:
      all:
        files:
          'public/css/app.css': [
            '_tmp/app.css'
            'bower_components/bootstrap-select/bootstrap-select.css'
          ]

    copy:
      bootstrap:
        cwd: 'bower_components/bootstrap/dist/fonts/'
        src: '*'
        dest: 'public/fonts/'
        expand: true
        filter: 'isFile'

    assemble:
      options:
        flatten: true
        layoutdir: '_templates'
        partials: '_partials/*.hbs'
      app:
        options:
          layout: 'default.hbs'
        files:
          'public': '_pages/*.hbs'

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
        tasks: ['uglify:app']
      jst:
        files: ['_templates/*.hjs']
        tasks: ['jst', 'uglify:app']
      style:
        files: ['_styles/*.less']
        tasks: ['less', 'cssmin']
      assemble:
        files: ['_partials/*.hbs', '_pages/*.hbs', '_templates/*.hbs']
        tasks: ['assemble']

  grunt.registerTask 'default', ['copy', 'less', 'cssmin', 'assemble', 'jst', 'uglify']
  grunt.registerTask 'scripts', ['jst', 'uglify']

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jst'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
