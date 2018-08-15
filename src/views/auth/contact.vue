<template>
	<div>
		<nav-bar title='联系人信息' show @go='$go("auth")'></nav-bar>
		<div class="common-form">
			<ul>
				<li class="between">
					<span class="text">第一联系人关系</span>
					<span class="number" @click='select_one_ship'>{{ one_ship || "请选择"}} <van-icon name="arrow" /></span>
				</li>
				<li class="between">
					<span class="text">第一联系人关系姓名</span>
					
					<input  v-model='one_name' placeholder='请输入'  maxlength="16" style='width:2rem'>
				</li>
				<li class="between">
					<span class="text">第一联系人关系手机号</span>
					<input  v-model='one_phone' placeholder='请输入'  maxlength="16" style='width:2rem'>
				</li>
			</ul>
		</div>
		<div class="common-form">
			<ul>
				<li class="between">
					<span class="text">第二联系人关系</span>
					<span class="number" @click='select_two_ship'>{{ two_ship || "请选择"}} <van-icon name="arrow" /></span>
				</li>
				<li class="between">
					<span class="text">第二联系人关系姓名</span>
					
					<input  v-model='two_name' placeholder='请输入'  maxlength="16" style='width:2rem'>
				</li>
				<li class="between">
					<span class="text">第二联系人关系手机号</span>
					<input  v-model='two_phone' placeholder='请输入'  maxlength="16" style='width:2rem'>
				</li>
			</ul>
		</div>
		<div class="common-btn" @click='$go("auth")'>完成</div>
		<!-- 第一联系人 -->
		<van-popup v-model="show_one_ship" position="bottom">
  			<van-picker
			:columns="columns" 
			show-toolbar 
			@confirm="confirm_one_ship"
			@cancel="cancel_one_ship"/>
		</van-popup>
		<!-- 第二联系人 -->
		<van-popup v-model="show_two_ship" position="bottom">
  			<van-picker
			:columns="columns" 
			show-toolbar 
			@confirm="confirm_two_ship"
			@cancel="cancel_two_ship"/>
		</van-popup>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			
				columns: ["朋友1","朋友2","朋友3","朋友4"],
				show_one_ship: false,
				one_ship: '',
				one_name: '',
				one_phone: '',
				show_two_ship: false,
				two_ship: '',
				two_name: '',
				two_phone: '',
			}
		},
		methods: {
			/*打开学校选择下拉框*/
			select_one_ship() {
				this.show_one_ship = true;
			},
			/*确定学校*/
			confirm_one_ship(value, index) {
				this.one_ship = value;
				this.show_one_ship = false;
			},
			/*取消学校*/
			cancel_one_ship() {
				this.show_one_ship = false;
			},
			/*打开学校选择下拉框*/
			select_two_ship() {
				this.show_two_ship = true;
			},
			/*确定学校*/
			confirm_two_ship(value, index) {
				this.two_ship = value;
				this.show_two_ship = false;
			},
			/*取消学校*/
			cancel_two_ship() {
				this.show_two_ship = false;
			},
		}
	}

</script>
