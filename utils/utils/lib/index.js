/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-05 14:28:34
 * @LastEditTime: 2021-12-25 17:26:11
 * @LastEditors: rodchen
 */
'use strict';

module.exports = {
    isObject
};

function utils() {
    console.log('utils')
}

function isObject(o) {
    return Object.prototype.toString.call(o) === "[object Object]"
}