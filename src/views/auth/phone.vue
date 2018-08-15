<template>
	<div>
		<nav-bar title='手机运营商' show @go='$go("auth")'></nav-bar>
		<div class="common-form">
			<ul>
				<li>
					<span class="text">18576796536</span>
				</li>
				<li class="between">
					<input  v-model='password' placeholder='请输入服务码'  maxlength="10" style="text-align:left" :type="input_type" :disabled='$store.getters.config.operatorProgress ? true : false'>
					<span><van-icon :name="icon_name" @click='check_pwd_type'/></span>
				</li>
			</ul>
		</div>
		<div class="common-tips"><van-checkbox v-model="checked">同意<span class="href-color" @click='$go("blog")'>《用户使用协议》</span></van-checkbox></div>
		<div class="common-btn" @click='add_phone_user' v-if='!$store.getters.config.operatorProgress'>确认</div>
		<div class="common-tips align-center">忘记运营服务密码？<span class="href-color underline">点这里</span></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				password: '',
				icon_name: 'password-not-view',
				input_type: 'password',
				checked: false
			}
		},
		created() {
			if (!this.$store.getters.config.operatorProgress) {
				return
			}
			this.password = Math.random();
		},
		methods: {
			/*切换密码显示*/
			check_pwd_type() {
				if (this.$store.getters.config.operatorProgress) {
					return
				}
				this.icon_name = this.icon_name === 'password-not-view' ?
					"password-view" : "password-not-view";
				this.input_type = this.input_type === 'password' ?
					"text" : "password";

			},
			/*添加*/
			add_phone_user() {
				if (!this.password) {
					this.$toast({
						type: 'fail',
						message: '服务码为空！',
						duration: 1000
					});
					return false
				};
				if(!this.checked){
					this.$toast({
						type: 'fail',
						message: '请同意用户使用协议！',
						duration: 1000
					});
					return false
				}
				const toast = this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '认证中'
				});
				this.$post('web/credit/addMoxieCompletion', {
					sessionId: this.$store.getters.sessionId,
					sign: this.password
				}).then(res => {
					toast.clear();
					this.$store.commit('set_config', res.data);
					this.$go("auth");
				}).catch(res => {
					console.log(res);
				})
			}
		}
	}

</script>
