<template>	
<div class="home-view  padding-bar">
	<div class="home-fliter color-bottom">
		<div class="home-logo">
			<p class="h3">手机变钱花</p>
			<p class="home-tips">在线下单，结款无需等待！</p>
			<div class="button">立即体验</div>
		</div>
	</div>
	<div class="home-card">
		<div class="check-service">
			<span></span>
			<span>您的设备型号是</span>
			<span class="iphone">iPhone7</span>
			<span class="to-check" @click='go_to_device'>立即检测</span>
		</div>
		<div class="home-number">
			<h3>5000元</h3>
			<p>最高租价（元）</p>
		</div>
		<div class="home-button">立即共享</div>
	</div>
	<div class="home-liucheng">
		<h3>出租流程</h3>
		<ul>
			<li>物品估价</li>
			<li></li>
			<li>在线认证</li>
			<li></li>
			<li>极速借款</li>
		</ul>
	</div>
	<div class="home-block">
		<div class="block1">
			<p class="cn">智能检测</p>
			<p class="en">ZHINENGJIANCHE</p>
		</div>
		<div class="block2">
			<p class="cn">出租指南</p>
			<p class="en">CHUZHUZHINAN</p>
		</div>
	</div>
	<table-bar></table-bar>
</div>
</template>
<script>
	import tableBar from '@/components/tableBar' //import 
	export default {
		components: {
			tableBar
		},
		data() {
			return {

			}
		},
		methods:{
			go_to_device(){
				this.$router.push({
					path:'/device'
				})
			}
		}
	}

</script>


<style rel='stylesheet/scss' lang='scss'>
	.home-view {
		height: 100%;
		background-color: #f8f8f8;
		.home-fliter {
			height: 30%;
			.home-logo {
				width: 90%;
				margin: 0 auto;
				padding-top: .6rem;
				color: #fff;
				.h3 {
					font-size: .4rem;
				}
				.home-tips {
					margin: .2rem 0;
					font-weight: bold;
					font-size: .30rem;
				}
				.button {
					display: inline-block;
					padding: .16rem .6rem;
					border-radius: 40px;
					text-align: center;
					color: #fff;
					font-size: .26rem;
					border: 2px solid #fff;
				}
			}
		}
		.home-card {
			width: 90%;
			border: 1px solid #efefef;
			border-radius: 5px;
			margin: 0 auto;
			padding: 20px 40px;
			box-sizing: border-box;
			position: relative;
			box-shadow: 1px 1px 1px #efefef;
			background-color: #fff;
			position: relative;
			margin-top: -.5rem;
			.check-service {
				font-size: .26rem;
				position: relative;
				.iphone {
					margin-left: 10px;
					font-weight: bold;
				}
				.to-check {
					float: right;
				}
			}
			.home-number {
				margin-top: .2rem;
				margin-bottom: .2rem;
				text-align: center;
				h3 {
					font-size: .52rem;
				}
				p {
					margin-top: .1rem;
					font-size: .24rem
				}
			}
			.home-button {
				border-radius: 40px;
				text-align: center;
				color: #fff;
				font-size: .32rem;
				padding: .16rem 0;
				width: 100%;
				margin: 0 auto;
				background-color: #ffbf72
			}
		}
		.home-liucheng {
			width: 90%;
			border: 1px solid #efefef;
			border-radius: 5px;
			padding: 20px 20px;
			box-sizing: border-box;
			position: relative;
			box-shadow: 1px 1px 1px #efefef;
			background-color: #fff;
			margin: 20px auto;
			h3 {
				font-size: .26rem;
			}
			ul {
				li {
					font-size: .24rem;
				}
			}
		}
		.home-block {
			width: 90%;
			margin: 0 auto;
			position: relative;
			display: flex;
			justify-content: space-between;
			div {
				width: 48%;
				background-color: red;
				border-radius: 6px;
				
				padding: 20px 12px;
				box-sizing: border-box;
				.cn {
					color: #fff;
					font-size: .26rem;
				}
				.en {
					color: #fedecb;
					font-size: .22rem;
					font-weight: bold;
				}
				&.block1 {
					background: linear-gradient(to right top, #fc915f, #ffc072);
				}
				&.block2 {
					background: linear-gradient(to right top, #ff7d81, #ff8b5a);
				}
			}
		}
	}

</style>
