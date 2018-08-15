<template>
	<div>
		<nav-bar title='个人信息' show @go='$go("auth")'></nav-bar>
		<p class="common-tips h3">基本信息</p>
		<div class="common-form">
			<ul>
				<li class="between">
					<span class="text">学历：</span>
					<span class="number" @click='select_school'>{{ school || "请选择"}} <van-icon name="arrow" /></span>
				</li>
				<li class="between">
					<span class="text">邮箱：</span>
					<input  v-model='password' placeholder='请填写邮箱'  maxlength="20">
				</li>
				<li class="between">
					<span class="text">微信号：</span>
					<input v-model='wx' placeholder='请填写微信号'  maxlength="20">
				</li>
				<li class="between">
					<span class="text">现居住地址：</span>
					<span class="number" @click='select_address'>{{ address || "请选择"}} <van-icon name="arrow" /></span>
				</li>
				<li class="between">
					<span class="text">详细居住地址：</span>
					<input  v-model='aaddress' placeholder="请填写详细居住地址" />
				</li>
			</ul>
		</div>
		<div class="common-btn" @click='$go("auth")'>完成</div>
		<!--地区选择-->
		<van-actionsheet v-model="show_address">
  			<van-area :area-list="areaList" @confirm='confirm_address' @cancel='cancel_address'/>
		</van-actionsheet>
		<!--学历选择-->
		<van-popup v-model="show_school" position="bottom">
  			<van-picker
			:columns="columns" 
			@change="onChange"
			show-toolbar 
			@confirm="confirm_school"
			@cancel="cancel_school"/>
		</van-popup>
	</div>
</template>
<script>
	import areaList from '@/assets/data/area'
	console.log(areaList)
	export default {
		data() {
			return {
				username: '',
				address: '',
				aaddress: '', //详细居住地址
				wx: '',
				show_address: false, //下拉框地址
				password: '',
				areaList: [],
				show_school: false,
				columns: ["初中", "高中", "中专", "大专", "本科", "研究生"],
				school: ''
			}
		},
		created() {
			this.areaList = areaList;
		},
		methods: {
			onChange(picker, value, index) {

			},
			/*打开学校选择下拉框*/
			select_school() {

				this.show_school = true;
			},
			/*确定学校*/
			confirm_school(value, index) {
				this.school = value;
				this.show_school = false;
			},
			/*取消学校*/
			cancel_school() {
				this.show_school = false;
			},
			/*打开地址选择下拉框*/
			select_address() {
				this.show_address = true;
			},
			/*确定选择*/
			confirm_address(e) {
				var arr = e.map(res => {
					return res.name
				});
				var newArr = Array.from(new Set(arr));
				this.address = newArr.join('-')
				this.show_address = false;
			},
			/*取消选择*/
			cancel_address() {
				this.show_address = false;
			}
		}
	}

</script>
