#! /usr/bin/env node

console.log('欢迎来到我的脚手架11111')
const pkg = require('../package.json');
// const utils = require('@it-fe-dev/utils');

// const yargs = require('yargs/yargs');
// const { hideBin } = require('yargs/helpers');

const cli_cmd = require('../create');

const commander = require('commander');
const { program } = commander;
// const program = new Command();

// const argv = yargs(hideBin(process.env)).argv

// console.log(utils, cli_cmd)
// console.log(process.argv, process.argv[2])
// const [ comd, ...param ] = process.argv.slice(2)
// console.log(comd, param, 'pppp',pkg.version)
// if(comd && comd !== '--help'){
//     cli_cmd[comd]?.(param)
// }else{
//     // console.log('global Usage')
//     program.usage('<command> [options]')
//             .option("-d, --debug", "是否开启调试模式", false)

//     console.log(program.opts())
// }

// yargs.command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
//     console.info(argv)
//   })
//   .demandCommand(1)
//   .parse()

// console.log(yargs(process.argv.slice(2)).parse());
program
  .version(`@vue/cli ${require('../package').version}`)
  .usage('<command> [options]')