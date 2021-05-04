<template>
	<!--整体页面-->
	<view class="all">
		<!--顶部搜索框-->
		<view>
			<u-search shape="round"></u-search>
		</view>
		<view class="total">
	<view class="wrap" >
		<u-row gutter="16" justify="around">
			<u-col span="4">
				<view class="demo-layout bg-purple" @click="writeletter()">写信</view>
			</u-col>
			<u-col span="4">
				<view class="demo-layout bg-purple" @click="appointment()">预约</view>
			</u-col>
		</u-row>
	</view>

			<!--岛屿来信-->
	<view>
	<u-cell-group title="岛屿来信">
		<u-cell-item icon="setting-fill" title="信箱来信"></u-cell-item>
		<u-cell-item icon="integral-fill" title="草稿箱"></u-cell-item>
		<u-cell-item icon="integral-fill" title="历史信件"></u-cell-item>
	</u-cell-group>
	</view>
			<!--医师预约-->
			<view>
	<u-cell-group title="医师预约">
		<u-cell-item icon="setting-fill" title="心理师预约"></u-cell-item>
		<u-cell-item icon="integral-fill" title="我的预约"></u-cell-item>
	</u-cell-group>
			</view>
		</view>
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
			goHome: function() {
				uni.reLaunch({
					url: '/pages/home/home'
				});
			},
			appointment: function(){
				uni.navigateTo({
					url: '/pages/letter/makeAppoint/makeAppoint'
				})
			},
			writeletter: function(){
				uni.navigateTo({
					url: '/pages/letter/writeLetter/writeLetter'
				})
			}
		},
	}
</script>

<style>
	@import "@/SCSS/global.scss";
	.wrap {
		padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
	}

	.bg-purple {
		background: #d3dce6;
	}

</style>
