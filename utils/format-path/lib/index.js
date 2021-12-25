/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-12-25 20:28:47
 * @LastEditTime: 2021-12-25 20:34:19
 * @LastEditors: rodchen
 */
"use strict";

module.exports = formatPath;

const path = require("path");

function formatPath(p) {
  if (p) {
    const sep = path.sep;

    if (sep === "/") {
      return p;
    } else {
      return p.replace(/\\/g, "/");
    }
  }
  return p;
}
