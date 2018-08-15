<template>
	<div>
		<nav-bar title='设置' show @go='$go("user")'></nav-bar>
		<div class="common-form">
			<ul>
<!--
				<li class="between" @click='$go("set-pwd")'>
					<span class="text"><svg-icon icon-class='锁'></svg-icon>设置交易密码</span>
					<van-icon name="arrow" />
				</li>
-->
				<li class="between" @click='$go("reset-pwd")' v-if='$store.getters.config.completionAll'>
					<span class="text"><svg-icon icon-class='锁'></svg-icon>重置交易密码</span>
					<van-icon name="arrow" />
				</li>
				<li class="between" @click='$store.dispatch("logout")'>
					<span class="text"><svg-icon icon-class='退出登录'></svg-icon>退出登录</span>
					<van-icon name="arrow" />
				</li>
			</ul>
		</div>
	</div>
</template>
