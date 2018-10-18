<template>
  <div class="container">
    <div class="background">
      <!-- <img src="/static/images/user/enterprise/landscape.jpg" alt="background"> -->
    </div>
    <div class="top">
      <div class="left">
        <el-upload
        ref="upload"
        :action="uploadUrl()"
        accept="image/jpeg,image/png"
        :auto-upload="true"
        :with-credentials="true"
        :show-file-list="false"
        :before-upload="onBeforeUpload"
        :on-success="onSuccess"
        :multiple="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span>{{ user.userInfo.userName }}</span>
      </div>
      <div class="">
      </div>
    </div>
    <div class="main">

    </div>
    <div class="right-bar">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
      imageUrl: '/static/images/nav/avatar.png',
      // imageUrl: user.userInfo.avatar,
    };
  },
  computed: {
    ...mapGetters(['user', 'project']),
  },
	methods: {
		uploadUrl() {
			return '/api/business/register/upload';
		},
		onSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
			this.businessAttachment = res.data;
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
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	width: 100%;
	margin-top: $h-nav;
	height: 60rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: -1;
	.background {
    position: relative;
    @include wh(100%, 30em);
		z-index: 0;
    background-image: url('/static/images/user/enterprise/landscape.jpg');
		background-size: 100% 100%;
	}
	.top {
    @include wh(70vw, 35em);
		margin-top: -13em;
		background-color: #fff;
		z-index: 99;
		box-shadow: $shadow-nav;
		border-radius: 3px;
	}
}

.avatar-uploader .el-upload {
	border: 1px dashed #ffffff;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
  color: #666666;
  @include wh(190px, 180px);
	line-height: 110px;
	text-align: center;
	border: 1px dashed #666666;
	margin-left: 1em;
	margin-top: -1em;
}
.avatar {
	width: 190px;
  height: 180px;
  @include wh(190px, 180px);
	display: block;
	box-shadow: $shadow-work;
  border-radius: 2px;
	margin-left: 1rem;
	margin-top: -1rem;
}
</style>
