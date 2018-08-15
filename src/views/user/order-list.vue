<template>
	<div class="order-view">
		<nav-bar title='申请记录'show @go='$go("user")'></nav-bar>
		<p v-if='!$store.getters.order_list.length' class="order-list-tiips">暂无申请记录!</p>
		<div class='order-list' v-for='(item,index) in $store.getters.order_list'>
			<p>编号：{{item.orderNo}}</p>
			<p>申请金额：{{item.borrowingAmount}}元</p>
			<p>申请期限：{{item.borrowingTerm}} </p>
			<p>申请时间：{{item.createTime}}</p>
			<p class="blue">{{item.orderRemark}}</p>
			<div class= "bookmark" >
				{{item.status == "1" ? "申请中" : null}}
				{{item.status == "2" ? "审核通过" : null}}
				{{item.status == "5" ? "待还款(正常待还款)" : null}}
				{{item.status == "6" ? "已还款(正常已还款)" : null}}
				{{item.status == "7" ? "审核不通过" : null}}
				{{item.status == "8" ? "已逾期(逾期待还款)" : null}}
				{{item.status == "9" ? "逾期已还款" : null}}
				{{item.status == "10" ? "复审拒绝" : null}}
				{{item.status == "11" ? "还款处理中" : null}}
				{{item.status == "12" ? "放款失败" : null}}
			</div>
			<div class="order-btn" @click='go_route(item)'
			 v-if='item.status == "6"||item.status == "9"||item.status == "12"||item.status == "5"||item.status == "8" || item.status == "1"'>
					{{item.status == "6" ? "重新申请" : null}}
					{{item.status == "9" ? "重新申请" : null}}
					{{item.status == "12" ? "重新申请" : null}}
					{{item.status == "5" ? "去还款" : null}}
					{{item.status == "8" ? "去还款" : null}}
					{{item.status == "1" ? "详情" : null}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			this.$store.dispatch('get_order_list');
		},
		methods: {
			go_route(item) {
				if(item.status == "5" || item.status == "8"){
					this.$router.push({
						path: '/pay',
						query: {
							orderNo: item.orderNo,
							sessionId: this.$store.getters.user.sessionId
						}
					});
					this.$store.dispatch('get_pay_info', item);
				}else if (item.status == '6' || item.status == '7'){
					this.$go('home')
				}else if (item.status === '1'){
					this.$go('auth')
				}
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	@import '@/styles/variables.scss';
	.order-list-tiips {
		width: 90%;
		margin: 2rem auto;
		text-align: center;
	}
	.order-view {
		.order-filter {

			width: 100%;
		}
		.order-list {
			width: 90%;
			border: 1px solid #efefef;
			border-radius: 5px;
			margin: 10px auto;
			padding: .2rem .4rem;
			box-sizing: border-box;
			position: relative;
			box-shadow: 2px 2px 2px #efefef;
			background-color: #fff;
			font-size: .24rem;
			line-height: .48rem;
			color: #000;
			position: relative;
			.order-btn {
				position: absolute;
				bottom: .4rem;
				right: .24rem;
				font-size: .30rem;
				background-color: #6c8bff;
				border-radius: 50px;
				color: #fff;
				text-align: center;
				box-shadow: 2px 2px 4px #ccc;
				padding: .08rem .4rem;
			}
			/*书签*/
			.bookmark {
				float: right;
				position: absolute;
				top: 12px;
				right: 0px;
				color: #fff;
				background-color: #6881ff;
				padding: 0 .2rem 0 .2rem;
				height: .6rem;
				line-height: .6rem;
			}
			.bookmark:before {
				/*做一个书签效果*/
				position: absolute;
				/*必须*/
				top: 0px;
				right: -.3rem;
				z-index: 1;
				height: 0;
				font-weight: bold;
				border: .3rem solid #6881ff;
				border-left-width: 0;
				border-right-color: transparent;
				/*右边框透明，变成空缺的角*/
				/*				box-shadow: 0 5px 5px -5px #000;*/
				white-space: nowrap;
				content: ""
			}
			.bookmark:after {
				/*书签的夹角*/
				content: '';
				position: absolute;
				bottom: -8px;
				left: 0px;
				border: 4px solid #6881ff;
				border-left-color: transparent;
				border-bottom-color: transparent;
			}
		}

	}

</style>
