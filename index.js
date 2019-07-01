#!/usr/bin/env node

const program = require('commander');
const Crap = require('./src/core');

program
  .version('0.0.2')
  .description(
    'Simple create-react-app applications built from custom presets',
  );

program
  .command('new <directory>')
  .description('Crap out a create-react-app application with a custom preset.')
  .option(
    '-p, --preset <name>',
    'The name of the preset formatted as Username/Repo',
  )
  .option(
    '-b, --branch [branch]',
    'The branch you want to use. Defaults to master',
    'master',
  )
  .action((directory, options) => {
    Crap.new(directory, options);
  });

program.parse(process.argv);
