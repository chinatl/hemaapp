<template>
	<div class="opinion-view">
		<nav-bar title='意见反馈'show @go='$go("user")'></nav-bar>
		<div class="opinion-filter"></div>
		<div class="opinion-block">
			<div class="opinion-content" style="height:3rem">
				<div class="opinion-middle">
					<p><span class="circle"></span>感谢您的信任，我们期待您的宝贵意见</p>
					<div class="opinion-textarea">
						<textarea placeholder="请输入留言" class="van-field__control" style="height: 100px;" v-model='textarea' maxlength="100"></textarea>
						<span class="opinion-num">{{ textarea.length}}/100</span>
					</div>
				</div>
			</div>
			<div class="opinion-shadow left"></div>
			<div class="opinion-shadow right"></div>
		</div>
		<div class="opinion-content-uoload"  style="height:4rem">
			<p><span class="circle"></span>上传图片，不超过3张</p>
			<div class="opinion-list">
				<ul>
					<li v-for='(item,index) in imgList'>
						<img :src="item.content" alt="" @click='preview_img(index)'>
						<van-icon name="clear"  @click='del_img(index)'/>
					</li>
				</ul>
			</div>
			<div class="opinion-upload" v-if='imgList.length !== 3'>
				<van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
					<p>上传图片</p>
				</van-uploader>
			</div>
		</div>
		<div class="common-btn" @click='submit'>提交</div>
	</div>
</template>
<script>
	import {
		ImagePreview
	} from 'vant';
	export default {
		data() {
			return {
				textarea: '',
				imgList: [],
				tempList: []
			}
		},
		methods: {
			onRead(e, x) {
				this.imgList.push(e);
				this.$post('wallet/systems/imageUpload', {
					imgBase64: e.content.replace(/^.*base64,/, ''),
					type: 'FEED_BACK_IMAGE',
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
			submit() {
				if (!this.textarea) {
					this.$toast({
						type: 'fail',
						message: '未输入意见反馈！',
						duration: 1500
					});
					return
				};
				this.$toast.loading({
					duration: 0, // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '提交中'
				});
				this.$post('wallet/user/feedback', {
					sessionId: this.$store.getters.user.sessionId,
					feedbackString: this.textarea,
					uploadImages: this.tempList.join('|')
				}).then(res => {
					this.$toast({
						type: 'success',
						message: '提交成功！',
						duration: 1000
					});
					this.$go('user');
				}).catch(res => {
					console.log(res)
				})
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	@import '@/styles/variables.scss';
	$deg:4deg;
	.opinion-view {
		.opinion-filter {
			height: 2rem;
			background-color: #6881ff;
			width: 100%;
		}
		.opinion-block {
			position: relative;
			width: 90%;
			height: 3rem;
			top: -1rem;
			margin: 15px auto;
			.opinion-shadow {
				height: 100%;
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2;
				background-color: rgba(255, 255, 255, .6);
				border: 1px solid #efefef;
				border-radius: 5px;
				&.left {
					transform: rotate($deg);
				}
				&.right {
					transform: rotate(-$deg);
				}
			}
			.opinion-content {
				border: 1px solid #efefef;
				border-radius: 5px;
				padding: .2rem .2rem;
				box-sizing: border-box;
				position: relative;
				box-shadow: 2px 2px 2px #efefef;
				background-color: #fff;
				font-size: .24rem;
				line-height: .48rem;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 4;
				width: 100%;
				height: 100%;
				.opinion-textarea {
					position: relative;
					.opinion-num {
						position: absolute;
						bottom: -.2rem;
						right: 0;
					}
				}

			}
		}
		.opinion-content-uoload {
			width: 90%;
			border: 1px solid #efefef;
			border-radius: 5px;
			margin: 0 auto;
			padding: .2rem .2rem;
			box-sizing: border-box;
			position: relative;
			box-shadow: 2px 2px 2px #efefef;
			background-color: #fff;
			font-size: .24rem;
			line-height: .48rem;
			position: relative;
			top: -.5rem;
			.opinion-list {
				margin-top: .2rem;
				ul {
					li {
						float: left;
						width: 1.2rem;
						height: 1.2rem;
						margin-bottom: 10px;
						margin-right: 10px;
						position: relative;
						img {
							width: 100%;
						}
						.van-icon-clear {
							position: absolute;
							top: 0;
							right: 0;
							font-size: 18px;
						}
					}
				}
			}
			.opinion-upload {
				position: absolute;
				bottom: .2rem;
				left: .2rem;
				width: 1.2rem;
				height: 1.2rem;
				background-color: #7189ff;
				border-radius: 4px;
				box-shadow: 2px 2px 2px #efefef, -2px -2px 2px #efefef;
				color: #fff;
				text-align: center;
				box-sizing: border-box;
				padding-top: .4rem;
			}
		}

	}

</style>
