<template>
  <div class="container">
    <div class="background">
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
        <img v-if="imageUrl" :src="imageUrl" class="avatar-of-business">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="verify-items">
          <svg-icon :icon="item.icon" v-for="(item, index) in verifyItems" :key="index" class="verify-icon" style="color: #666666 ;"></svg-icon>
        </div>
        <div class="followers-and-following">
          <!-- <span>{{ user.userInfo.followers }}</span>
          <span>{{ user.userInfo.following }}</span> -->
          <span>followers 3</span>
          <span>following 4</span>
        </div>
      </div>
      <div class="center">
        <div class="username">
          <!-- <span style="font-size: 25px;"> <strong>{{ user.userInfo.userName }}</strong></span> -->
          <span style="font-size: 25px;"> <strong>Honeysyt</strong></span>
        </div>
        <div class="description">
          <!-- <span>{{ user.userInfo.description }}</span> -->
          <textarea disabled>here is the description of me.here is the description of me.</textarea>
        </div>
      </div>
      <div class="right">
        <div class="edit-profile">
          <button>编辑信息</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="main">
        <label v-if="!project.projectItem">空空如也……</label>
        <div class="project-item" v-if="project.projectItem" v-for="(item, index) in project.projectItem" :key="index">
          <div class="pending" v-if="item.status === 0">
            <div class="optional" v-if="pendingNum === 1">
              <svg-icon icon="plane" style="color: #666666 ;"></svg-icon>
              <label>正在审核的项目：</label>
            </div>
            <div class="pending-content">
              <project-item-epitome :projectItem="item" @click="goToDetails(item.projectId)"></project-item-epitome>
            </div>
          </div>
          <div class="underWay" v-if="item.status === 1">
            <div class="optional" v-if="underWayNum === 1">
              <svg-icon icon="plane" style="color: #666666 ;"></svg-icon>
              <label>正在进行的项目：</label>
            </div>
            <div class="underWay-content">
              <project-item-epitome :projectItem="item" ></project-item-epitome>
            </div>
          </div>
          <div class="done" v-if="item.status === 2">
            <div class="optional" v-if="doneNum === 1">
              <svg-icon icon="plane" style="color: #666666 ;"></svg-icon>
              <label>交易成功的项目：</label>
            </div>
            <div class="done-content">
              <project-item-epitome :projectItem="item" ></project-item-epitome>
            </div>
          </div>
          <div class="incomplete" v-if="item.status === 3">
            <div class="optional" v-if="incompleteNum === 1">
              <svg-icon icon="plane" style="color: #666666;"></svg-icon>
              <label>交易失败的项目：</label>
            </div>
            <div class="incomplete-content">
              <project-item-epitome :projectItem="item" ></project-item-epitome>
            </div>
          </div>
        </div>
      </div>
      <div class="right-bar">
        <div class="right-bar-title">
          <span style="font-size: 18px;"><strong>验证</strong></span>
        </div>
        <div class="verify-item-details" v-for="(item, index) in verifyItems" :key="index">
          <div class="verify-inner">
            <svg-icon :icon="item.icon" class="verify-icon" style="color: #666666 ;"></svg-icon>
          <span style="font-size: 14px; margin-left: .5rem;"><a @click="toVerify()">{{ item.content }}</a></span>
          </div>
        </div>
      </div>
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
			verifyItems: [
				{
					icon: 'user-verify',
					content: '完善用户信息',
				},
				{
					icon: 'phone-verify',
					content: '手机验证',
				},
				{
					icon: 'email-verify',
					content: '邮箱验证',
				},
      ],
      pendingNum: 1,
      underWayNum: 1,
      doneNum: 1,
      incompleteNum: 1,
		};
	},
	computed: {
    ...mapGetters(['user', 'project']),
    count(status){
      switch(status){
        case 'pending': 
          ++this.pendingNum;
          break;
        case 'underWay':
          ++this.underWayNum;
          break;
        case 'done':
          ++this.doneNum;
          break;
        case 'incomplete':
          ++this.incompleteNum;
          break;
      }
    },
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
    goToDetails(id) {
      
    }
	},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/index';

.container {
	width: 100%;
	margin-top: $h-nav;
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
		@include wh(85vw, 25em);
		margin-top: -13em;
		background-color: #fff;
		z-index: 99;
		box-shadow: $shadow-nav;
		border-radius: 3px;
		display: flex;
		justify-content: space-between;
		.left {
			padding: 2rem;
			text-align: center;
			margin-right: 2rem;
			.followers-and-following {
				display: flex;
				justify-content: space-around;
				margin-top: 1.5rem;
			}
			.verify-items {
				width: 6rem;
				margin: auto;
				display: flex;
				justify-content: space-around;
			}
		}
		.center {
			@include margin-tl(2rem, -13vw);
			.description {
				textarea {
					margin-top: 3.5rem;
					width: 30vw;
					line-height: 1rem;
					background-color: #f7f8fa;
					border: none;
					outline: none;
				}
			}
		}
		.right {
			transform: translate(-3rem, 2rem);
		}
	}
	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 4em;
		margin-bottom: 4rem;
		width: 85vw;
		.main {
      width: 60vw;
			background-color: #fff;
			box-shadow: $shadow-nav;
			border-radius: 3px;
			padding: 0.5em;
      > div {
        width: 80%;
				margin: 4em auto;
        // border-bottom: $border;
        // padding: 2rem;
        cursor: pointer;
      }
			// .pending {
			// 	width: 80%;
			// 	margin: 3em auto;
			// }
		}
		.right-bar {
			@include wh(20vw, 20em);
			background-color: #fff;
			box-shadow: $shadow-nav;
			border-radius: 3px;
			.right-bar-title {
				margin-top: 1rem;
				padding: 1rem;
			}
			.verify-item-details {
				width: 80%;
				border-top: 0.06rem solid $clr-gray;
				margin: auto;
				.verify-inner {
					padding: 1rem;
					width: 80%;
					margin: auto;
				}
			}
		}
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
	@include wh(190px, 190px);
	@include margin-tl(-1rem, 1rem);
	line-height: 110px;
	text-align: center;
	border: 1px dashed #666666;
}
.avatar-of-business {
	@include wh(190px, 190px);
	transform: translate(0, -3rem);
	display: block;
	box-shadow: $shadow-work;
	border-radius: 2px;
}
</style>
