"use strict";

(() => {
  process.send({
    name: '111'
  }); // 退出进程

  process.exit(0);
})();