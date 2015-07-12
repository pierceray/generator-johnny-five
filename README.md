# generator-johnny-five

[![Join the chat at https://gitter.im/pierceray/generator-johnny-five](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/pierceray/generator-johnny-five?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/pierceray/generator-johnny-five.svg?branch=master)](https://travis-ci.org/pierceray/generator-johnny-five)

> [Yeoman](http://yeoman.io) generator that scaffolds out a [Johnny-Five](http://johnny-five.io) project

## Features
* [Johnny-Five](http://johnny-five.io) project file creation
* `.jshintrc` from the Johnny-Five project
* `package.json` creation and dependency additions
* Preset configurations for [Particle](https://www.particle.io/) and Raspberry Pi
* Optional Library Installs
	* [barcli](https://github.com/dtex/barcli)
	* [j5-songs](https://github.com/julianduque/j5-songs)
	* [node-pixel](https://github.com/ajfisher/node-pixel)
	* [oled-js](https://github.com/noopkat/oled-js)

## Getting Started

Not every new computer comes with a Yeoman pre-installed.

```
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-johnny-five from npm, run:

```
npm install -g generator-johnny-five
```

Finally, initiate the generator:

```
yo johnny-five
```

## License

MIT
