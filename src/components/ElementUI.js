import Vue from 'vue';
import {
  Form,
  FormItem,
  Button,
  Message,
  Input,
  Loading,
  Upload,
  Option,
  Select,
} from 'element-ui';

Vue.prototype.$message = Message;

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Upload);
Vue.use(Option);
Vue.use(Select);
