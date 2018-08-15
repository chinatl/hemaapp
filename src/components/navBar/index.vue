<template>
	<div class="nav-bar" :style="{
		backgroundColor: opacity ? 'transparent' : '#6881ff',
		position: absolute ? 'absolute' : 'relative'
	}">
		<van-icon name="arrow-left" v-if='show' @click='go_route'/>
		{{title}}
	</div>
</template>
<script>
	export default {
		daya() {
			return {

			}
		},
		props: {
			title: {
				type: String
			},
			show: {
				type: Boolean
			},
			opacity: {
				type: Boolean
			},
			absolute: {
				type: Boolean
			}
		},
		methods: {
			go_route() {
				this.$emit('go')
			}
		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	@import '@/styles/variables.scss';
	.nav-bar {
		height: $navBarHeight;
		max-width: 640px;
		width: 100%;
		text-align: center;
		color: #fff;
		line-height: $navBarHeight;
		font-size: .36rem;
		background-color: #6881ff;
		position: relative;
		/*		padding-top: .08rem;*/
		.van-icon-arrow-left {
			position: absolute;
			left: 10px;
			top: 50%;
			transform: translate(0, -50%);
			font-size: 16px;
			padding: 10px;
		}
	}

</style>
