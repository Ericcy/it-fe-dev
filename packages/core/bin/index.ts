#! /usr/bin/env node

console.log('欢迎来到我的脚手架')
const pkg = require('../package.json');
const dedent = require('dedent');
// const utils = require('@it-fe-dev/utils');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const arg = hideBin(process.argv);
const cli = yargs(arg);

const context = {
  hahaVersion: pkg.version
}

cli
  .usage('Usage: $0 <cmd> [args]')
  .demandCommand(1, "A command is required. Pass --help to see all available commands and options.")
  .recommendCommands()
  .strict()
  .alias('h', 'help')
  .alias('v', 'version')
  .wrap(cli.terminalWidth())
  .epilogue(dedent`
  When a command fails, all logs are written to lerna-debug.log in the current working directory.

  For more information, find our manual at https://github.com/lerna/lerna
`)
  .options({ // 增加选项
    debug: { // 相当于增加了一个--debug选项，类型是布尔，描述是'Bootstrap debug mode'
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd', // --debug的缩写-d，也可以使用上面的alias
      hidden: false, // 这个options存在，但是可以控制--help的时候是否显示，一般用作内部开发用
    }
  })
  .option('register', { // 跟options的区别是options可以批量注册options，而option只能单个注册
    type: 'string',
    describe: 'define global registry',
    alias: 'r',
    hidden: false, // 这个options存在，但是可以控制--help的时候是否显示，一般用作内部开发用
  })
  .group(['debug'], 'Dev Options:')        // 对已经注册的options进行分类
  .group(['register'], 'Publish Options:')
  // 以上主要是注册option
  // 以下主要是注册command
  /*
    注册命令使用command方法有2两种
      第一种：.command('init [name]', 'Do init a project', (yargs) => {}, (argv) => {})
        参数(4个):
          第一个参数：命令格式
            命令格式中的[option]，在builder函数中注册
          第二个参数：描述
          第三个参数：builder函数
            参数为yargs
          第四个参数：handler函数
            参数为argv，命令输入时的参数
      第二种：
        参数(1个)：对象类型
        .command({
          command: 'list',
          aliases: ['ls', 'la', 'll'],
          describe: 'list local packages',
          builder: (yargs) => {},
          handler: (argv) => {
            console.log(argv)
          }
        })
  */
  .command({
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: 'list local packages',
    builder: (yargs) => {},
    handler: (argv) => {
      console.log('handler', argv)
    }
  })
  // .argv;     // 调用.argv，完成yargs初始化，这时候，输入hahayh --help 或 hahayh --version就能显示帮助信息或版本了
  // 最后也可以不用.argv，改成parse方法
  .parse(arg, context) // 这个parse作用是将参数arg和context合并，注入到yargs中,当你输入hahayh ls 的时候，argv中（handler函数中）就有hahaVersion了，这个hahaVersion就来自于context

  // 定义脚手架的时候，别名不能重复，否则会覆盖
  // 别名可以单数alias，单数时为字符串；也可以复数aliases，复数时为数组

  cli.command('init [name]', 'Do init a project', (yargs) => {
    yargs.option('name', {
      type: 'string',
      describe: 'Name of a project',
      alias: 'n'
    })
  }, (argv) => {
    console.log('执行命令', argv);
    /*
      如果你输入的命令是hahayh init -d -r npm -n yh-test
      则得到的argv是：
      { _: [ 'init' ],
        d: true,
        debug: true,
        r: 'npm',
        register: 'npm',
        n: 'yh-test',
        name: 'yh-test',
        '$0':
        '..\\..\\..\\AppData\\Roaming\\npm\\node_modules\\haha-cli\\bin\\index.js' }
    */
  })
  .description('create a new project powered by vue-cli-service')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')