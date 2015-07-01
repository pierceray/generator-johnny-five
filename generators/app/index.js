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

			for (var name in answers) {
				if (answers.hasOwnProperty(name)){
					this[name] = answers[name];
				}
			}

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

		this.npmInstall(moduleArray.join(' '), { 'save': true });
	}
});
