<template>
<div class="login-view">
	<nav-bar title='登录'></nav-bar>
	<div class="login-filter color-bottom-left "></div>
<!--	<img :src="require('@/assets/login/logo.png')" alt="" alt='' class="login-logo">-->
	<div class="login-content">
		<div class="login-form-item">
			<div class="login-form-title">
				
			</div>
			<div class='login-input'>
				<input type="text" placeholder="请输入您的手机号">
			</div>
		</div>
		<div class="login-form-item">
			<div class="login-form-title">
				
			</div>
			<div class='login-input'>
				<input type="text" placeholder="请输入图形验证码">
			</div>
		</div>
		<div class="login-form-item">
			<div class="login-form-title">
				
			</div>
			<div class='login-input' style="border-bottom:none">
				<input type="text" placeholder="请输入验证码">
			</div>
		</div>
		<div class="login-button color-top-right" @click='submit_to_login'>	
			登录
		</div>
		<p class="login-tips">登陆即代表同意<span class="href-color">《乐租机用户协议》</span></p>
		<p class="login-phone"><span class="href-color">029-68083293</span></p>
		
	</div>
</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			/*获取图片验证码*/
			get_img_code() {
				userUtil.ajax({
					url: global.localUrl + "wallet/user/randomImage",
					data: {
						ss: new Date().getMilliseconds()
					},
					done: function(re) {
						$("#btnImgCode").removeClass("dis");
						if (1 == re.code) {
							$("#hdImgCodeID").val(re.data.imgSessionId);
							$("#btnImgCode").attr("src", "data:image/jpeg;base64," + re.data.imgBase64);
						}
					}
				});
			},
			/*获取短信验证码*/
			get_message_code() {
				userUtil.ajax({
					url: global.localUrl + "wallet/user/randomImage",
					data: {
						ss: new Date().getMilliseconds()
					},
					done: function(re) {
						$("#btnImgCode").removeClass("dis");
						if (1 == re.code) {
							$("#hdImgCodeID").val(re.data.imgSessionId);
							$("#btnImgCode").attr("src", "data:image/jpeg;base64," + re.data.imgBase64);
						}
					}
				});
			},
			/*确定登录*/
			submit_to_login() {
				this.$router.push({'path':'/home'})
				return
				$.ajax({
					url: global.localUrl + "wallet/user/signup",
					type: "post",
					data: JSON.stringify(_data),
					contentType: 'application/json;charset=utf-8',
					success: function(re) {
						$('.layer_mask').removeClass('on');
						if (1 == re.code) {
							layer.tips('登录成功');
							// localStorage.setItem("mobile", re.data.mobile);
							// localStorage.setItem("realName",re.data.realName);
							// localStorage.setItem("idCard",re.data.idCard);
							userUtil.mobile(_model.mobileNumber);
							userUtil.sid(re.data.sessionId);
							userUtil.userID(re.data.userUuid);
							var sessionId = re.data.sessionId;
							var bankCardProgress = 0;
							setTimeout(function() {
								window.location.href = global.localUrl + "index.html"; //跳转基本信息页面
							}, 1500);

						} else {
							changeImgCode();
							$("#txtImgCode").val("");
							$("#txtCode").val("");
							$this.removeClass("dis");
							layer.tips(re.message);
						}

					},
					error: function() {
						$('.layer_mask').removeClass('on');
						$this.removeClass("dis");
						layer.tips(global.netError);
					}
				});
			}

		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	.login-view {
		height: 100%;
		background-color: #ffedd6;
		.login-filter {
			height: 25%;
		}
		.login-logo {
			width: 100%;
			max-width: 640px;
		}
		.login-content {
			height: 85%;
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
			top: -12%;
			padding-top: 60px;
			.login-form-item {
				margin-bottom: 10px;
				overflow: hidden;
				.login-form-title {
					width: 20%;
					float: left;
					border: 1px solid #efefef;
					border-radius: 50%;
					width: 36px;
					height: 36px;
					box-sizing: border-box;
				}
				.login-input {
					float: left;
					padding-bottom: 8px;
					padding-left: 10px;
					width: 80%;
					input {
						width: 100%;
						height: 36px;
						border: none;
						border: 1px solid #ececec;
						outline: none;
						font-size: .26rem;
						border-radius: 20px;
						padding: 12px;
						background-color: #fbfbfb
					}
				}
			}
			.login-button {
				border-radius: 40px;
				text-align: center;
				color: #fff;
				font-size: .36rem;
				padding: .2rem 0;
				width: 100%;
				margin: 0 auto;
			}
			.login-tips {
				text-align: center;
				color: #999999;
				font-size: .24rem;
				margin-bottom: 12px;
				margin-top: 12px;
			}
			.login-phone {
				text-align: center;
				color: #999999;
				margin-top: 30px;
				font-size: .28rem;
			}
		}
	}

</style>
