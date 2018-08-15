<template>
	<div>
		<nav-bar title='我的钱包' opacity absolute></nav-bar>
		<div class="common-filter" :style='$note'>
			<div class="common-filter-block">
				<div>
					<p class="text">借款金额</p>
					<p>￥{{data.borrowingAmount}} <span class="company">元</span></p>
				</div>
				<div>
					<p class="text">借款期限</p>
					<p>{{data.borrowingTerm}} <span class="company">天</span></p>
				</div>
			</div>
		</div>
		<div class="common-form inner-filter">
			<ul>
				<li class="between">
					<span>利息：</span>
					<span class='bold'>{{data.interest}} 元</span>
				</li>
				<li class="between">
					<span>综合费率：</span>
					<span class='bold'>{{data.comprehensiveRate}}</span>
				</li>
				<li class="between">
					<span>到期应还：</span>
					<span class='bold'>{{data.repaymentAmount}} 元</span>
				</li>
			</ul>
		</div>
		<div class="common-checkbox"><van-checkbox v-model="agree_checked">我已阅读并同意<span class="blue" @click='$go("blog")'>《借款协议》</span></van-checkbox></div>
		<div class="common-btn" @click='go_to_apply'>开始申请</div>
		<table-bar></table-bar>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				agree_checked: false,
			}
		},
		computed: {
			data() {
				return this.$store.getters.home_data
			}
		},
		created() {
			this.$store.dispatch('get_home_data');
			this.$store.dispatch('get_config_info');
		},
		methods: {
			/*开始申请*/
			go_to_apply() {
				if (!this.agree_checked) {
					this.$toast({
						type: 'fail',
						message: `请同意并已阅读 《借款协议》`,
						duration: 1500
					});
					return
				}
				const toast = this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '申请中'
				});
				if (this.$store.getters.pay_status === "0") {
					this.$go('auth');
					this.$store.commit('set_auth_type', 'home');
					return
				};
				this.$post('wallet/orders/init', {
					sessionId: this.$store.getters.sessionId,
					productId: this.$store.getters.home_data.productId,
				}).then(res => {
					this.$store.commit('set_pay_status', '0');
					toast.clear();
					this.$go('auth');
					this.$store.commit('set_order_id', res.data);
					this.$store.commit('set_auth_type', 'home');
				}).catch(res => {
					console.log(res);
				})
			}
		}
	}
</script>
<style rel='stylesheet/scss' lang='scss'>
	.home-read {
		width: 80%;
		margin: 0 auto;
		margin-top: .6rem;
		font-size: .24rem;
		color: #b3b3b3;
	}
</style>