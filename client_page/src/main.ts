import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import './component-class-hooks';
import './registerServiceWorker';

import { Button,
         Row,
         Col,
         Form,
         Checkbox,
         Radio,
         Input,
         InputNumber,
         Icon,
         Layout,
         Menu,
         Dropdown,
         Tooltip,
         Tag,
         Table,
         Divider,
         Modal,
         Upload,
         Select,
         Tabs,
         Card,
         Badge,
         message,
         Carousel
      } from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Radio.name, Radio);
Vue.component(Radio.Group.name, Radio.Group);
Vue.component(Radio.Button.name, Radio.Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Icon.name, Icon);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Menu.name, Menu);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Tag.name, Tag);
Vue.component(Table.name, Table);
Vue.component(Divider.name, Divider);
Vue.component(Modal.name, Modal);
Vue.component(Upload.name, Upload);
Vue.component((Upload as any).Dragger.name, (Upload as any).Dragger);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Checkbox.Group.name, Checkbox.Group);
Vue.component(Tabs.name, Tabs);
Vue.component(Tabs.TabPane.name, Tabs.TabPane);
Vue.component(Card.name, Card);
Vue.component(Card.Meta.name, Card.Meta);
Vue.component(Badge.name, Badge);
Vue.component(Carousel.name, Carousel);

Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
