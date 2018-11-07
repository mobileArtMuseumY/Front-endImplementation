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
        <img v-if="imageUrl" :src="imageUrl" class="avatar-of-student">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
export default {
	data() {
		return {
			imageUrl: '',
		};
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
	mounted: {
		getStudentInfo() {
			// this.$store.dispatch('GetStudentInfo');
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	@include wh(100%, 60rem);
	padding-top: $h-nav;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: -1;
	.background {
		@include wh(100%, 30rem);
		z-index: 0;
		background-image: url('/static/images/user/enterprise/landscape.jpg');
		background-size: 100% 100%;
	}
	.top {
		@include wh(70vw, 40rem);
		margin-top: -13rem;
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
  @include margin-tl(-1rem, 1rem);
	line-height: 110px;
	text-align: center;
	border: 1px dashed #666666;
}
.avatar-of-student {
	@include wh(190px, 180px);
  @include margin-tl(-1rem, 1rem);
	display: block;
	box-shadow: $shadow-work;
	border-radius: 2px;
}
</style>
