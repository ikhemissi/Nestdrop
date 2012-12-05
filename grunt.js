/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  var saucelabskey = null;
	if (typeof process.env.saucelabskey !== "undefined") {
		saucelabskey = process.env.saucelabskey;
	}
  grunt.initConfig({
    pkg: '<json:Nestdrop.jquery.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    'saucelabs-qunit': {
      all: {
        username: 'ikhemissi',
        key: saucelabskey,
        tags: ['master'],
        urls: ['http://127.0.0.1:9999/test/index.html'],
        browsers: [{
          browserName: 'safari',
          platform: 'Windows 2008',
          version: '5'
          }, {
          browserName: 'opera'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
		html2canvas: true,
		process: true
      }
    },
    uglify: {}
  });

  // Loading Saucelabs task
  grunt.loadNpmTasks('grunt-saucelabs-qunit');
  
  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

  // Travis CI task.
  //grunt.registerTask('travis', 'lint qunit concat min');
  
  // Travis CI task + Saucelabs
  grunt.registerTask('travis', 'lint server qunit saucelabs-qunit concat min');

};
