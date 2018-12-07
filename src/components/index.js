import SvgIcon from '@/components/SvgIcon';
import TheNav from '@/components/common/TheNav';
import TheFooter from '@/components/common/TheFooter';
import TimerBtn from '@/components/TimerBtn';
import ProRegistrationBtn from '@/components/ProRegistrationBtn';
import PromptBox from '@/components/PromptBox';
import WorksItem from '@/components/works/WorksItem';
import ProjectItem from '@/components/project/ProjectItem';
import ProjectItemEpitome from '@/components/project/ProjectItemEpitome';
import TheTalent from '@/components/users/TheTalent';
import { Swiper, Slide } from 'vue-swiper-component';
import WorksDetailsSelf from '@/components/works/WorksDetailsSelf';
import WorksItemsSelf from '@/components/works/WorksItemsSelf';


const components = {
  SvgIcon,
  TheNav,
  TheFooter,
  TimerBtn,
  ProRegistrationBtn,
  PromptBox,
  WorksItem,
  ProjectItem,
  ProjectItemEpitome,
  TheTalent,
  Swiper,
  Slide,
  WorksDetailsSelf,
  WorksItemsSelf
};

export default (Vue) => {
  Object.keys(components).forEach((key) =>
    Vue.component(key, components[key]));
};
