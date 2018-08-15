<template>
	<div class="fail-view">
		<nav-bar title='审核详情' show @go='$go("orderlist")'></nav-bar>
		<div class="fail-content">
			<h3>哎呀,借款审核未通过</h3>
			<div class="fail-suggest">
				<p><span class="fail-numer">1</span>保护好个人信息及个人隐私</p>
				<p><span class="fail-numer">2</span>保持良好的还款习惯</p>
				<p><span class="fail-numer">3</span>保持良好的个人信用记录</p>
			</div>
		</div>
	</div>
</template>
<style rel='stylesheet/scss' lang='scss'>
	@import '@/styles/variables.scss';
	.fail-view {
		.fail-content {
			text-align: center;
			h3 {
				font-size: .3rem;
				margin-top: 3rem;
			}
			.fail-suggest {
				font-size: .26rem;
				text-align: left;
				width: 200px;
				margin: 0 auto;
				line-height: .8rem;
				margin-top: .5rem;
				.fail-numer {
					background-color: #6984ff;
					border-radius: 50%;
					color: #fff;
					display: inline-block;
					width: .4rem;
					height: .4rem;
					text-align: center;
					line-height: .4rem;
					margin-right: .2rem;
					box-shadow: 2px 2px 2px #ccc;
				}
			}
		}
	}

</style>
