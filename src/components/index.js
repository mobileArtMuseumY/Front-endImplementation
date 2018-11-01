import SvgIcon from '@/components/SvgIcon';
import TheNav from '@/components/common/TheNav';
import TheFooter from '@/components/common/TheFooter';
import TimerBtn from '@/components/TimerBtn';
import ProRegistrationBtn from '@/components/ProRegistrationBtn';
import MultiPage from '@/components/MultiPage';
import PromptBox from '@/components/PromptBox';
import WorksItem from '@/components/works/WorksItem';
import ProjectItem from '@/components/project/ProjectItem';
import ProjectItemEpitome from '@/components/project/ProjectItemEpitome';
import TheTalent from '@/components/users/TheTalent';
import { Swiper, Slide } from 'vue-swiper-component';


const components = {
  SvgIcon,
  TheNav,
  TheFooter,
  TimerBtn,
  ProRegistrationBtn,
  MultiPage,
  PromptBox,
  WorksItem,
  ProjectItem,
  ProjectItemEpitome,
  TheTalent,
  Swiper,
  Slide,
};

export default (Vue) => {
  Object.keys(components).forEach((key) =>
    Vue.component(key, components[key]));
};
