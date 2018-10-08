<template>
  <div class="container">
    <!-- <pro-registration-btn></pro-registration-btn> -->
    <div class="main">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
        <el-form ref="ruleForm" :model="ruleForm" class="ruleForm">
        <el-form-item label="为您的项目取个名字吧">
          <el-input v-model="ruleForm.projectName" placeholder="创建项目名称..."></el-input>
        </el-form-item>
        <el-form-item label="告诉我们更多关于您项目的信息" >
          <el-input type="textarea" v-model="ruleForm.textarea" placeholder="请输入您项目的详细信息..."></el-input>
        </el-form-item>
        <div class="upload">
          <el-upload
            ref="upload"
            :action="uploadUrl()"
            accept="image/jpeg,image/png"
            :limit="3"
            :on-exceed="handleExceed"
            :auto-upload="true"
            :file-list="fileList"
            :before-upload="onBeforeUpload"
            :on-change="uploadAttachment"
            :on-remove="deleteAttachment"
            :on-success="onSuccess"
            :multiple="true"
            list-type="picture">
            <el-button class="button uploadFile">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">可上传任何能帮助你描述项目的图片</div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </div>
        </el-form>
        <label>您选择需要的技能</label>
        <el-select v-model="ruleForm.selecSkill" multiple filterable placeholder="搜索技能...">
        <el-option
          v-for="item in skills"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
        <br>
        <el-form ref="ruleForm" :model="ruleForm" class="ruleForm">
        <el-form-item label="您项目投标时间段为？" >
          <el-input v-model.number="ruleForm.bidPeriod" type="number" placeholder="时间为1-10天..."></el-input>
        </el-form-item>
        <el-form-item label="您大致的预算是多少？" >
          <el-input v-model.number="ruleForm.budget" type="number" placeholder="预算估计..."></el-input>
        </el-form-item>
        </el-form>
        <label>您预计的项目交易时间(从您确定投稿者到您项目结束)是多少天？</label>
        <el-select v-model="transaPeriod" placeholder="请选择" @change="changeValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
       <button class="button publishProject" @click="publishProject()">发布项目</button>
    </div>
    </div>
  </div>
</template>

<script>
/**
 * 作用：企业发布项目
 * 角色：企业
 * 样式要求：
 *   1. “提醒注册”栏始终置顶(获取用户登录状态确定是否展示)
 * 进度：
 *   1. 完成基本样式                                            //已完成
 *   2. “我的技能”请求发送成功                                   //已完成
 *   3. “发布时间”请求发送成功(页面打开默认)                      //未完成
 *   4. “关注度”请求发送成功                                     //未完成
 *   5. 当用户未注册时，如何将“pro-registration-btn”组件插入页面  //未完成
 * 问题：
 *   1. 样式好像有点丑。。。
 *   2. 上传文件
 *   3. 上传图片框的height应该随着图片的增加而增长，最多显示三张，多余的往下翻“更多”(删除，最多上传3张)
 *   4. 下边框应该和图片重合                                     //已完成
 *   5. skill的个数未知，应该如何控制“选项几”？                  //已完成
 *   6. 表单和文件是否需要异步传输？
 *   7. 技能应该是多选的，返回一个数组(目前只实现了单选)          //已完成
 *   8. 当页面缩小时，组件不能随着页面缩小而缩小(需要改用vw作为单位)
 *   9. 还有点问题！！！怎么将用户上传的文件加入到fileList？？    // 已完成
 */
import { getSkillList, publishProjectForm, publishProjectFile } from '@/api/project';
import { enterpriseSignUpFile } from '@/api/user';

