'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);
	},

	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('Johnny-Five') + ' generator!'
		));

		var prompts = [{
			type: 'list',
			name: 'projectType',
			message: 'What type of project would you like to create?',
			choices: [{
				name: 'Johnny-Five (standard)',
				value: 'useJohnnyFive'
			}, {
				name: 'Particle (formerly Spark) microcontroller',
				value: 'useParticle'
			}, {
				name: 'Raspberry Pi',
				value: 'useRasPi'
			}]
		}, {
			type: 'checkbox',
			name: 'features',
			message: 'What additional libraries would you like installed with your project?',
			choices: [{
				name: 'barcli',
				value: 'includeBarcli',
				checked: false
			}, {
				name: 'j5-songs',
				value: 'includej5Songs',
				checked: false
			}, {
				name: 'nodepixel',
				value: 'includeNodePixel',
				checked: false
			}, {
				name: 'oled-js',
				value: 'includeOledJS',
				checked: false
			}]
		}, {
			type: 'string',
			name: 'licenseType',
			message: 'What type of license should this project have?',
			default: 'MIT'
		}];

		this.prompt(prompts, function(answers) {
			var features = answers.features;

			function hasFeature(feat) {
				return features && features.indexOf(feat) !== -1;
			};

			this.licenseType = answers.licenseType;
			this.projectType = answers.projectType;
			this.includeBarcli = hasFeature('includeBarcli');
			this.includej5Songs = hasFeature('includej5Songs');
			this.includeNodePixel = hasFeature('includeNodePixel');
			this.includeOledJS = hasFeature('includeOledJS');

			this.pkgJsonName = _s.slugify(this.appname);

			done();
		}.bind(this));
	},

	writing: {
		app: function() {
			this.template('_package.json', 'package.json');
			this.template('_index.js', 'index.js');
		},

		projectfiles: function() {
			this.copy('jshintrc', '.jshintrc');
		}
	},

	install: function() {

		var moduleArray = ['johnny-five'];

		if (this.includeNodePixel) {
			moduleArray.push('node-pixel');
		}

		if (this.includej5Songs) {
			moduleArray.push('j5-songs');
		}

		if (this.includeBarcli) {
			moduleArray.push('barcli');
		}

		if (this.includeOledJS) {
			moduleArray.push('oled-js');
		}

		this.npmInstall(moduleArray.join(' '), {
			'save': true
		});
	}
});
