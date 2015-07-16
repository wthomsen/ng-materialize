// Generated on 2015-07-09 using generator-angular 0.11.1
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').docsPath || 'docs',
    dist: 'dist',
    docsDist: 'gh-pages',
    src: 'src',
    project: {
      name: require('./bower.json').name,
      version: require('./bower.json').version
    }
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsSrc: {
        files: ['<%= yeoman.src %>/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compassSrc: {
        files: ['<%= yeoman.src %>/**/*.{scss,sass}'],
        tasks: ['compass:src', 'autoprefixer:server'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      jade: {
        files: ['<%= yeoman.app %>/**/*.jade'],
        tasks: ['jade:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.{html,jade,css}',
          '<%= yeoman.src %>/**/*.{html,jade,css}',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/bower_components/materialize',
                connect.static('./bower_components/materialize')
              ),
              connect().use(
                '/src',
                connect.static('./src')
              ),
              connect().use(
                '/docs/styles',
                connect.static('./docs/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/src',
                connect.static('./src')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      docsDist: {
        options: {
          open: true,
          base: '<%= yeoman.docsDist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      docsDist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.docsDist %>/**/*',
            '!<%= yeoman.docsDist %>/.git**/*'
          ]
        }]
      },
      dist: '<%= yeoman.dist %>',
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '**/*.css',
          dest: '.tmp/'
        }]
      },
      docsDist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '*.css',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//,
        devDependencies: true,
        exclude: ['bower_components/materialize']
      },
      test: {
        devDependencies: true,
        exclude: ['bower_components/materialize'],
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      docsDist: {
        options: {
          generatedImagesDir: '<%= yeoman.docsDist %>/images/generated'
        }
      },
      dist: {
        options: {
          sourcemap: false,
          noLineComments: true,
          sassDir: '<%= yeoman.src %>',
          cssDir: '<%= yeoman.dist %>'
        }
      },
      src: {
        options: {
          sassDir: '<%= yeoman.src %>',
          cssDir: '.tmp/src'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Compile Jade to HTML
    jade: {
      server: {
        options: {
          pretty: true,
          filters: {
            code: function(block) {
              return block
                .replace( /&/g, '&amp;'  )
                .replace( /</g, '&lt;'   )
                .replace( />/g, '&gt;'   )
                .replace( /"/g, '&quot;' )
                .replace( /#/g, '&#35;'  )
                .replace( /\\/g, '\\\\'  );
            }
          }
        },
        files: grunt.file.expandMapping(['**/*.jade'], '.tmp/', {
          cwd: 'docs',
          rename: function(destBase, destPath) {
            return destBase + destPath.replace(/\.jade$/, '.html');
          }
        })
      }
    },

    concat: {
      dist: {
        src: ['<%= yeoman.src %>/**/*.js'],
        dest: '<%= yeoman.dist %>/<%= yeoman.project.name %>.js'
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      docsDist: {
        src: [
          '<%= yeoman.docsDist %>/scripts/**/*.js',
          '<%= yeoman.docsDist %>/styles/**/*.css',
          '<%= yeoman.docsDist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.docsDist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.docsDist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.docsDist %>/**/*.html'],
      css: ['<%= yeoman.docsDist %>/styles/**/*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.docsDist %>',
          '<%= yeoman.docsDist %>/images',
          '<%= yeoman.docsDist %>/styles'
        ],
        blockReplacements: {
          js: function (block) {
            var i, src, scripts = '';
            for (i = 0; i < block.src.length; i++) {
              src = block.src[i];
              if (src.substring(0, 2) === '//') {
                console.log('adding a src', src);
                scripts += '<script src="' + src + '"></script>';
              }
            }
            scripts += '<script src="' + block.dest + '"></script>';
            return scripts;
          }
        }
      }
    },

    imagemin: {
      docsDist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.docsDist %>/images'
        }]
      }
    },

    svgmin: {
      docsDist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.svg',
          dest: '<%= yeoman.docsDist %>/images'
        }]
      }
    },

    htmlmin: {
      docsDist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.docsDist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.docsDist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      docsDist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '*.js',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // converts views into a single javascript file that uses AngularJS template cache
    ngtemplates:  {
      docsDist: {
        cwd: '.tmp',
        src: 'views/**/*.html',
        dest: '<%= yeoman.docsDist %>/scripts/scripts.js',
        options: {
          module: '<%= yeoman.module %>',
          append: true,
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      }
    },

    // Replace Google CDN references
    cdnify: {
      docsDist: {
        html: ['<%= yeoman.app %>/*.html']
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/<%= yeoman.project.name %>.min.js': ['<%= yeoman.dist %>/<%= yeoman.project.name %>.js']
        }
      }
    },

    cssmin: {
      dist: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          '<%= yeoman.dist %>/<%= yeoman.project.name %>.min.css': ['<%= yeoman.dist %>/<%= yeoman.project.name %>.css']
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      docsDist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.docsDist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/**/*.{webp}',
            'styles/fonts/**/*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.docsDist %>/images',
          src: ['generated/*']
        }]
      },
      dist: {
        expand: true,
        cwd: '.tmp/<%= yeoman.src %>',
        dest: '<%= yeoman.dist %>',
        src: '**/*.css'
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      docsDist: [
        'compass:docsDist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:docsDist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'compass:server',
      'compass:src',
      'autoprefixer:server',
      'jade:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    // Docs build
    'clean:docsDist',
    'wiredep',
    'cdnify',
    'useminPrepare',
    'concurrent:docsDist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:docsDist',
    'cssmin',
    'uglify',
    'ngtemplates:docsDist',
    'filerev',
    'usemin',
    'htmlmin',
    'wiredep', // Rerun to undo cdnify workaround

    // Src build
    'clean:dist',
    'concat:dist',
    'ngAnnotate:dist',
    'compass:dist',
    'autoprefixer:dist',
    'uglify:dist',
    'cssmin:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};