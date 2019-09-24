import VueRouter, { Route } from "vue-router";
import { ModalOptions, ModalConfirm } from "ant-design-vue/types/modal";
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $confirm: (modalOptios: ModalOptions) => ModalConfirm;   // *******让vue下有antd的$confirm方法,无效，待修复
    [key:string]: any;   // 解决ts动态属性赋值的报错
  }
}

// 声明全局的 window ，不然使用 window.XX 时会报错
declare var window: Window;
declare var document: Document;