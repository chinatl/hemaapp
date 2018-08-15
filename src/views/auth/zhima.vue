<template>
	<div>
		<nav-bar title='芝麻信用' show @go='$go("auth")'></nav-bar>
		<p class="common-tips">只有进行实名认证，才能完成借款哦!</p>
		<div class="common-form">
			<ul>
				<li>
					<span class="text">姓名：</span>
					<span class="number">*猪猪</span>
				</li>
				<li>
					<span class="text">身份证：</span>
					<span class="number">61232321413243124234</span>
				</li>
				<li>
					<span class="text">手机号：</span>
					<span class="number">198****0292</span>
				</li>
				<li>
					<span class="text">检验码：</span>
					<input type="text" v-model='password' placeholder='请输入校验码'  maxlength="20">
					<div class="send-btn">获取验证码</div>
				</li>
			</ul>
		</div>
		<p class="common-tips">此手机为你支付宝绑定手机号</p>		
		<div class="common-btn" @click='$go("auth")'>完成</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
			}
		},
		methods: {

		}
	}

</script>