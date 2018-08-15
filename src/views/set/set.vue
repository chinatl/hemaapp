<template>
	<div>
		<nav-bar title='设置交易密码'show @go='$router.back()'></nav-bar>
		<div class="common-form">
			<ul>
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
		<p class="common-tips blue ">设置交易密码是为了保障您支付交易的安全</p>		
		<div class="common-btn" @click='submit'>完成</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				password: '',
				re_password: '',
			}
		},
		methods: {
			submit() {
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
					message: '设置中'
				});
				this.$post('wallet/saveUserBank', {
					sessionId: this.$store.getters.sessionId,
					bankNumberNo: this.$store.getters.bank_info.bankNumberNo,
					bankNumberMobile: this.$store.getters.bank_info.bankNumberNo
				}).then(res => {
					this.$post('wallet/user/setPayPassword', {
						sessionId: this.$store.getters.sessionId,
						password: this.password
					}).then(res => {
						toast.clear();
						this.$store.commit('set_config', res.data);
						this.$go("auth");
					}).catch(res => {
						console.log(res);
					})
				}).catch(res => {
					console.log(res);
				})
			}
		}
	}

</script>
