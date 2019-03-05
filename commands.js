const program = require('commander');

program
  .version('0.0.1')
  .description('App Builder');

program
  .command('build <app name>')
  .alias('a')
  .description('Build an app')
  .action('require('./index.js').run()');

program.parse(process.argv);
