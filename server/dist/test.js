"use strict";

// 进程
const cluster = require('cluster'); // 获取cpus APi


const cpus = require('os').cpus(); // 获取cpu核数


const len = cpus.length; // 启动子进程

const worker = cluster.fork(); // 子进程可以存储在变量里
// 获取进程pid

const pid = process.pid; // 退出进程

process.exit(); // 判断进程是否是子进程

const isMaster = cluster.isMaster; // 进程间通信

/** 主进程 */
//监听信息

worker.on('message', message => {
  console.log(message);
}); // 发送信息

worker.send({
  mes: 'dddd'
});
/** 子进程 */

process.on('message', message => {
  console.log(message);
});
process.send({
  mes: 'ddd'
});