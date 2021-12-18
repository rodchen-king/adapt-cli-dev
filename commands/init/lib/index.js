/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-17 16:09:18
 * @LastEditTime: 2021-12-18 20:21:11
 * @LastEditors: rodchen
 */
'use strict';

module.exports = init;

function init(projectName, cmdObj) {
    // console.log('init1', projectName, cmdObj.force, cmdObj.parent.targetPath)
    console.log('init1', projectName, cmdObj.force, process.env.CLI_TARGET_PATH)
  }
