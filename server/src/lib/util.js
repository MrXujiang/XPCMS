// 实现服务端类java的睡眠函数
export function sleep(cb, time) {
    return new Promise((resolve, rejects) => {
      setTimeout(() => {
        resolve(cb());
      }, time);
    });
  }