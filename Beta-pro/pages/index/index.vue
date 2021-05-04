<template>
	<view class="content">
		<p>{{title}}</p>
		<button @click="goBack()">goBack</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: '登陆成功！',
			}
		},
		onShow() {
			
		},
		methods: {
			goBack:function(){
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style>
</style>
