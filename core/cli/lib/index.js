/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-05 14:28:02
 * @LastEditTime: 2021-12-14 16:50:03
 * @LastEditors: rodchen
 */
'use strict';

module.exports = core

// rquire支持加载的类型: .js / .json / .node
// js => module.exports/exports
// json => JSON.parse
// node => c++ Addon
// any =》 默认通过js引擎解析
const path = require('path')
const semver = require('semver');
const log = require('@adapt-cli-dev/log');
const colors = require('colors/safe');
const userHome = require('user-home');
const pathExists = require('path-exists');
const minimist = require('minimist')

const constant = require('./constant')
const pkg = require('../package.json');
const { domainToASCII } = require('url');

let args, config;

async function core() {
    try {
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
        checkInputArgs()
        checkEnv()
        await checkGlobalUpdate()
        log.verbose('debug', 'test debug log')
    } catch(e) {
        log.error(e.message)
    }
}

async function checkGlobalUpdate() {
    // 获取当前版本号和模块名
    const currentVersion = pkg.version;
    const npmName = pkg.name;
    // 调用npm api，获取所有版本号
    const { getNpmSemverVersion } = require("@adapt-cli-dev/get-npm-info");
    const lastVersion = await getNpmSemverVersion(currentVersion, npmName)

    if (lastVersion && semver.gt(lastVersion, currentVersion)) {
        log.warn(colors.yellow(`请手动更新${npmName}，当前版本：${currentVersion}，最新版本：${lastVersion}
        更新命令：npm install -g ${npmName}`))
    }
    // 提取所有的版本号，比对哪些版本号是大于当前版本号
    // 获取最新的版本号，提示用户更新到最新的版本号
}

function checkEnv() {
    const dotenv = require('dotenv');
    const dotenvPath = path.resolve(userHome, '.env');  // 配置环境变量
    
    if (pathExists(dotenvPath)) {
        dotenv.config({
            path: dotenvPath
        });
    }

    config = createDefaultConfig();
    log.verbose('环境变量', process.env.CLI_HOME)
}

function createDefaultConfig(){
    const cliConfig = {
        home: userHome
    };

    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
    } else {
        cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME)
    }

    process.env.CLI_HOME = cliConfig.cliHome
}

function checkInputArgs() {
    args = minimist(process.argv.slice(2));
    checkArgs()
}

function checkArgs() {
    if (args.debug) {
        process.env.LOG_LEVEL = 'verbose'
    } else {
        process.env.LOG_LEVEL = 'info'
    }

    log.level = process.env.LOG_LEVEL
}

function checkUserHome() {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('当前用户主目录不存在'))
    }
}

function checkRoot() {
    const rootCheck = require('root-check');
    rootCheck();
}

function checkPkgVersion () {
    console.log(pkg.version)
}

function checkNodeVersion() {
    const lowestVersion = constant.LOWEST_NODE_VERSION;
    const currentVersion = process.version;
    
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`adapt-cli 需要安装 ${currentVersion} 以上的版本 Node.js`))
    }

}