export default {
  data() {
    return {
      title: '告诉我们您需要完成的事情',
      transaPeriod: '',        // 用于v-model
      ruleForm: {
        projectName: '',
        textarea: '',
        selecSkill: [], // 被选中的skill
        bidPeriod: '',
        budget: '',
        transaPeriod: Number,      // 用于提交表单
      },
      fileList: [],
      options: [
        {
          value: '选项1',
          label: '15',
        },
        {
          value: '选项2',
          label: '20',
        },
        {
          value: '选项3',
          label: '25',
        },
        {
          value: '选项4',
          label: '30',
        },
      ],
      projectSkill: [], // 用来接收请求到的skill
      skills: [], // 用来存储另一种格式的skill，本地需要用到的格式
      fileData: {
        projectId: Number,
      },
    };
  },
  methods: {
    uploadUrl() {
      return '/api/project/upload';
    },
    uploadAttachment(file) {
      this.fileList.push(file);
    },
    deleteAttachment(file) {
      this.fileList.pop(file);
    },
    handleExceed() {
      this.$message.error(`最多只能上传3个文件！,共选择了 ${this.fileList.length} 个文件！`);
    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg' || file.type === 'image/png';
      const isL1M = file.size / 1024 / 1024 < 3;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是jpeg/png格式!');
        return false;
      }
      if (!isL1M) {
        this.$message.error('上传文件大小不能超过1M!');
        return false;
      }
      return isIMAGE && isL1M;
    },
    onSuccess() {
      this.$message.success('文件上传成功！');
    },
    // 获取transaPeriod中select中的值
    changeValue(value) {
      let obj = {};
      obj = this.options.find((item) => {
        return item.value === value;
      });
      this.ruleForm.transaPeriod = parseInt(obj.label);
    },
    publishProject() {
      // 确定用户选择的技能，这个技能应该为[]

      const test = 2;
      const projectData = {
        projectName: this.ruleForm.projectName,
        projectDescription: this.ruleForm.textarea,
        // skillList: this.ruleForm.selecSkill,
        skillList: this.projectSkill,
        tenderPeriod: this.ruleForm.bidPeriod,
        budget: this.ruleForm.budget,
        // expectedTime: test,
        expectedTime: this.ruleForm.transaPeriod,
      };
      // this.fileData.projectId = 123456;
      // const fileList = this.$refs.upload;
      // console.log(fileList);

      publishProjectForm(projectData)
        .then(res => {
          // console.log(res);
          // const data = {
          //   projectId: res.data.businessId,
          //   file: this.fileList,
          // };
          // this.fileData.projectId = res.data.businessId;
          // const fileList = this.fileList;
          publishProjectFile(fileList)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 从服务器端获取技能
    getSkillList()
      .then(res => {
        // 将获取到的技能列表按照想要的格式赋给skills
        this.projectSkill = res.data;
        for (let i = 0; i < this.projectSkill.length; ++i) {
          const object = [];
          object.value = `选项${i + 1}`;
          object.label = this.projectSkill[i].skillName;
          this.skills.push(object);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';
@import url('//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css');

.container {
	height: 150vw;
	width: 100%;
	margin-top: $h-nav;
	display: flex;
	background-image: url('/static/images/signup/background.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-color: $clr-white;
	opacity: 0.9;
}

.container .main {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 53%;
	height: 120vw;
	margin-top: 10rem;
	margin-left: 20%;
	box-shadow: $shadow-work;
	background-color: $clr-white;
	border-radius: 5px;
}

.main .title {
	position: relative;
	font-size: 20px;
	font-weight: bold;
	width: 60%;
	margin-left: 20%;
	color: #363636;
}

.main .content {
	position: relative;
	height: 100vw;
	width: $w-input;
	display: flex;
	flex-direction: column;
	margin-left: 20%;
	margin-top: 4rem;
}

label {
	width: $w-input;
	color: #666666;
	margin-bottom: 1rem;
	font-size: 0.5rem;
}

.upload {
	width: $w-input;
	padding-bottom: 1rem;
	margin-top: 4rem;
	margin-bottom: 4rem;
	border: 0.06rem solid $clr-border;
	border-radius: 4px;
}

.uploadFile {
	margin-top: .5rem;
	margin-left: 1rem;
	margin-bottom: 1rem;
	padding-left: 1rem;
  line-height: 50%;
  text-align: center;
	border: none;
	border: 0.06rem solid $clr-border;
	width: 5rem;
}

.el-upload__tip {
	margin-left: 1rem;
}
.publishProject {
	margin-top: 5rem;
}
</style>

<style lang="scss">
.el-form-item__label {
	font-size: 0.6rem;
	line-height: 20px;
}

.el-form-item__error {
	font-size: 0.5rem;
}

.el-form-item.is-success .el-input__inner {
	border-color: #8fb5f2;
}

.el-input__inner {
	height: 32px;
}
</style>

