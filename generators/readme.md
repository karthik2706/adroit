# generator

> node generator for creating components.

## Install

    npm install

## Usage

Using the default path, specify the name of the component.

    node path/to/generator --name component-name

see `componentsDir` in config.js for the default path

using a custom path, specify the path using the `--dir` property:

    node path/to/generator --name component-name --dir path/to/component

ex:

    node generator --name booking-header --dir booking

This will add the booking-header component inside `path/to/default/folder/booking/` folder

## Config / Setup

Create `config.js` in the root folder of the project. See `config.js` for
example.

Create a folder for all your template files. All files will from this folder will
be copied with to your new component folder. Any file name `template` will be
replaced with the name of the component.

### componentsDir

Type: `string`

The path to the folder where all components live.

### templatesDir

Type: `string`

The path to the folder where all templates live.

Optional path to describe where test files should be generated.

## Available regex

The following list is available string that will be replaced during the creation
of each file.

  - `{component-name}` - foo-bar
  - `{separate-component-name}` - FooBar (capitalize each word)
  - `{module-name}` - fooBar
  - `{date}` - Fri Oct 21 2016
  - `{version}` - 1.0.0
  - `{dir}` - path/to/final/location (`--dir`)
