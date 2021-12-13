/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-05 14:28:02
 * @LastEditTime: 2021-12-13 19:52:50
 * @LastEditors: rodchen
 */
'use strict';

module.exports = core

// rquire支持加载的类型: .js / .json / .node
// js => module.exports/exports
// json => JSON.parse
// node => c++ Addon
// any =》 默认通过js引擎解析
const pkg = require('../package.json');
const log = require('@adapt-cli-dev/log');

function core() {
    console.log('exec log 1')
    checkPkgVersion()
}

function checkPkgVersion () {
    console.log(pkg.version)
    log.info('info', 'info')
    log.notice('notice', 'notice')
    log.warn('warn', 'warn')
    log.error('error', 'error')
    log.silent('silent', 'silent')

}