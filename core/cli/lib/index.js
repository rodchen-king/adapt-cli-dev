/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-05 14:28:02
 * @LastEditTime: 2021-12-13 21:09:25
 * @LastEditors: rodchen
 */
'use strict';

module.exports = core

// rquire支持加载的类型: .js / .json / .node
// js => module.exports/exports
// json => JSON.parse
// node => c++ Addon
// any =》 默认通过js引擎解析
const smver = require('semver');
const log = require('@adapt-cli-dev/log');
const colors = require('colors/safe');
const userHome = require('user-home');
const pathExists = require('path-exists');
const minimist = require('minimist')

const constant = require('./constant')
const pkg = require('../package.json');

let args;

function core() {
    try {
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
        checkInputArgs()
        log.verbose('debug', 'test debug log')
    } catch(e) {
        log.error(e.message)
    }
}

function checkInputArgs() {
    args = minimist(process.argv.slice(2));
    console.log(args)
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
    
    if (!smver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`adapt-cli 需要安装 ${currentVersion} 以上的版本 Node.js`))
    }

}