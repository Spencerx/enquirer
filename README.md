# enquirer [![NPM version](https://img.shields.io/npm/v/enquirer.svg?style=flat)](https://www.npmjs.com/package/enquirer) [![NPM downloads](https://img.shields.io/npm/dm/enquirer.svg?style=flat)](https://npmjs.org/package/enquirer) [![Build Status](https://img.shields.io/travis/jonschlinkert/enquirer.svg?style=flat)](https://travis-ci.org/jonschlinkert/enquirer)

Intuitive, plugin-based prompt system for node.js. Much faster and lighter alternative to Inquirer, with all the same prompt types and more, but without the bloat.

## Table of Contents

- [Install](#install)
- [What is this?](#what-is-this)
- [Why another prompt modules?](#why-another-prompt-modules)
- [Usage](#usage)
- [API](#api)
- [Prompt types](#prompt-types)
  * [Publishing prompt types](#publishing-prompt-types)
- [Plugins](#plugins)
  * [Publishing plugins](#publishing-plugins)
- [About](#about)
  * [Related projects](#related-projects)
  * [Contributing](#contributing)
  * [Building docs](#building-docs)
  * [Running tests](#running-tests)
  * [Author](#author)
  * [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save enquirer
```

## What is this?

This is a faster, lighter, plugin-based alternative to [inquirer](https://github.com/sboudrias/Inquirer.js), with support for all of the same prompt types and features.

## Why another prompt modules?

We use prompts extensively in [generate](https://github.com/generate/generate), [verb](https://github.com/verbose/verb), [update](https://github.com/update/update) and [assemble](https://github.com/assemble/assemble), and other libries we maintain, and we wanted to improve the user experience and reduce dependencies associated with other libraries we tried, like Inquirer.

**Initial load time**

Enquirer takes **~11ms** to load. This is about the same amount of time that it takes [chalk](https://github.com/chalk/chalk) to load.

By comparison, Inquirer takes **~120ms just to load**!!! This is about how long it takes babel, or other massive libraries that you would never include in production code.

Regardless of whether or not a prompt is every actually used, your own application will be 120ms slower from having Inquirer in its dependency tree. This is caused by its own massive dependency tree, code redundancy, monolithic and slow [reactive interface](https://github.com/SBoudrias/Inquirer.js#reactive-interface) (which makes little sense for this use case anyway), poor API design (Inquirer actually executes code, even if you never call the library!), and so on.

120ms might not seem like a lot, but there is a critical threshold where performance of an application begins to feel laggy, and this cuts into that threshold significantly, leaving less room for everything else.

## Usage

```js
var enquirer = require('enquirer');
```

## API

### [Enquirer](index.js#L17)

Create an instance of `Enquirer` with the given `options`.

**Params**

* `options` **{Object}**

**Example**

```js
var enquirer = new Enquirer();
```

### [.register](index.js#L73)

Register a new prompt `type` with the given `fn`.

**Params**

* `type` **{String}**: The name of the prompt type
* `fn` **{Function}**: Prompt function that inherits from [enquirer-prompt](https://github.com/enquirer/enquirer-prompt).
* `returns` **{Object}**: Returns the Enquirer instance for chaining.

**Example**

```js
enquirer.register('confirm', require('enquirer-prompt-confirm'));
```

### [.use](index.js#L92)

Invoke a plugin `fn`

**Params**

* `fn` **{Function}**: Function that takes an instance of `Enquirer`
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
enquirer.use(require('some-enquirer-plugin'));
```

### [.question](index.js#L112)

Create question `name` with the given `message` and `options`. Uses [enquirer-question](https://github.com/enquirer/enquirer-question), visit that library for additional details.

**Params**

* `name` **{String|Object}**: Name or options object
* `message` **{String|Object}**: Message or options object
* `options` **{Object}**
* `returns` **{Object}**: Returns the created question object

**Events**

* `emits`: `question`

**Example**

```js
var question = enquirer.question('name', 'What is your name?');
```

### [.ask](index.js#L162)

Initialize a prompt session for one or more questions.

* `returns` **{Array|Object}** `questions`: One or more question objects or names of registered questions.

**Events**

* `emits`: `ask` With the array of `questions` to be asked

**Example**

```js
enquirer.question('first', 'First name?');
enquirer.question('last', 'Last name?');

enquirer.ask('first')
  .then(function(answers) {
    console.log(answers)
  });
```

### [.prompt](index.js#L196)

Initialize a prompt session for a single question. Used by the [ask](#ask) method.

**Params**

* `name` **{String}**

**Events**

* `emits`: `prompt` with the `default` value, `key`, `question` object, and `answers` object
* `emits`: `answer` with the `answer` value, `key`, `question` object, and `answers` object

**Example**

```js
enquirer.question('first', 'First name?');
enquirer.prompt('first')
  .then(function(answers) {
    console.log(answers)
  });
```

## Prompt types

**What is a prompt "type"?**

Prompt types determine the type of question, or prompt, to initiate. Currently, the only prompt type included in enquirer is `input`.

The following types are all available as plugins (note that all of these modules are finished, I'm pushing them up one-by-one, and will check them off as I go):

* [ ] `checkbox` ([enquirer-prompt-checkbox][])
* [ ] `confirm` ([enquirer-prompt-confirm][])
* [ ] `editor` ([enquirer-prompt-editor][])
* [ ] `expand` ([enquirer-prompt-expand][])
* [x] `input` ([enquirer-prompt-input](https://github.com/jonschlinkert/enquirer-prompt-input)) (included in enquirer by default)
* [ ] `list` ([enquirer-prompt-list][])
* [ ] `password` ([enquirer-prompt-password][])
* [ ] `radio` ([enquirer-prompt-radio][])
* [ ] `rawlist` ([enquirer-prompt-rawlist][])

Or you can use [enquirer-prompts][], if you want a bundle with all of the listed prompt types.

### Publishing prompt types

Prompt modules are named using the convention `enquirer-prompt-*`.

TBC

## Plugins

TODO

### Publishing plugins

Plugin modules are named using the convention `enquirer-*`.

TBC

## About

### Related projects

* [enquirer-prompt](https://www.npmjs.com/package/enquirer-prompt): Base prompt module used for creating custom prompt types for Enquirer. | [homepage](https://github.com/enquirer/enquirer-prompt "Base prompt module used for creating custom prompt types for Enquirer.")
* [enquirer-question](https://www.npmjs.com/package/enquirer-question): Question object, used by Enquirer and prompt plugins. | [homepage](https://github.com/enquirer/enquirer-question "Question object, used by Enquirer and prompt plugins.")
* [prompt-choices](https://www.npmjs.com/package/prompt-choices): Create an array of multiple choice objects for use in prompts. | [homepage](https://github.com/enquirer/prompt-choices "Create an array of multiple choice objects for use in prompts.")
* [readline-utils](https://www.npmjs.com/package/readline-utils): Readline utils, for moving the cursor, clearing lines, creating a readline interface, and more. | [homepage](https://github.com/enquirer/readline-utils "Readline utils, for moving the cursor, clearing lines, creating a readline interface, and more.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for avice on opening issues, pull requests, and coding standards.

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/enquirer/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on August 28, 2016._