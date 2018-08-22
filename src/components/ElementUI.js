import Vue from 'vue';
import {
  Form,
  FormItem,
  Button,
  Message,
  Input,
  Loading,
} from 'element-ui';

Vue.prototype.$message = Message;

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Loading);
