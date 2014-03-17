module.exports = function(grunt) {
	grunt.initConfig({
		extractScript: {
			path: "index.html",
			processingFunction: function(results) {
				console.log(require("sys").inspect(results));
			}
		}
	});

	grunt.loadTasks("tasks");
	grunt.registerTask("default", "extract-script");
};