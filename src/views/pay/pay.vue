<template>
	<div>
		<nav-bar title='扫码还款'  show @go='$go("orderlist")' opacity absolute></nav-bar>
		<div class="common-filter" :style='$note'>
			<div class="common-filter-block">
				<div>
					<p class="text">{{order_data.refundTime}}应还款（元）</p>
					<p>￥{{order_data.refundAmount}}<span class="company">元</span></p>
				</div>
			</div>
		</div>
		<div class="common-form inner-filter">
			<ul>
				<li class="between">
					<span class="number">编号：</span>
					<span class="number bold">{{order_data.orderNo}}</span>
				</li>
				<li class="between">
					<span class="number">本金：</span>
					<span class='number bold'>{{order_data.applyAmount}} 元</span>
				</li>
				<li class="between">
					<span class="number">利息：</span>
					<span class='number bold'>{{order_data.interest}} 元</span>
				</li>
				<li class="between">
					<span class="number">还款方式：</span>
					<span class='number bold'>一次性还本付息</span>
				</li>
			</ul>
		</div>
		<p class="common-tips blue">请确保您的还款账户充足，还款成功后，订单会自动更改为已还 款状态。</p>
		<div class="common-form">
			<ul>
				<li class="between">
					<span class="number bold">还款账户</span>
				</li>
				<li class="between">
					<span class="number">支付宝线上还款</span>
					<span :class='alipay ? "type-select current" : "type-select"' @click='select_alipay'></span>
				</li>
				<li class="between">
					<span class="number">线下还款</span>
					<span :class='bottom ? "type-select current" : "type-select"' @click='select_bottom'></span>
				</li>
			</ul>
		</div>
		<div class="common-btn" @click='submit'>确认还款</div>
		<p class="common-tips" style="text-align:center;margin-bottom:.5rem">如多次提示扣款失败。<span class="blue underline">点这里</span></p>
		<!--弹窗-->
		<div  :class='tip_dialog ? "swal-overlay swal-overlay--show-modal" : "swal-overlay"' @click.self='close_dialog'>
			<div class="swal-modal zg-modal">
				<p class="dialog-title">支付宝线下还款时间为每天的 <span class="blue">9:00-19:00</span>，其他时间段内还款可能会造成人工销账延迟，为避免消账不及时影响您的还款，通过此方式还款时请先咨询官方客服或选择其他方式还款。</p>
				<div class="dialog-btn" @click='close_dialog'>我知道了</div>
				<div class="dialog-icon">
					<div class="inner-bgc inner1">
						<div class="inner2">
							<van-icon name="fail" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				alipay: false,
				bottom: false,
				tip_dialog: false,
			}
		},
		computed: {
			order_data() {
				return this.$store.getters.order_data
			}
		},
		created() {
			if (this.$store.getters.order_data.orderNo || this.$store.getters.user.sessionId) {
				return
			}
			var query = this.$route.query;
			this.$store.dispatch('get_pay_info', query);
		},
		methods: {
			select_alipay() {
				this.alipay = true;
				this.bottom = false;
			},
			select_bottom() {
				this.bottom = true;
				this.alipay = false;
			},
			submit() {
				if (this.alipay) {
					this.$toast({
						message: '暂未开启',
						type: 'fail',
						duration: '1500'
					})
					return
					this.$post('wallet/pay/Alipay', {
						sessionId: this.$store.getters.user.sessionId,
					}).then(res => {

					}).catch(res => {

					})
				} else if (this.bottom) {
					if (sessionStorage.getItem('times') === 'true') {
						this.tip_dialog = true;
					} else {
						this.$go('payoffline');
					}
				}
			},
			close_dialog() {
				this.tip_dialog = false;
				sessionStorage.removeItem('times');
			}
		}
	}
</script>
