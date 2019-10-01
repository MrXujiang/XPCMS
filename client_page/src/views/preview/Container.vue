<template>
  <div class="preview-wrap">
    <div class="switch-wrap">
      <a-radio-group :value="curScreen" buttonStyle="solid" @change="toggleScreen">
        <a-radio-button value="0">PC端</a-radio-button>
        <a-radio-button value="1">移动端</a-radio-button>
      </a-radio-group>
    </div>
    <div :class="+curScreen ? 'box mobile' : 'box'">
      <header class="header" :style='{backgroundColor: bgColor, height: height + "px"}'>
        <div class="logo"><img :src="logo" alt=""></div>
        <nav class="nav">
          <div class="nav-link" v-for="(item, i) in columns" :key="i"><router-link :to='{ path: `/preview${item === "首页" ? "" : "/column/" + item}` }'>{{ item }}</router-link></div>
        </nav>
      </header>
      <router-view></router-view>
    </div>
    <span class="close" @click="onClose"><a-icon type="close" /></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapMutations } from 'vuex';

@Component
export default class Home extends Vue {

  public toggleScreen(e:any): void {
    this.$store.commit('setScreen', e.target.value)
  }

  public onClose(): void {
    this.$router.push(sessionStorage.getItem('prevToPreviewPath'));
  }

  get curScreen(): void {
    return this.$store.state.curScreen;
  }

  get columns(): void {
    return this.$store.state.config.header.columns;
  }

  get bgColor(): void {
    return this.$store.state.config.header.backgroundColor;
  }

  get height(): void {
    return this.$store.state.config.header.height;
  }

  get logo(): void {
    return this.$store.state.config.header.logo;
  }

}
</script>

<style lang="less" scoped>
.preview-wrap {
  padding: 50px 20px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0,0,0, .8);
  .switch-wrap {
    width: 200px;
  }
  .box {
    margin-top: 20px;
    width: 1024px;
    height: 600px;
    border-radius: 6px;
    border: 10px solid #fff;
    overflow: auto;
    background-color: #f9fafd;
    &.mobile {
      width: 414px;
      height: 664px;
    }
    .header {
        position: relative;
        padding-left: 12px;
        padding-right: 12px;
        display: flex;
        align-items: center;
        height: 50px;
        background-color: #000;
        .logo {
          display: inline-block;
          width: 120px;
          height: 40px;
          overflow: hidden;
          background-color: rgba(255,255,255,.3);
          img {
            width: 100%;
          }
        }
        .nav {
          margin-left: 20px;
          min-width: 200px;
          white-space: nowrap;
          overflow: auto;
          .nav-link {
            width: 6em;
            display: inline-block;
            text-align: center;
            &::after {
              position: absolute;
              content: '';
              z-index: 0;
              top: 0;
              transform: translateX(-100%);
              display: inline-block;
              width: 6em;
              height: 100%;
              transition: background-color .4s;
            }
            &:hover::after {
              background-color: rgba(255, 255, 255, .3);
            }
            a {
              position: relative;
              z-index: 1;
              display: inline-block;
              width: 100%;
              padding: 10px;
              color: #f0f0f0;
              text-decoration: none;
            }
          }
        }
      }
   } 
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    font-size: 26px;
    cursor: pointer;
  }
</style>

