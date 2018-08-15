<template>
<div class="login-view">
	<nav-bar title='河马钱包' opacity absolute></nav-bar>
	<div class="common-filter login-bgc" :style='note'></div>
	<div class="login-form-content">
		<div class="login-form-item">
			<div class="login-form-title blue"><span class="login-icon"><svg-icon icon-class='用户'></svg-icon></span>用户名</div>
			<div class="login-input">
				<span class="login-circle"></span>
				<span class="login-point"></span>
				<input :placeholder='placeholder1' maxlength="11" v-model='mobileNumber' @blur='input_blur' @focus='input_focus(1)'>
			</div>
		</div>
		<div class="login-form-item">
			<div class="login-form-title green"><span class="login-icon"><svg-icon icon-class='登录锁'></svg-icon></span>图片验证码</div>
			<div class="login-input">
				<span class="login-circle code-circle"></span>
				<span class="login-point"></span>
				<input :placeholder='placeholder2' maxlength="4" v-model='inCode' @blur='input_blur' @focus='input_focus(2)'>
				<img :src="code_img" alt="" class="send-v-code"  @click='get_img_code'>
			</div>
		</div>
		<div class="login-form-item">
			<div class="login-form-title green"><span class="login-icon"><svg-icon icon-class='登录锁'></svg-icon></span>手机验证码</div>
			<div class="login-input">
				<span class="login-circle code-circle"></span>
				<span class="login-point"></span>
				<input :placeholder='placeholder3' maxlength="6" v-model='smsCode' @blur='input_blur' @focus='input_focus(3)' @keyup.enter='submit_to_login'>
			</div>
			<div :class="isSend ? 'send-code-btn current' : 'send-code-btn'" @click='get_message_code'>{{email_message}}</div>
		</div>
		<div class="login-btn" @click='submit_to_login'>登录</div>
	</div>
	<div class="login-tips">登录即代表同意<span class="href-color" @click='$go("blog")'>《河马钱包协议》</span></div>
