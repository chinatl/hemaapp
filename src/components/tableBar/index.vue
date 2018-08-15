<template>
	<div class="table-bar">
		<ul>
			<li>
				<router-link to='/home'>
					<svg-icon icon-class='钱包'></svg-icon>
					<p>钱包</p>
				</router-link>
			</li>
			<li>
				<router-link to='/user'>
					<svg-icon icon-class='我的'></svg-icon>
					<p>我的</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {

		data() {
			return {

			}
		},
		methods: {

		}
	}

</script>
<style rel='stylesheet/scss' lang='scss'>
	@import '@/styles/variables.scss';

	.table-bar {
		height: $tableBarHeight;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		ul {
			max-width: 640px;
			min-width: 320px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			background-color: rgba(255,255,255,.9);
			height: 100%;
			li {
				font-size: .24rem;
				text-align: center;
				flex: 1;
				a {
					color: #bfbfbf;
					&.router-link-active {
						color: #6a86ff;
					}
					.svg-icon {
						font-size: .48rem;
					}
				}
			}
		}
	}

</style>
