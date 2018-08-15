<template>
	<div class="pay-success-view">
		<nav-bar title='还款成功'></nav-bar>
		<div class="pay-success-filter">
			<img :src="require('@/assets/paySuccess.png')" alt="">
			<p>恭喜您 本次还款成功！</p>
		</div>
		<div class="pay-success-btn">
			<img :src="require('@/assets/pay.png')">
			<div class="common-btn" @click='$go("home")'>确定</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {

		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	.pay-success-view {
		width: 100%;
		height: 100%;
		background-color: #6881ff;
		.pay-success-filter {
			text-align: center;
			img {
				margin-top: 2rem;
				width: 60%;
			}
			p {
				font-size: .34rem;
				color: #fff;
				margin-top: .3rem;
			}
		}
		.pay-success-btn {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			img {
				width: 100%;
				display: block;
			}
			.common-btn {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%)
			}
		}
	}

</style>
