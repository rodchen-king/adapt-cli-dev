/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-13 21:49:58
 * @LastEditTime: 2021-12-14 16:45:11
 * @LastEditors: rodchen
 */
'use strict';

const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');

module.exports = {
    getNpmInfo,
    getNpmVersions,
    getNpmSemverVersion
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

async function getNpmVersions(npmName, registry) {
    const data = await getNpmInfo(npmName, registry)

    if (data) {
        return Object.keys(data.versions);
    } else {
        return []
    }
}

function getSemverVersions(baseVersion, versions) {

    versions = versions.filter(version => semver.lt(baseVersion, version)).sort((a, b) => semver.gt(b, a))  // 大于当前version版本)
    return versions;
}

async function getNpmSemverVersion(baseVersion, npmName, registry) {
    const versions = await getNpmVersions(npmName, registry);;
    const newVersions = getSemverVersions(baseVersion, versions)

    if (newVersions && newVersions.length > 0) {
        return newVersions[0]
    }
}