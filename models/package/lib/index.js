/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-12-18 20:47:23
 * @LastEditTime: 2021-12-25 20:34:08
 * @LastEditors: rodchen
 */
"use strict";

const { isObject } = require("@adapt-cli-dev/utils");
const formatPath = require("@adapt-cli-dev/format-path");

const pkgDir = require("pkg-dir").sync;
const path = require("path");

class Package {
  constructor(options) {
    if (!options) {
      throw new Error("Package类的options参数不能为空");
    }

    if (!isObject(options)) {
      throw new Error("Package类的options参数必须为对象");
    }

    // package路径
    this.targetPath = options.targetPath;

    // package的存储路径
    this.storePath = options.storePath;

    // packageName
    this.packageName = options.packageName;

    // packageVersion
    this.packageVersion = options.packageVersion;
  }

  // 判断当前package是否存在
  exists() {}

  // 安装package
  install() {}

  // 更新package
  update() {}

  // 获取入口文件路径
  getRootFilePath() {
    // 获取package.json所在目录 pkg-dir

    const dir = pkgDir(this.targetPath);
    console.log(dir);

    if (dir) {
      // 读取packahe.json - require
      const pkgFile = require(path.resolve(dir, "package.json"));
      // main/lib - path
      if (pkgFile && pkgFile.main) {
        // 路径的兼容
        return formatPath(path.resolve(dir, pkgFile.main));
      }
    }
    return null;
  }
}

module.exports = Package;
