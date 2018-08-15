<template>
	<div class="user-view">
		<nav-bar title='个人中心' opacity absolute></nav-bar>
		<div class="common-filter hema-bgc" :style='note'>
			<div class="user-filter-tips">
				<h3>欢迎您</h3>
				<p>{{phone_number}}</p>
			</div>
		</div>
		<div class="common-form user-card">
			<ul>
				<li @click='go_auth'  class="between">
					<span class="text"><svg-icon icon-class='基础认证'></svg-icon>我的认证</span>
					<van-icon name="arrow" />
				</li>
				<li @click='$go("orderlist")'  class="between">
					<span class="text"><svg-icon icon-class='申请记录'></svg-icon>申请记录</span>
					<van-icon name="arrow" />
				</li>
				<li @click='$go("opinion")'  class="between">
					<span class="text"><svg-icon icon-class='意见反馈'></svg-icon>意见反馈</span>
					<van-icon name="arrow" />
				</li>
				<li @click='$go("set")'  class="between">
					<span class="text"><svg-icon icon-class='个人设置'></svg-icon>个人设置</span>
					<van-icon name="arrow" />
				</li>
			</ul>
			<span class="half-cirle left-one"></span>
			<span class="half-cirle left-two"></span>
			<span class="half-cirle right-one"></span>
			<span class="half-cirle right-two"></span>
			<img :src="require('@/assets/user/circle.png')" alt="" class="user-circle">
		</div>
		<div class="user-tips">
			<p class="blue"><svg-icon icon-class='客服'></svg-icon><a href="tel:029-68083292">029-68083292</a></p>
			<p class="work-day">工作时间：工作日 09:00-21:00</p>
		</div>
		<table-bar></table-bar>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				agree_checked: false,
				note: {
					backgroundImage: "url(" + require("@/assets/user-bgc.png") + ")"
				}
			}
		},
		computed: {
			phone_number() {
				if (this.$store.getters.user.mobile) {
					var str = this.$store.getters.user.mobile;
					return str.slice(0, 3) + '****' + str.slice(7)
				} else {
					return '-----------'
				}
			}
		},
		created() {
			this.$store.dispatch('get_order_list');
		},
		methods: {
			go_auth() {
				this.$store.commit('set_auth_type', 'user');
				this.$go('auth');
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	.user-view {
		.common-filter {
			.user-filter-tips {
				color: #fff;
				margin-top: 1.4rem;
				margin-left: 10%;
				h3 {
					margin-bottom: .1rem;
					font-weight: normal;
					font-size: .44rem;
				}
				p {
					font-size: .34rem;
				}
			}
		}
		.user-card {
			margin-top: -.8rem;
			/*			overflow: hidden;*/
			.user-circle {
				width: .54rem;
				position: absolute;
				top: 0;
				left: .75rem;
				transform: translate(0, -60%)
			}
			.half-cirle {
				width: .4rem;
				height: .4rem;
				background-color: #f8f8f8;
				position: absolute;
				border-radius: 50%
			}
			.left-one {
				top: 30%;
				left: 0;
				transform: translate(-50%, 0)
			}
			.left-two {
				bottom: 30%;
				left: 0;
				transform: translate(-50%, 0)
			}
			.right-one {
				top: 30%;
				right: 0;
				transform: translate(50%, 0)
			}
			.right-two {
				bottom: 30%;
				right: 0;
				transform: translate(50%, 0)
			}
		}
		.user-tips {
			text-align: center;
			margin-top: .6rem;
			.svg-icon {
				font-size: .54rem;
				margin-right: .12rem;
				vertical-align: text-bottom;
			}
			.work-day {
				font-weight: bold;
				font-size: .28rem;
				margin-top: .4rem;
			}
		}
	}

</style>
