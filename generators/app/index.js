'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

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
			type: 'string',
			name: 'licenseType',
			message: 'What type of license should this project have?',
			default: 'MIT'
		},{
			type: 'confirm',
			name: 'useParticle',
			message: 'Are you using a Particle (formerly Spark) microcontroller?',
			default: false
		},{
			type: 'confirm',
			name: 'useRasPi',
			message: 'Are you using a Raspberry Pi?',
			default: false,
			when: function( response ){ return !response.useParticle; }
		},{
			type: 'checkbox',
			name: 'features',
			message: 'What additional libraries would you like installed?',
			choices: [
				{
					name: 'barcli',
					value: 'includeBarcli',
					checked: false
				},
				{
					name: 'nodepixel',
					value: 'includeNodePixel',
					checked: false
				},
				{
					name: 'oled-js',
					value: 'includeOledJS',
					checked: false
				}
			]
		}];

		this.prompt(prompts, function ( answers ) {
			var features = answers.features;

			function hasFeature(feat) {
				return features && features.indexOf(feat) !== -1;
			};

			this.licenseType = answers.licenseType;
			this.useParticle = answers.useParticle;
			this.useRasPi = answers.useRasPi;
			this.includeNodePixel = hasFeature('includeNodePixel');
			this.includeBarcli = hasFeature('includeBarcli');
			this.includeOledJS = hasFeature('includeOledJS');

			this.pkgJsonName = _s.slugify(this.appname);

			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			this.template( '_package.json', 'package.json' );
			this.template( '_index.js', 'index.js' );
		},

		projectfiles: function () {
			this.copy('jshintrc','.jshintrc');
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

		if(this.includeOledJS){
			moduleArray.push('oled-js');
		}

		this.npmInstall(moduleArray.join(' '), { 'save': true });
	}
});
