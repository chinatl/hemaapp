<template>
	<div  :class='dialog ? "swal-overlay swal-overlay--show-modal" : "swal-overlay"' @click.self='close_dialog'>
		<div class="swal-modal zg-modal">
			<p class="dialog-title">{{content}}</p>
			<div class="dialog-btn" @click='close_dialog'>{{button}}</div>
			<div class="dialog-icon">
				<div class="inner-bgc inner1">
					<div class="inner2">
						<van-icon name="fail" />
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

			}
		},
		props: {
			button: {
				default: '我知道了',
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

	.swal-overlay--show-modal .swal-modal {
		opacity: 1;
		pointer-events: auto;

		animation: showSweetAlert .3s;
		will-change: transform
	}

	.swal-overlay--show-modal {
		opacity: 1;
		pointer-events: auto
	}

	.swal-modal {
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
		border-top: .8rem solid #6883ff
	}

	.dialog-title {
		font-size: .28rem;
		text-align: left;
		padding: .2rem;
		line-height: 1.6
	}

	.dialog-btn {
		width: 60%;
		font-size: .28rem;
		background-color: #6c8bff;
		border-radius: 50px;
		color: #fff;
		text-align: center;
		box-shadow: 2px 2px 4px #ccc;
		margin: .2rem auto 0 auto;
		padding: .16rem 0;
	}

	.dialog-icon {
		position: absolute;
		top: -.8rem;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		background-color: #6a83ff;
		display: flex;
		align-items: center;
		justify-content: center;
		.inner1 {
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: .9rem;
			height: .9rem;
			background-color: #889cff;
			.inner2 {
				width: 60%;
				height: 60%;
				text-align: center;
				border-radius: 50%;
				background-color: #a0b0ff;
				.van-icon-fail {
					font-size: .36rem;
					color: #fff;
					line-height: 1.5
				}
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