</div>
</template>
<script>
	export default {
		data() {
			return {
				code_img: '',
				imgSessionId: '',
				mobileNumber: '',
				inCode: '',
				smsCode: '',
				placeholder1: '请输入您的手机号码',
				placeholder2: '请输入图形验证码',
				placeholder3: '请输入验证码',
				timer: null,
				email_message: '发送',
				isSend: false, //是否发送验证码
				phone_reg: /^(0|86|17951)?(13[0-9]|198|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
				note: {
					backgroundImage: "url(" + require("@/assets/login-bgc.png") + ")"
				}
			}
		},
		created() {
			this.get_img_code();
			sessionStorage.setItem('times', 'true');
		},
		methods: {
			input_blur() {
				this.placeholder1 = '请输入您的手机号码';
				this.placeholder2 = '请输入图形验证码';
				this.placeholder3 = '请输入验证码';
			},
			input_focus(index) {
				this['placeholder' + index] = '';
			},
			/*获取图片验证码*/
			get_img_code() {
				this.$post("wallet/user/randomImage", {
					ss: new Date().getMilliseconds()
				}).then(res => {
					this.code_img = "data:image/png;base64," + res.data.imgBase64;
					this.imgSessionId = res.data.imgSessionId;
				}).catch(res => {
					console.log(res)
				})
			},
			/*获取短信验证码*/
			get_message_code() {
				if (!this.mobileNumber) {
					this.$toast({
						type: 'fail',
						message: '手机号不能为空！',
						duration: 1000
					});
					return false
				}
				if (!this.phone_reg.test(this.mobileNumber)) {
					this.$toast({
						type: 'fail',
						message: '手机号格式错误！',
						duration: 1000
					});
					return false
				}
				if (!this.inCode) {
					this.$toast({
						type: 'fail',
						message: '图片验证码为空！',
						duration: 1000
					});
					return false
				}
				if (this.send) {
					return
				}
				console.log(window.user_is_agree);
				if (window.user_is_agree === "false") {
					console.log(window.user_is_agree);
					this.$toast({
						type: 'fail',
						message: '请先去设置开启通讯录权限！',
						duration: 1000
					});
					return
				};
				return
				const toast = this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '正在发送'
				});
				this.$post("wallet/system/smsCode", {
					mobileNumber: this.mobileNumber,
					inCode: this.inCode,
					imgSessionId: this.imgSessionId,
					smsType: "LOGIN",
					ss: new Date().getMilliseconds()
				}).then(res => {
					toast.clear();
					this.$toast({
						type: 'success',
						message: '验证码已发送，请注意查收！',
						duration: 1000
					});
					this.isSend = true;
					var a = 0;
					this.timer = setInterval(res => {
						a++;
						this.email_message = (60 - a) + 's';
						if (a == 60) {
							this.email_message = '发送验证码';
							this.isSend = false;
							clearInterval(this.timer);
						}
					}, 1000)
				}).catch(res => {
					console.log(res)
				});
			},
			/*确定登录*/
			submit_to_login() {
				if (!this.mobileNumber) {
					this.$toast({
						type: 'fail',
						message: '手机号为空！',
						duration: 1000
					});
					return false
				}
				if (!this.phone_reg.test(this.mobileNumber)) {
					this.$toast({
						type: 'fail',
						message: '手机号格式错误！',
						duration: 1000
					});
					return false
				}
				if (!this.inCode) {
					this.$toast({
						type: 'fail',
						message: '图形验证码为空！',
						duration: 1000
					});
					return false
				}
				if (!this.inCode) {
					this.$toast({
						type: 'fail',
						message: '短信验证码为空！',
						duration: 1000
					});
					return false
				}
				const toast = this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '登录中'
				});
				this.$post("wallet/user/signup", {
					mobileNumber: this.mobileNumber,
					smsCode: this.smsCode,
					ss: new Date().getMilliseconds()
				}).then(res => {
					this.$router.push({
						path: '/home?t=' + Date.now(),
						query: {
							t: Date.now()
						}
					})
					this.$store.commit('set_token', res.data);
					toast.clear();
					this.$store.dispatch('get_home_data', res.data.sessionId)
				}).catch(res => {
					console.log(res);
				})
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	.login-circle {
		width: .1rem;
		height: .1rem;
		display: inline-block;
		border-radius: 50%;
		border: .06rem solid #d2e8fd;
		position: absolute;
		top: 50%;
		left: 0;
		background-color: #2089f8;
		transform: translate(0, -50%);
	}

	.login-point {
		background-color: #b1b1b1;
		width: 2px;
		height: 2px;
		position: absolute;
		bottom: -2px;
		left: 0;
	}

	.login-view {
		height: 100%;
		.login-form-content {
			width: 80%;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 16px;
			padding: .4rem .4rem;
			position: relative;
			margin-top: .3rem;
			box-shadow: 4px 4px 4px #efefef, -4px -4px 4px #efefef;
			.login-form-item {
				margin-bottom: .4rem;
				position: relative;
				.login-form-title {
					text-align: center;
					margin-bottom: 12px;
					font-size: .22rem;
					font-weight: bold;
					.login-icon {
						border: 2px solid #f1f1f1;
						border-radius: 50%;
						padding: 2px;
						display: inline-block;
						width: .4rem;
						height: .4rem;
						text-align: center;
						line-height: .46rem;
						margin-right: .12rem;
						.svg-icon {
							font-size: .32rem
						}
					}
				}
				.login-input {
					padding-bottom: .1rem;
					border-bottom: 2px solid #e5e5e5;
					text-align: center;
					position: relative;
					.code-circle {
						background-color: #1bc8ae;
						border-color: #d1f4ef;
					}
					input {
						width: 150px;
						border: none;
						text-align: center;
						font-size: .26rem;
					}
				}
				.send-v-code {
					position: absolute;
					right: 0;
					bottom: .12rem;
				}
				.send-code-btn {
					font-size: .24rem;
					background-color: #4788ff;
					border-radius: 50px;
					color: #fff;
					text-align: center;
					box-shadow: 2px 2px 4px #ccc;
					padding: .12rem .4rem;
					position: absolute;
					right: 0;
					bottom: .12rem;
					&.current {
						background-color: #aaa;
					}
				}
			}
			.login-btn {
				width: 60%;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%, 50%);
				font-size: .34rem;
				background-color: #6c8bff;
				border-radius: 50px;
				color: #fff;
				text-align: center;
				box-shadow: 2px 2px 4px #ccc;
				margin: .4rem auto 0 auto;
				padding: .2rem 0;
			}
		}
		.login-tips {
			font-size: .24rem;
			color: #b3b3b3;
			text-align: center;
			margin-top: 50px;
		}
	}

</style>
