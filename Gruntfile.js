module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({ pkg: grunt.file.readJSON('package.json'), 
	
		less: {
			options: {
				paths: 'css/less',
				yuicompress: true
			},
			files: {
				'public/stylesheets/style.css': 'public/stylesheets/style.less'
			}
		},

		watch: {
			less: {
				files: 'public/stylesheets/*.less',
				tasks: 'less'
			}
		}

	});
}