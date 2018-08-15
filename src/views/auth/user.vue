<template>
	<div class="auth-user-view">
		<nav-bar title='身份认证' show @go='$go("auth")'></nav-bar>
		<div class="auth-user-title"><svg-icon icon-class='喇叭' class='icon'></svg-icon><span class='auth-user-tips'>小贴士</span>只有进行实名认证，才能完成借款哦</div>
		<div class="auth-user-upload">
			<div class="auth-upload-content" v-if='img_data.content'>
				<img :src="img_data.content" alt="">
				<van-icon name="delete" @click='del_img' v-if='!$store.getters.config.userProgress'/>
			</div>
			<van-uploader :after-read="onRead">
				<svg-icon icon-class='身份证'></svg-icon>
			</van-uploader>
		</div>
		<div class="common-form">
			<ul>
				<li>
					<span class="text">姓名：</span>
					<input type="text" v-model='username' placeholder='请输入真实姓名' maxlength="20" 
					:disabled='$store.getters.config.userProgress ? true : false'>
				</li>
				<li>
					<span class="text">身份证：</span>
					<input type="text" v-model='password' placeholder='请填写身份证号'  maxlength="18" 
					:disabled='$store.getters.config.userProgress ? true : false'>
				</li>
			</ul>
		</div>		
		<div class="common-btn" @click='submit' v-if='!$store.getters.config.userProgress'>完成</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				img_data: {
					content: ''
				}
			}
		},
		computed: {
			username: {
				get() {
					return this.$store.getters.user_info.userName
				},
				set(val) {
					this.$store.state.user_info.userName = val;
				}
			},
			password: {
				get() {
					return this.$store.getters.user_info.idCard
				},
				set(val) {
					this.$store.state.user_info.idCard = val;
				}
			},
			content() {
				return this.$store.getters.user_info.imgUrl;
			}
		},
		created() {
			if (this.$store.getters.config.userProgress) {
				this.img_data.content = 'http://imgs.chnsxhc.com/IDCard/' + this.$store.state.user_info.imgUrl;
			}
		},
		methods: {
			/*回县*/
			onRead(e) {
				this.img_data = e;
				this.$post('wallet/systems/imageUpload', {
					imgBase64: e.content.replace(/^.*base64,/,''),
					type: 'ID_CARD',
					sessionId: this.$store.getters.sessionId
				}).then(res => {
					this.$toast({
						type: 'success',
						message: '身份证信息上传成功！',
						duration: 1500
					});
				}).catch(res => {
					console.log(res);
				})
			},
			/*提交*/
			submit() {
				if (!this.username) {
					this.$toast({
						type: 'fail',
						message: '真实姓名为空!',
						duration: 1000
					});
					return
				}
				if (!this.password) {
					this.$toast({
						type: 'fail',
						message: '身份证信息为空!',
						duration: 1000
					});
					return
				}
				const toast = this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '认证中'
				});
				this.$post('web/credit/addUserBaseMsg', {
					realName: this.username,
					idCardNo: this.password,
					sessionId: this.$store.getters.sessionId,
					mobileNumber: this.$store.getters.user.mobile,
				}).then(res => {
					toast.clear();
					this.$go('auth');
					this.$store.commit('set_config', res.data);
				}).catch(res => {
					console.log(res);
				})
			},
			del_img() {
				this.img_data = {
					content: ''
				};
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	@import '@/styles/variables.scss';
	$color:#b4c0fb;
	.auth-user-view {
		.auth-user-title {
			width: 90%;
			margin: 0 auto;
			margin-top: .2rem;
			font-size: .24rem;
			color: #999;
			.svg-icon {
				font-size: .48rem;
				float: left;
				margin-right: .1rem;
			}
			.auth-user-tips {
				font-size: .3rem;
				margin-right: .3rem;
				color: #000
			}
		}
		.auth-user-upload {
			width: 70%;
			height: 3rem;
			margin: .8rem auto;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			.svg-icon {
				font-size: 6rem
			}
			.auth-upload-content {
				position: absolute;
				top: -2%;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: red;
				width: 100%;
				margin: 0 auto;
				height: 104%;
				background-color: #fff;
				border-radius: 6px;
				box-sizing: border-box;
				box-shadow: 2px 2px 2px #efefef, -2px -2px 2px #efefef;
				z-index: 10;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					max-width: 100%;
					max-height: 100%;
				}
				.van-icon-delete {
					position: absolute;
					right: 10px;
					top: 10px;
					cursor: pointer;
				}
			}
		}
	}

</style>
