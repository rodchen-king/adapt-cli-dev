/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-18 20:32:50
 * @LastEditTime: 2021-12-18 20:45:02
 * @LastEditors: rodchen
 */
'use strict';

module.exports = exec;

function exec() {
    console.log('exec')
    console.log(process.env.CLI_TARGET_PATH)
    console.log(process.env.CLI_HOME)
    // 1. targetPath -》modulePath
    // 2. modulePath -> Package(npm模块)
    // 3. Package.getRootFile(获取入口文件)
    // 4. package.update / package.install

    // 封装 -》 复用
}
