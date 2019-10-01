"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;

// 实现服务端类java的睡眠函数
function sleep(cb, time) {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      resolve(cb());
    }, time);
  });
}