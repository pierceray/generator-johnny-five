'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

	constructor: function(){
		generators.Base.apply(this, arguments);
	},

	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('Johnny-Five') + ' generator!'
		));

		var prompts = [{
			type: 'checkbox',
			name: 'features',
			message: 'What additional features would you like installed?',
			choices: [
				{
					name: 'nodepixel',
					value: 'includeNodePixel',
					checked: false
				}
				,{
					name: 'barcli',
					value: 'includeBarcli',
					checked: false
				}
			]
		}];

		this.prompt(prompts, function (answers) {
			var features = answers.features;

			function hasFeature(feat) {
				return features && features.indexOf(feat) !== -1;
			};

			this.includeNodePixel = hasFeature('includeNodePixel');
			this.includeBarcli = hasFeature('includeBarcli');

			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					appname: this.appname.replace(/\s+/g, '')
				}
			);

			this.fs.copyTpl(
				this.templatePath('_index.js'),
				this.destinationPath('index.js'),
				{
					includeNodePixel: this.includeNodePixel,
					includeBarcli: this.includeBarcli
				}
			);
		},

		projectfiles: function () {
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		}
	},

	install: function () {

		var moduleArray = ['johnny-five'];
		if(this.includeNodePixel){
			moduleArray.push('node-pixel');
		}

		if(this.includeBarcli){
			moduleArray.push('barcli');
		}

		this.npmInstall(moduleArray.join(' '), { 'save': true });
	}
});
