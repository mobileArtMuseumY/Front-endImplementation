import SvgIcon from '@/components/SvgIcon';
import TheNav from '@/components/TheNav';
import TheFooter from '@/components/TheFooter';
import TimerBtn from '@/components/TimerBtn';
import ProRegistrationBtn from '@/components/ProRegistrationBtn';
import MultiPage from '@/components/MultiPage';
import PromptBox from '@/components/PromptBox';
import WorksDisplay from '@/components/WorksDisplay';


const components = {
  SvgIcon,
  TheNav,
  TheFooter,
  TimerBtn,
  ProRegistrationBtn,
  MultiPage,
  PromptBox,
  WorksDisplay,
};

export default (Vue) => {
  Object.keys(components).forEach((key) =>
    Vue.component(key, components[key]));
};
