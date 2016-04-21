/*jshint node:true */
module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );
	grunt.loadNpmTasks( 'grunt-cssjanus' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-banana-checker' );
	grunt.loadNpmTasks( 'grunt-jscs' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		less: {
			site: {
				files: {
					'assets/MWStew.css': 'src/less/MWStew.less'
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			site: [
				'assets/MWStew.css'
			]
		},
		cssjanus: {
			options: {
				generateExactDuplicates: true
			},
			site: {
				files: {
					'assets/MWStew.rtl.css': 'assets/MWStew.css'
				}
			}
		},
		banana: {
			all: 'i18n/'
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: [
				'*.js',
				'src/**/*.js',
				'!node_modules/**'
			]
		},
		jscs: {
			src: [
				'<%= jshint.all %>'
			]
		},
		concat: {
			dist: {
				options: {
					banner: grunt.file.read( 'build/banner.txt' )
				},
				dest: 'assets/MWStew.js',
				src: [
					'src/js/mwstew.js',
					'src/js/mwstew.init.js',
					'src/js/widgets/HookItemOptionWidget.js',
					'src/js/widgets/HooksCapsuleMultiSelectWidget.js',
					'src/js/widgets/HooksSelectWidget.js'
				]
			}
		}
	} );

	grunt.registerTask( 'default', [ 'lint', 'build' ] );
	grunt.registerTask( 'lint', [ 'csslint', 'banana', 'jshint', 'jscs' ] );
	grunt.registerTask( 'build', [ 'less', 'cssjanus', 'concat' ] );
};
