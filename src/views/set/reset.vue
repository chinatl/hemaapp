<template>
	<div>
		<nav-bar title='重置交易密码' show @go='$go("set")'></nav-bar>
		<div class="common-form">
			<ul>
				<li class="between">
					<span class="text">您的手机号</span>
					<span class="number">{{this.$store.getters.user.mobile}}</span>
				</li>
<!--
				<li class="between">
					<span class="text">身份证：</span>
					<input  v-model='user_code' placeholder='请输入身份证号码' >
				</li>
-->
				<li class="between">
					<span class="text">短信验证码</span>
					<input  v-model='code' placeholder='请输入'  maxlength="6" style="margin-right:1.6rem;width:1rem;text-align:left">
					<div :class="isSend ? 'send-btn current' : 'send-btn'" @click='get_message_code' style="width:1.8rem">{{email_message}}</div>
				</li>
				<li class="between">
					<span class="text">交易密码：</span>
					<input type="password" v-model='password' placeholder='请输入6位交易密码'  maxlength="6">
				</li>
				<li class="between">
					<span class="text">再次确认：</span>
					<input type="password" v-model='re_password' placeholder='请输入6位交易密码'  maxlength="6">
				</li>
			</ul>
		</div>
<!--		<p class="common-tips">此手机为你支付宝绑定手机号</p>	-->
		<div class="common-btn" @click='submit'>完成</div>
	</div>
</template>
<script>
	//	/wallet/system/smsCode
	export default {
		data() {
			return {
				code: '',
				user_code: '',
				isSend: false,
				user_code: '',
				email_message: '获取验证码',
				password: '',
				re_password: '',
			}
		},
		methods: {
			submit() {
				if (!this.code) {
					this.$toast({
						type: 'fail',
						message: '手机验证码为空！',
						duration: 1500
					});
					return
				}
				if (!this.password) {
					this.$toast({
						type: 'fail',
						message: '请输入交易密码！',
						duration: 1500
					});
					return
				}
				if (!this.password) {
					this.$toast({
						type: 'fail',
						message: '请确认交易密码！',
						duration: 1500
					});
					return
				}
				if (!this.password) {
					this.$toast({
						type: 'fail',
						message: '两次密码不一致！',
						duration: 1500
					});
					return
				}
				this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '重置中'
				});
				this.$post('wallet/user/resetPayPassword', {
					sessionId: this.$store.getters.sessionId,
					payPassword: this.password,
					smsCode: this.code
				}).then(res => {
					this.$toast({
						duration: 1000, // 持续展示 toast
						message: '重置交易密码成功',
						type: 'success'
					});
					this.$go("auth");
				}).catch(res => {
					console.log(res);
				})
			},
			/*获取短信验证码*/
			get_message_code() {
				if (this.send) {
					return
				}
				this.$post("wallet/system/smsCode", {
					mobileNumber: this.$store.getters.user.mobile,
					smsType: "PAYPASSWORD",
					sessionId: this.$store.getters.sessionId,
				}).then(res => {
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
				})
			},
		}
	}

</script>
