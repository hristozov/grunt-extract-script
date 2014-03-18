module.exports = function (grunt) {
	grunt.registerTask(
		"extract-script",
		"Extracts script tags from a HTML file.",
		function () {
			var config = grunt.config.get("extractScript");
			if (!config || !config.path) {
				grunt.fail.fatal("No path defined.");
			}
			var HtmlParser = require("htmlparser");
			var rawHtml = grunt.file.read(config.path);
			var handler = new HtmlParser.DefaultHandler(function (error, dom) {
				if (error) {
					grunt.fail.fatal("Could not parse the HTML file.");
				} else {
					var scripts = HtmlParser.DomUtils.getElements({
						tag_name: "script"
					}, dom);
					var results = scripts.map(function (scriptNode) {
						return (scriptNode.attribs || {}).src;
					}).filter(function (scriptPath) {
						return !!scriptPath;
					});
					if (config.processingFunction) {
						config.processingFunction(results);
					}
				}
			});
			var parser = new HtmlParser.Parser(handler);
			parser.parseComplete(rawHtml);
		});
};