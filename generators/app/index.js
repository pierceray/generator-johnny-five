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
      type: 'input',
      name: 'sparkToken',
      message: 'What is your Particle Access token string?',
      when: function(answers) {
        return answers.projectType === 'useParticle';
      }
    }, {
      type: 'input',
      name: 'sparkDeviceID',
      message: 'What is your Particle device id string?',
      when: function(answers) {
        return answers.projectType === 'useParticle';
      }
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
      type: 'list',
      name: 'testing',
      message: 'What type of unit testing would you like to use?',
      choices: [{
        name: 'none',
        value: 'includeNone'
      }, {
        name: 'NodeUnit',
        value: 'includeNodeUnit'
      }]
    }, {
      type: 'string',
      name: 'licenseType',
      message: 'What type of license should this project have?',
      default: 'MIT'
    }];

    return this.prompt(prompts)
      .then(function(answers) {
        var features = answers.features;

        function hasFeature(feat) {
          return features && features.indexOf(feat) !== -1;
        }

        this.licenseType = answers.licenseType;
        this.projectType = answers.projectType;
        this.includeBarcli = hasFeature('includeBarcli');
        this.includej5Songs = hasFeature('includej5Songs');
        this.includeNodePixel = hasFeature('includeNodePixel');
        this.includeOledJS = hasFeature('includeOledJS');
        this.testing = answers.testing;
        if (this.projectType === 'useParticle') {
          this.sparkToken = answers.sparkToken;
          this.sparkDeviceID = answers.sparkDeviceID;
        }

        this.pkgJsonName = _s.slugify(this.appname);
      }.bind(this));
  },

  writing: function() {
    // package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this
    );

    // main file for j5 applicaiton
    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'),
      this
    );

    // jshint files for the j5 app
    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );

    this.fs.copy(
      this.templatePath('jshintignore'),
      this.destinationPath('.jshintignore')
    );

    // Node Unit
    if (this.testing === 'includeNodeUnit') {
      this.fs.copy(
        this.templatePath('_nodeunittests.js'),
        this.destinationPath('test/' + this.pkgJsonName + '-tests.js')
      );
    }
  },

  install: function() {

    var moduleArray = ['johnny-five'];
    var devModuleArray = [];
    if (this.projectType === 'useParticle') {
      moduleArray.push('spark-io');
    }

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

    devModuleArray.push('jshint');

    if (this.testing === 'includeNodeUnit') {
      devModuleArray.push('nodeunit');
    }

    this.npmInstall(devModuleArray.join(' '), {
      'save-dev': true
    });
  }
});
