import SvgIcon from '@/components/SvgIcon';
import TheNav from '@/components/TheNav';
import TheFooter from '@/components/TheFooter';

const components = {
  SvgIcon,
  TheNav,
  TheFooter,
};

export default (Vue) => Object.keys(components).forEach((key) => Vue.component(key, components[key]));

