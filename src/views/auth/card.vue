<template>
	<div>
		<nav-bar title='绑定银行卡' show @go='$go("auth")'></nav-bar>
		<p class="common-tips h3">基础认证</p>
		<div class="common-form">
			<ul>
				<li class="between">
					<span class="text">持卡人</span>
					<span class="number">{{$store.getters.user_info.userName}}</span>
				</li>
				<li class="between">
					<span class="text">选择开户行</span>
					<span class="number" @click='select_card_bank'>{{ card_bank || "选择开户行"}}
						<van-icon name="arrow" v-if='!$store.getters.config.bankCardProgress'/>
					</span>
				</li>
				<li class="between">
					<span class="text">卡号</span>
					<input  v-model='bankNumberNo' placeholder='请填写银行卡号' style='width:5rem'
				 	:disabled='$store.getters.config.bankCardProgress ? true : false' type='text'>
				</li>
				<li class="between">
					<span class="text">手机号</span>
					<input  v-model='bankNumberMobile' placeholder='请填写银行预留手机号'  maxlength="11"
				 	:disabled='$store.getters.config.bankCardProgress ? true : false' type='text'>
				</li>
			</ul>
		</div>
<!--
		<p class="common-tips h3">银行预留手机号</p>
		<div class="common-form">
			<ul>
				<li class="between">
					<span class="text">手机号</span>
					<input  v-model='phone' placeholder='请填写银行预留手机号'  maxlength="20">
				</li>
				<li class="between">
					<span class="text">短信验证码</span>
					<input  v-model='code' placeholder='请输入'  maxlength="6" style="margin-right:1.5rem;width:1rem;text-align:left">
					<div class="send-btn">获取验证码</div>
				</li>
			</ul>
		</div>
-->
		<div class="common-btn" @click='submit_btn'>完成</div>
		<!--银行卡选择-->
		<van-popup v-model="show_card_bank" position="bottom">
  			<van-picker
			:columns="columns" 
			show-toolbar 
			@confirm="confirm_card_bank"
			@cancel="cancel_card_bank"/>
		</van-popup>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				password: '',
				show_card_bank: false,
				columns: ["中国邮政银行", "中国建设银行", "中国农业银行", "中国招商银行", "中国银行", "交通银行", "广东发展银行", "中信银行", "光大银行", "浦发银行", "中国民生银行", "兴业银行", "平安银行", "华夏银行"],
			}
		},
		computed: {
			card_bank:{
				get() {
					return this.$store.getters.bank_info.bankName
				},
				set(val) {
					this.$store.state.bank_info.bankName = val;
				}
			},
			bankNumberNo: {
				get() {
					return this.$store.getters.bank_info.bankNumberNo
				},
				set(val) {
					this.$store.state.bank_info.bankNumberNo = val;
				}
			},
			bankNumberMobile: {
				get() {
					return this.$store.getters.bank_info.bankNumberMobile
				},
				set(val) {
					this.$store.state.bank_info.bankNumberMobile = val;
				}
			}
		},
		methods: {
			/*打开学校选择下拉框*/
			select_card_bank() {
				if(this.$store.getters.config.bankCardProgress){
					return
				}
				this.show_card_bank = true;
			},
			/*确定学校*/
			confirm_card_bank(value, index) {
				this.card_bank = value;
				this.show_card_bank = false;
			},
			/*取消学校*/
			cancel_card_bank() {
				this.show_card_bank = false;
			},
			submit_btn() {
				if(this.$store.getters.config.bankCardProgress){
					this.$go("auth");
					return
				};
				if(!this.$store.getters.config.password){
					this.$go("set-pwd");
					return 
				}
				const toast = this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '认证中'
				});
				this.$post('wallet/saveUserBank', {
					sessionId: this.$store.getters.sessionId,
					bankNumberNo: this.bankNumberNo,
					bankNumberMobile: this.bankNumberMobile,
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
