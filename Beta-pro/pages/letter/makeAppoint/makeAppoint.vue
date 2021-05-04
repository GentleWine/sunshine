<template>
	<view class="root">
		<view v-for="(item,index) in listarr" :key="index" class="unit-appoint" @click="doctordata()">
			<view class="unit-image">
				<image src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" mode="aspectFit" style="width: 80%;"></image>
			</view>
			<view class="unit-right">
				<text class="unit-right-text">这是医生的姓名:</text>
				<text class="unit-right-text">{{docname}}</text>
				<text class="unit-right-text">这是医师的等级:</text>
				<text class="unit-right-text">{{doclevel}}</text>
			</view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listarr:[
					'a','b','c'
				],
				docname:"samuel",
				doclevel:"国家一级心理咨询师"
			};
		},
		
		methods:{
			doctordata: function(){
				uni.navigateTo({
					url: '/pages/letter/docMessage/docMessage'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8FF;
	}
	.root {
		width: 750px;
		height: auto;
	}
	
	.unit-appoint{
		background-color: white;
		width: 750rpx;
		height: 300rpx;
		border: 2rpx solid #808080;
		display: flex;
		flex-direction: row;
		border-radius: 5px;
		margin: 3% 0;
	}
	.unit-image{
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.unit-right{
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.unit-right-text{
		margin: 5% 0;
		width: auto;
		height: auto;
	}
</style>
