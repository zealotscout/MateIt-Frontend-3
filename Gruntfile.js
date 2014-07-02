module.exports = function(grunt){
  grunt.initConfig({
    copy:{
      build:{
        cwd:'src',
        src:['**','!**/*.styl','!*.jade','!partials/*.jade'],
        dest: 'build',
        expand: true
      },
      production:{
        cwd:'src',
        src:['**','!**/*.styl','!*.jade','!partials'],
        dest: 'production',
        expand: true
      }
    },
    clean:{
      build:{
        src: ['build']
      },
      production:{
        src: ['production']
      }
    },
    stylus:{
      build:{
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.styl' ],
          dest: 'build',
          ext: '.css'
        }]
      },
      production:{
        options: {
          linenos: false,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.styl' ],
          dest: 'production',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      },
      production: {
        expand: true,
        cwd: 'production',
        src: [ '**/*.css' ],
        dest: 'production'
      }
    },
    jade:{
      build:{
        options: {
          data: {}
        },
        files: [{
          preety: true,
          expand: true,
          cwd: 'src',
          src: [ '*.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      },
      production:{
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '*.jade' ],
          dest: 'production',
          ext: '.html'
        }]
      }
    },
    watch:{
      stylesheets:{
        files:'src/css/*.styl',
        tasks: ['stylesheets:build']
      },
      jade:{
        files:['src/*.jade','src/partials/*.jade'],
        tasks: ['jade:build']
      },
      copy:{
        files: ['src/**','!src/css/*.styl','!src/*.jade','!src/partials'],
        tasks: ['copy:build']
      },
      livereload:{
        files:['build/**'],
        options:{
          livereload: true
        }
      }
    },
    connect:{
      server:{
        options:{
          port:4000,
          base: 'build',
          hostname:'*'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('stylesheets:build','compile the stylesheets.',['stylus:build','autoprefixer:build']);
  grunt.registerTask('build','Compiles all the assets and copies the files to build',['clean:build','copy:build','stylesheets:build','jade:build']);
  grunt.registerTask('production','Compiles all the assets, uglify and minify them into production folder',['clean:production','copy:production'])
  grunt.registerTask('default','Watches the project for change, compile jade files and stylus files',['build','connect','watch']);
}