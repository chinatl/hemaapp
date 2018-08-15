<template>
	<div class="payoffline-view">
		<nav-bar title='线下还款'  show @go='$go("pay")' opacity absolute></nav-bar>
		<div class="common-filter opacity-bgc">
			<div class="common-filter-block" style="padding-top:1.5rem">
				<div>
					<p class="text">编号</p>
					<p class="text">{{order_data.orderNo}}</p>
				</div>
				<div>
					<p class="text">应还款金额</p>
					<p class="text">{{order_data.refundAmount}}元</p>
				</div>
				<div>
					<p class="text">应还款日期</p>
					<p class="text">{{order_data.refundTime}}</p>
				</div>
			</div>
		</div>
		<div class="payoffline-con">
			<div class="payoffline-code">
				<div class="left">
					<p>支付宝账号</p>
					<p class="wx bold">{{order_data.sysChannelAccountResponse && order_data.sysChannelAccountResponse.alipayNo}}</p>
<!--					<p class="left-btn"><span class="copy-btn">一键复制</span></p>-->
					<p>支付宝名称 </p>
					<p class="wx bold">{{order_data.sysChannelAccountResponse && order_data.sysChannelAccountResponse.alipayName}}</p>
				</div>
				<div class="right">
<!--
					<vue-qr text="Hello world!" :margin='0'></vue-qr>
					<p class='right-tips'>(长按保存到手机相册)</p>
-->
					<span class="copy-btn" v-clipboard="copyData" @success="handleSuccess">一键复制</span>
				</div>
			</div>
			<div class="payoffline-tips">请按账单金额给上述账号转账，并备注您的姓名和XX 钱包注册手机号，转账成功后上传转账截图。</div>
			<div class="payoffline-look"><span>查看实例</span><van-icon name="arrow" /></div>
			<div class="input_alipay">
				<span>支付宝账号</span>
				<input type="text" placeholder="请输入还款使用的支付宝账号" v-model='ali_number'>
				<span class="half-cirle right-one"></span>
				<span class="half-cirle left-one"></span>
			</div>
			<div class="payoffline-upload">
				<p class="upload-tips">上传图片：<span class="ccc">不超过三张</span></p>
				<ul class="clearfix">
					<li v-for='(item,index) in imgList'>
					<span class="del_span" @click='del_img(index)'>-</span>
					<img :src="item.content" alt="" @click='preview_img(index)'>
					</li>
					<li class='add' v-if='imgList.length !== 3'>
						<van-uploader :after-read="onRead" accept="image/gif, image/jpeg" ><span class="upload-add">+</span></van-uploader>
					</li>
				</ul>
			</div>
			<div class="common-btn" @click='submit'>提交</div>
<!--
			<div class="half-block">
				
				<div class="half-line"></div>
			</div>
-->
		</div>
	</div>
</template>
<script>
	import VueQr from 'vue-qr';
	import {
		ImagePreview
	} from 'vant';
	export default {
		components: {
			VueQr
		},
		data() {
			return {
				imgList: [],
				ali_number: '',
				tempList: []
			}
		},
		computed: {
			order_data() {
				return this.$store.getters.order_data
			},
			copyData() {
				return this.$store.getters.order_data.sysChannelAccountResponse && this.$store.getters.order_data.sysChannelAccountResponse.alipayNo
			}
		},
		methods: {
			handleSuccess() {
				this.$toast({
					type: 'success',
					message: '复制成功！',
					duration: 1500
				});
			},
			onRead(e, x) {
				this.imgList.push(e);
				this.$post('wallet/systems/imageUpload', {
					imgBase64: e.content.replace(/^.*base64,/,''),
					type: 'OFF_LINE_REFUND_IMAGE',
					sessionId: this.$store.getters.sessionId
				}).then(res => {
					this.tempList.push(res.data.url);
					this.$toast({
						type: 'success',
						message: '上传成功！',
						duration: 1500
					});
				}).catch(res => {
					console.log(res);
				})
			},
			del_img(index) {
				this.imgList.splice(index, 1);
				this.tempList.splice(index, 1);
			},
			preview_img(index) {
				ImagePreview(this.imgList.map(res => {
					return res.content
				}), index);
			},
			/*上传*/
			submit() {
				if (!this.ali_number) {
					this.$toast({
						type: 'fail',
						message: '未输入支付宝账号！',
						duration: 1500
					});
					return
				};
				if (this.imgList === 0) {
					this.$toast({
						type: 'fail',
						message: '未上传转账截图',
						duration: 1500
					});
					return
				}
				const toast = this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '提交中'
				});
				this.$post('wallet/orders/offlineRefund', {
					orderNo: this.$store.getters.order_data.orderNo,
					alipayNo: this.ali_number,
					offineRefundType: 1,
					images: this.tempList.join('|'),
					sessionId: this.$store.getters.sessionId
				}).then(res => {
					this.$go('orderlist');
					this.$toast({
						duration: 1000, // 持续展示 toast
						message: '提交成功，请耐心等待',
						type: 'success'
					})
				}).catch(res => {
					console.log(res);
				})
			}
		}
	}

