#!/usr/bin/env node

const program = require('commander');
const Crap = require('./src/core');

program
  .version('1.0.1')
  .description(
    'Simple create-react-app applications built from custom presets',
  );

program
  .command('new <directory>')
  .description('Crap out a create-react-app application with a custom preset.')
  .action((directory, options) => {
    Crap.new(directory, options);
  });

program.parse(process.argv);
