<template>
	<div class="auth-view">
		<nav-bar title='认证中心' @go='open_messahe_dialog' show></nav-bar>
		<div class="auth-title"><svg-icon icon-class='基础认证'></svg-icon>基础认证</div>
		<!-- 认证开始 -->
		<div class="auth-list" @click='push_path("auth-user")'>
			<span :class='$store.getters.config.userProgress ? "auth-line current" : "auth-line"'></span>
			<span class='auth-icon'>
				<svg-icon icon-class='身份认证' :class='$store.getters.config.userProgress? "current" : ""'></svg-icon>
			</span>
			<span class="auth-name">身份认证</span>
			<span class="auth-value">
				{{!$store.getters.config.userProgress ? "（未开始）" : null}}
				{{$store.getters.config.userProgress === 1 ? "（已完成）" : null}}
				{{$store.getters.config.userProgress === 2 ? "（申请中）" : null}}
			</span>
			<span class="auto-path">
				<svg-icon :icon-class='$store.getters.config.userProgress ? "对号" : "加号2"'></svg-icon>
			</span>
		</div>
<!-- 运营商认证 -->
		<div class="auth-list"  @click='go_operator'>
			<span :class='$store.getters.config.operatorProgress ? "auth-line current" : "auth-line"'></span>
			<span class='auth-icon'>
				<svg-icon icon-class='运营商认证' :class='$store.getters.config.operatorProgress ? "current" : ""'></svg-icon>
			</span>
			<span class="auth-name">运营商认证</span>
			<span class="auth-value">
				{{!$store.getters.config.operatorProgress ? "（未开始）" : null}}
				{{$store.getters.config.operatorProgress === 1 ? "（已完成）" : null}}
				{{$store.getters.config.operatorProgress === 2 ? "（申请中）" : null}}
			</span>
			<span class="auto-path">
				<svg-icon :icon-class='$store.getters.config.operatorProgress ? "对号" : "加号2"'></svg-icon>
			</span>
		</div>
<!-- 银行卡认证 -->
		<div class="auth-list" @click='push_path("auth-card")'>
			<span :class='$store.getters.config.bankCardProgress ? "auth-line current" : "auth-line"'></span>
			<span class='auth-icon'>
				<svg-icon icon-class='银行卡认证' :class='$store.getters.config.bankCardProgress ? "current" : ""'></svg-icon>
			</span>
			<span class="auth-name">银行卡认证</span>
			<span class="auth-value">
				{{!$store.getters.config.bankCardProgress ?"（未开始）" : null}}
				{{$store.getters.config.bankCardProgress === 1 ? "（已完成）" : null}}
				{{$store.getters.config.bankCardProgress === 2 ? "（申请中）" : null}}
			</span>
			<span class="auto-path">
				<svg-icon :icon-class='$store.getters.config.bankCardProgress ? "对号" : "加号2"'></svg-icon>
			</span>
		</div>
<!-- 公积金认证  -->
		<div class="auth-list" @click='go_providentss'>
			<span :class='$store.getters.config.providentProgress ? "auth-line current" : "auth-line"'></span>
			<span class='auth-icon'>
				<svg-icon icon-class='公积金认证' :class='$store.getters.config.providentProgress ? "current" : ""'></svg-icon>
			</span>
			<span class="auth-name">公积金认证</span>
			<span class="auth-value">
				{{!$store.getters.config.providentProgress? "（未开始）" : null}}
				{{$store.getters.config.providentProgress === 1 ? "（已完成）" : null}}
				{{$store.getters.config.providentProgress === 2 ? "（申请中）" : null}}
			</span>
			<span class="auto-path">
				<svg-icon :icon-class='$store.getters.config.providentProgress ? "对号" : "加号2"'></svg-icon>
			</span>
		</div>
