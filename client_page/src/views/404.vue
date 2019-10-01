<template>
  <div class="page-404">
      <a-icon type="frown" />
      <p>页面未发现，<router-link to="/">回首页</router-link></p>
  </div>
</template>

<style lang="less" scoped>
    .page-404 {
        display: flex;
        height: 100vh;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 100px;
        p {
            margin-top: 20px;
            font-size: 18px;
        }
    }
</style>
