<template>
	<div :class='dialog ? "swal-overlay swal-overlay--show-modal" : "swal-overlay"' @click.self='close_dialog'>
		<div class="swal-modal1	 zg-modal">
			<div class="message-con">
				<div class='message-img'>
					<img :src="require('@/assets/auth.png')" alt="">
				</div>
				<div class="message-h3">
					您的认证信息未填写完毕，是否确认退出？
				</div>
			</div>
			<div class="message-btn-list">
				<div class="message-btn current" @click='left_click'>{{left_title}}</div>
				<div class="message-btn" @click='right_click'>{{right_title}}</div>
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
		props: {
			left_title: {
				default: '退出',
				type: String
			},
			right_title: {
				default: '继续填写',
				type: String
			},
			show: {
				dafault: false,
				type: Boolean
			},
			content: {
				type: String
			}
		},
		computed: {
			dialog: function(res) {
				return this.show
			}
		},
		methods: {
			left_click() {
				this.$emit('left-click')
			},
			right_click() {
				this.$emit('right-click')
			},
			close_dialog() {
				this.$emit('close')
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	.swal-overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 0;
		overflow-y: hidden;
		background-color: rgba(0, 0, 0, .6);
		z-index: 10000;
		pointer-events: none;
		opacity: 0;
		transition: opacity .3s
	}

	.swal-overlay:before {
		content: " ";
		display: inline-block;
		vertical-align: middle;
		height: 100%
	}

	.swal-overlay--show-modal {
		opacity: 1;
		pointer-events: auto
	}

	.swal-overlay--show-modal .swal-modal1 {
		opacity: 1;
		pointer-events: auto;

		animation: showSweetAlert .3s;
		will-change: transform
	}

	.swal-overlay--show-modal {
		opacity: 1;
		pointer-events: auto
	}

	.swal-modal1 {
		box-sizing: border-box;
		max-width: 512px;
		width: 80%;
		opacity: 0;
		pointer-events: none;
		background-color: #fff;
		text-align: center;
		border-radius: 3px;
		position: static;
		margin: 20px auto;
		display: inline-block;
		vertical-align: middle;
		transform: scale(1);
		transform-origin: 50% 50%;
		z-index: 10001;
		transition: transform .3s, opacity .2s;
		padding: 20px;
		border-radius: 16px;
	}

	.message-con {
		font-size: .28rem;
		overflow: hidden;
		margin-bottom: .4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.message-img {
			width: 40%;
			img {
				width: 100%
			}
		}
		.message-h3 {
			width: 60%;
			text-align: left;
			line-height: 1.6;
		}
	}

	.message-btn-list {
		display: flex;
		justify-content: space-between;
		.message-btn {
			width: 40%;
			font-size: .28rem;
			background-color: #6c8bff;
			border-radius: 50px;
			color: #fff;
			text-align: center;
			box-shadow: 2px 2px 4px #ccc;
			padding: .16rem 0;
			&.current {
				background-color: #b2b2b2;
			}
		}
	}


	@keyframes showSweetAlert {
		0% {
			transform: scale(1)
		}
		1% {
			transform: scale(.5)
		}
		45% {
			transform: scale(1.05)
		}
		80% {
			transform: scale(.95)
		}
		to {
			transform: scale(1)
		}
	}

</style>