<!-- 支付宝认证 -->
		<div class="auth-list" @click='go_alipay'>
			<span :class='$store.getters.config.zhimaProgress ? "auth-line current" : "auth-line"'></span>
			<span class='auth-icon'>
				<svg-icon icon-class='支付宝认证' :class='$store.getters.config.zhimaProgress ? "current" : ""'></svg-icon>
			</span>
			<span class="auth-name">支付宝认证</span>
			<span class="auth-value">
				{{!$store.getters.config.zhimaProgress? "（未开始）" : null}}
				{{$store.getters.config.zhimaProgress === 1 ? "（已完成）" : null}}
				{{$store.getters.config.zhimaProgress === 2 ? "（申请中）" : null}}
			</span>
			<span class="auto-path">
				<svg-icon :icon-class='$store.getters.config.zhimaProgress ? "对号" : "加号2"'></svg-icon>
			</span>
		</div>
		<!-- 认证结束 -->
		<div class="common-btn" @click='open_tips_dialog'>{{$store.getters.auth_type  === "user" ? "完成" : "提交审核"}}</div>
		<tips :show='tips_dialog' @close='close_tips_dialog' @submit='close_tips_dialog' :content='content'></tips>
		<message-dialog :show='message_dialog'
		 @left-click='$go($store.getters.auth_type || "user")'
		 @right-click='message_dialog = false'
		 @close='message_dialog = false' ></message-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			var now_url = encodeURI(window.location.href);
			return {
				tips_dialog: false,
				auth_list: [
					{
						name: '银行卡认证',
						icon: '银行卡认证',
						path: 'auth-card',
					},
					{
						name: '公积金',
						icon: '联系人信息',
						path: 'auth-gong'
					}
				],
				content: '请务必填写您的真实信息，错误 信息会影响您的审核结果。',
				message_dialog: false,
				themeColor:"#6881ff",
				now_url,
				domainUrl:'https://api.51datakey.com/h5/importV3',
				apiKey:'00a4be26195d4856965c5293629b84b2',
				userId:'moxietest'
			}
		},
		created() {
			this.$store.dispatch('get_config_info');
			if (!this.$store.getters.config.userProgress ||
				!this.$store.getters.config.operatorProgress ||
				!this.$store.getters.config.bankCardProgress) {
				this.tips_dialog = this.$route.query.flag ? true : false;
			}
			this.init();
		},
		methods: {
			/* 运营商认证 */
			go_operator(){
				if(this.$store.getters.config.operatorProgress){
					return 
				}
				window.location.href =`${this.domainUrl}/index.html#/carrier?apiKey=${this.apiKey}&userId=${this.apiKey}&backUrl=${this.now_url}&themeColor=${this.themeColor}`;
			},
			/* 支付宝认证 */
			go_alipay(){
				if(this.$store.getters.config.zhimaProgress){
					return 
				}
				window.location.href = `${this.domainUrl}#/alipay?apiKey=${this.apiKey}&userId=${this.userId}`
			},
			/* 去公积金认证页面*/
			go_providentss(){
				if(this.$store.getters.config.providentProgress){
					return 
				}
				window.location.href = `${this.domainUrl}/index.html#/fundlist?apiKey=${this.apiKey}&userId=${this.userId}&backUrl=${this.now_url}&themeColor=${this.themeColor}`;
			},
			/*条件查询*/
			push_path(path) {
				if (path === "auth-phone" && !this.$store.getters.config.userProgress) {
					this.$toast({
						type: 'fail',
						message: '请先完成身份认证！',
						duration: 1500
					});
					return
				}
				if (path === "auth-card") {
					if (!this.$store.getters.config.userProgress) {
						this.$toast({
							type: 'fail',
							message: '请先完成身份认证！',
							duration: 1500
						});
						return
					}
					if (!this.$store.getters.config.operatorProgress) {
						this.$toast({
							type: 'fail',
							message: '请先完成运营商认证！',
							duration: 1500
						});
						return
					}
				}
				this.$go(path);
			},
			init() {
				if (this.$store.getters.config.userProgress) {
					this.$store.dispatch('get_user_info');
				}
				if (this.$store.getters.config.bankCardProgress) {
					this.$store.dispatch('get_bank_info');
				}
			},
			/* 初始化*/
			open_messahe_dialog() {
				if (!this.$store.getters.config.userProgress ||
					!this.$store.getters.config.operatorProgress ||
					!this.$store.getters.config.bankCardProgress) {
					this.message_dialog = true;
				} else {
					this.$go(this.$store.getters.auth_type);
				}
			},
			open_tips_dialog() {
				if (this.$store.getters.auth_type === 'user') {
					this.$go('user');
					return
				}
				if (!this.$store.getters.config.userProgress
				|| !this.$store.getters.config.operatorProgress 
				|| !this.$store.getters.config.bankCardProgress 
				|| !this.$store.getters.config.providentProgress
				|| !this.$store.getters.config.zhimaProgress) {
					this.tips_dialog = true;
					this.content = '您的认证信息未填写完毕，请填写完毕后再提交审核。';
				   	return
				}
				this.$post('web/credit/submitCompletion', {
					sessionId: this.$store.getters.sessionId
				}).then(res => {
					this.$store.commit('set_pay_status', '1');
					this.$go('orderlist');
				}).catch(res => {
					console.log(res)
				});
			},
			close_tips_dialog() {
				this.tips_dialog = false
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	@import '@/styles/variables.scss';
	.auth-view {
		.auth-title {
			width: 90%;
			margin: 0 auto;
			margin-top: .2rem;
			.svg-icon {
				color: #6881ff;
				font-size: .44rem;
				margin-right: .1rem;
				vertical-align: top
			}
		}
		.auth-list {
			width: 90%;
			margin: 0 auto;
			margin-top: .2rem;
			background-color: #fff;
			border-radius: 6px;
			padding: .4rem;
			box-sizing: border-box;
			box-shadow: 2px 2px 2px #efefef, -2px -2px 2px #efefef;
			position: relative;
			.auth-line {
				width: 3px;
				height: .8rem;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translate(0, -50%);
				background-color: #ccc;
				&.current {
					background-color: #6881ff;
				}
			}
			.auth-icon {
				display: inline-block;
				width: .6rem;
				.svg-icon {
					font-size: .48rem;
					color: #ccc;
					&.current {
						color: #6881ff;
					}
				}
			}
			.auth-name {
				font-size: .28rem;
				width: 1.5rem;
				display: inline-block;
			}
			.auth-value {
				font-size: .24rem;
				color: #666
			}
			.auto-path {
				float: right;
				display: inline-block;
				.svg-icon {
					font-size: .32rem;
					color: #ccc;
					&.current {
						color: #6881ff;
					}
				}
			}
		}
	}

	/*弹窗*/

</style>