</script>

<style rel='stylesheet/scss' lang='scss'>
	.payoffline-view {
		background-color: #6983ff;
/*		padding-bottom: .2rem;*/
		height: 100%;
		.payoffline-filter {
			padding-top: .5rem;
			box-sizing: border-box;
			ul {
				width: 90%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-content: center;
				li {
					/*					width: 33%;*/
					flex: 1;
					font-size: .28rem;
					color: #fff;
					text-align: center;
					.title {
						font-size: .28rem;
						margin-bottom: .2rem;
					}
				}
			}
		}
		.payoffline-con {
			width: 90%;
			border: 1px solid #efefef;
			border-radius: 5px;
			margin: 0 auto;
			padding: .5rem .42rem;
			box-sizing: border-box;
			position: relative;
			background-color: #fff;
			position: relative;
			margin-top: -1.4rem;
			.payoffline-code {
				position: relative;
				.left {
					font-size: .26rem;
					p {
						color: #4c4c4c;
						margin-bottom: .12rem
					}
					.wx {
						color: #000;
					}
				}
				.right {
					position: absolute;
					right: 0;
					top: 0;
					margin-top: .2rem;
					.copy-btn {
						font-size: .28rem;
						background-color: #6c8bff;
						border-radius: 50px;
						color: #fff;
						text-align: center;
						box-shadow: 2px 2px 4px #ccc;
						padding: .16rem .6rem;
					}
					width: 40%;
					text-align: right;
				}
			}
			.payoffline-tips {
				font-size: .24rem;
				margin-top: .2rem;
				color: #666;
				line-height: 1.5
			}
			.payoffline-look {
				margin-top: .12rem;
				font-size: .26rem;
				display: flex;
				align-items: center;
				color: #6983ff;
				.van-icon-arrow {
					margin-left: .1rem;
					font-size: .24rem;
				}
			}
			.input_alipay {
				margin: .3rem auto;
				display: flex;
				border-top: 1px solid #efefef;
				border-bottom: 1px solid #efefef;
				justify-content: space-between;
				align-items: center;
				position: relative;
				padding: .3rem 0;
				span {
					font-size: .28rem;
					font-weight: bold;
				}
				input {
					border: none;
					font-size: .26rem;
					width: 4rem;
					text-align: right;
				}
				.half-cirle {
					width: .4rem;
					height: .4rem;
					background-color: #6781fb;
					position: absolute;
					border-radius: 50%;
					top: 50%;
				}
				.left-one {
					left: -.46rem;
					transform: translate(-50%, -50%)
				}
				.right-one {
					right: -.46rem;
					transform: translate(50%, -50%)
				}
			}
			.payoffline-upload {
				.upload-tips {
					font-size: .28rem;
					.ccc {
						font-size: .24rem;
						color: #666
					}
				}
				ul {
					margin-top: .4rem;
					margin-bottom: .6rem;
					li {
						float: left;
						width: 1.2rem;
						height: 1.2rem;
						margin-right: .3rem;
						position: relative;
						border-radius: 8px;
						box-shadow: 4px 4px 4px #edf0ff, -4px -4px 4px #edf0ff;
						position: relative;
						.del_span {
							background-color: #6685f9;
							color: #fff;
							position: absolute;
							right: 0;
							top: 0;
							width: .4rem;
							height: .4rem;
							border-radius: 50%;
							text-align: center;
							line-height: .4rem;
							font-size: .5rem;
						}
						img {
							width: 100%;
						}
						&.add {
							background-color: #94a9fc;
							box-shadow: none;
							margin-right: 0;
							.van-uploader {
								width: 100%;
								height: 100%;
								text-align: center;
								.upload-add {
									color: #fff;
									font-size: 1rem;
									line-height: 1rem;
								}
							}
						}
					}
				}
			}
		}
	}

</style>
