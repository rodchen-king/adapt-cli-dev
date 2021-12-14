/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-13 21:49:58
 * @LastEditTime: 2021-12-14 16:09:20
 * @LastEditors: rodchen
 */
'use strict';

const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');

module.exports = {
    getNpmInfo
};

function getNpmInfo(npmName, registry) {
    if (!npmName) {
        return null;
    }

    const registryUrl = registry || getDefaultRegistry();
    const npmInfoUrl = urlJoin(registryUrl, npmName)
    
    return axios.get(npmInfoUrl).then(response => {
        if (response.status === 200) {
            return response.data;
        } 

        return null
    }).catch(err => {
        return Promise.reject(err)
    })
}

function getDefaultRegistry (isOriginal = false) {
    return isOriginal ? 'https://registry.npmjs.org/' : 'https://registry.npm.taobao.org/'
}