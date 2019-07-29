webpackJsonp([6],{U4s1:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t("vMJZ"),s={data:function(){var e=this;return{title:"企业注册",ruleForm:{enterpriseName:"",name:"",idCard:"",password:"",varifyPassword:"",mail:"",phoneNumber:"",captcha:""},checked:!0,imageUrl:"",status:0,businessAttachment:"",rules:{enterpriseName:[{required:!0,message:"请输入您的企业名称",trigger:"blur"}],name:[{required:!0,message:"请输入您的姓名",trigger:"blur"}],idCard:[{required:!0,message:"请输入您的身份证号码",trigger:"blur"}],password:[{validator:function(r,t,a){""===t?a(new Error("请输入密码")):(""!==e.ruleForm.varifyPassword&&e.$refs.ruleForm.validateField("varifyPassword"),a())},required:!0,message:"请输入您的密码",trigger:"blur"}],varifyPassword:[{validator:function(r,t,a){""===t?a(new Error("请再次输入密码")):t!==e.ruleForm.password?a(new Error("两次输入密码不一致!")):a()},required:!0,message:"和输入密码不符！",trigger:"blur"}],email:[{required:!0,message:"请输入您的邮箱",trigger:"blur"}],phoneNumber:[{required:!0,message:"请输入您的手机号码",trigger:"blur"},{min:11,max:11,message:"请正确输入手机号!"}]}}},methods:{uploadUrl:function(){return"/api/business/register/upload"},onSuccess:function(e,r){this.imageUrl=URL.createObjectURL(r.raw),this.businessAttachment=e.data,console.log(this.businessAttachment)},onBeforeUpload:function(e){var r="image/jpeg"===e.type||"image/png"===e.type,t=e.size/1024/1024<3;return r?t?r&&t:(this.$message({type:"error",message:"上传文件大小不能超过1M!"}),!1):(this.$message({type:"error",message:"上传文件只能是jpeg/png格式!"}),!1)},getCaptcha:function(){var e=this;if(this.ruleForm.phoneNumber){var r={tel:this.ruleForm.phoneNumber};Object(a.g)(r).then(function(r){e.$message({type:"success",message:"验证码已发送至您的手机~,请注意查收^_^"})}).catch(function(e){console.log("发送手机验证码失败！")})}else this.$message({type:"warning",message:"手机号不能为空！"})},goToSignUp:function(){if(this.checked)if(this.ruleForm.captcha){var e={captcha:this.ruleForm.captcha,userData:{businessName:this.ruleForm.enterpriseName,representationName:this.ruleForm.name,representationIdcard:this.ruleForm.idCard,password:this.ruleForm.password,varifyPassword:this.ruleForm.varifyPassword,email:this.ruleForm.email,tel:this.ruleForm.phoneNumber,businessAttachment:this.businessAttachment}};this.$store.dispatch("VerifyCaptcha",e)}else this.$message({type:"error",message:"请输入验证码"});else this.$message({type:"error",message:"非常抱歉，您需同意我们的协议才可以注册！"})}}},i={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[t("div",{staticClass:"bussiness-admin"},[t("el-upload",{ref:"upload",attrs:{action:e.uploadUrl(),accept:"image/jpeg, image/png","auto-upload":!0,"with-credentials":!0,"show-file-list":!1,"before-upload":e.onBeforeUpload,"on-success":e.onSuccess,multiple:!1}},[e.imageUrl?t("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),e._m(0)],1),e._v(" "),t("div",{staticClass:"main"},[t("div",{staticClass:"title"},[e._v(e._s(e.title))]),e._v(" "),t("div",{staticClass:"content"},[t("div",{staticClass:"form"},[t("el-form",{ref:"ruleForm",attrs:{"status-icon":"",model:e.ruleForm,rules:e.rules}},[t("el-form-item",{attrs:{label:"名称：",prop:"enterpriseName"}},[t("el-input",{attrs:{placeholder:"请输入您企业的名称..."},model:{value:e.ruleForm.enterpriseName,callback:function(r){e.$set(e.ruleForm,"enterpriseName",r)},expression:"ruleForm.enterpriseName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"登录者姓名：",prop:"name"}},[t("el-input",{attrs:{placeholder:"请输入您的姓名..."},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"登录者身份证",prop:"idCard"}},[t("el-input",{attrs:{placeholder:"请输入您的身份证号码..."},model:{value:e.ruleForm.idCard,callback:function(r){e.$set(e.ruleForm,"idCard",r)},expression:"ruleForm.idCard"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"密码：",prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"请输入您的密码..."},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"确认密码：",prop:"varifyPassword"}},[t("el-input",{attrs:{type:"password",placeholder:"请确认你的密码..."},model:{value:e.ruleForm.varifyPassword,callback:function(r){e.$set(e.ruleForm,"varifyPassword",r)},expression:"ruleForm.varifyPassword"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"邮箱：",prop:"email"}},[t("el-input",{attrs:{placeholder:"请输入您的邮箱..."},model:{value:e.ruleForm.email,callback:function(r){e.$set(e.ruleForm,"email",r)},expression:"ruleForm.email"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号码：",prop:"phoneNumber"}},[t("el-input",{attrs:{placeholder:"请输入您的手机号..."},model:{value:e.ruleForm.phoneNumber,callback:function(r){e.$set(e.ruleForm,"phoneNumber",r)},expression:"ruleForm.phoneNumber"}})],1)],1)],1),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm.captcha,expression:"ruleForm.captcha"}],staticClass:"varify-input",attrs:{type:"text",placeholder:"请输入验证码..."},domProps:{value:e.ruleForm.captcha},on:{input:function(r){r.target.composing||e.$set(e.ruleForm,"captcha",r.target.value)}}}),e._v(" "),t("button",{staticClass:"captcha-button",on:{click:function(r){e.getCaptcha()}}},[e._v("获取验证码")]),e._v(" "),t("div",{staticClass:"check-box"},[t("el-checkbox",{model:{value:e.checked,callback:function(r){e.checked=r},expression:"checked"}},[t("router-link",{attrs:{to:"/signUpAgreement"}},[e._v("同意该协议")])],1)],1),e._v(" "),t("Button",{staticClass:"signUp-button",on:{click:function(r){e.goToSignUp()}}},[e._v("注册")])],1)])])},staticRenderFns:[function(){var e=this.$createElement,r=this._self._c||e;return r("div",{staticClass:"certificate-content"},[r("label",[this._v("上传工商管理登记证")])])}]};var o=t("VU/8")(s,i,!1,function(e){t("vxhA"),t("ZigZ")},"data-v-0ba553b6",null);r.default=o.exports},ZigZ:function(e,r){},vxhA:function(e,r){}});
//# sourceMappingURL=6.86f34480a8ecf7f6140a.js.map