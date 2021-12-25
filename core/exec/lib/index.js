/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-18 20:32:50
 * @LastEditTime: 2021-12-25 20:26:57
 * @LastEditors: rodchen
 */
'use strict';

const Package = require('@adapt-cli-dev/pakage')
// 1. targetPath -》modulePath
// 2. modulePath -> Package(npm模块)
// 3. Package.getRootFile(获取入口文件)
// 4. package.update / package.install

// 封装 -》 复用

const SETTINGS = {
    init: '@adapt-cli-dev/init'
}


function exec() {
    let targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME;

    const cmdObj = arguments[arguments.length - 1];
    const cmdObjName = cmdObj.name();
    const packageName = SETTINGS[cmdObjName]
    const packageVersion = 'latest'

    if(!targetPath) {
        targetPath = ''; // 生成缓存路径
    }

    const pag = new Package({
        targetPath,
        packageName,
        packageVersion
    });

    const filename = pag.getRootFilePath()
    console.log(filename)
}

module.exports = exec;
