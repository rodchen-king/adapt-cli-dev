/*
 * @Description: 
 * @Author: rodchen
 * @Date: 2021-12-13 16:47:18
 * @LastEditTime: 2021-12-17 14:14:47
 * @LastEditors: rodchen
 */
'use strict';



const log = require('npmlog');

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.heading = 'adapt';
log.headingStyle = {fg: 'white', bg: 'black'}

log.addLevel('verbose', 1000, {fg: 'blue', bg: 'black'}, 'verb')
log.addLevel('info', 2000, {fg: 'green'})
log.addLevel("notice", 3500, { fg: "blue", bg: 'black' });
log.addLevel('warn', 4000, {fg: 'black', bg: 'yellow'}, 'WARN');
log.addLevel('error', 5000, {fg: 'red', bg: 'black'}, 'ERR!');
log.addLevel('silent', Infinity);


module.exports = log;