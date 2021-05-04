<template>
	<view>
	<view class="u-search-box">
		<view class="u-search-inner">
			<u-icon name="search" color="#b2b2b2" :size="30"></u-icon>
			<text class="u-search-text">搜索我的好友</text>
		</view>
	</view>
	<view class="special">
		<view class="top" @tap="change">
			<u-icon name="arrow-down" color="#d9d9d9" size="30" class="icon-x"></u-icon>
			<view class="cards">特殊粉丝</view>
			<view class="cards2">2</view>
		</view>
		<view id="EleId">
			<view class="item" v-for="(item, index) in dataList" :key="index">
				<view class="left"><u-avatar :src="item.goodsUrl"  mode="square" size="80"></u-avatar></image></view>
				<view class="content">
					<view class="title u-line-2">{{ item.title }}</view>
					<view class="type">{{ item.type }}</view>
				</view>
			</view>	
		</view>
	</view>
	<view class="special">
		<view class="top" @tap="change2">
			<u-icon name="arrow-down" color="#d9d9d9" size="30" class="icon-x"></u-icon>
			<view class="cards">默认分组</view>
			<view class="cards2">2</view>
		</view>
		<view id="EleId2">
			<view class="item" v-for="(item, index) in dataList" :key="index" >
				<view class="left"><u-avatar :src="item.goodsUrl"  mode="square" size="80"></u-avatar></image></view>
				<view class="content">
					<view class="title u-line-2">{{ item.title }}</view>
					<view class="type">{{ item.type }}</view>
				</view>
			</view>	
		</view>
	</view>
	
</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [
					{					
							goodsUrl: 'https://uviewui.com/common/logo.png',
							title: '大司马',
							type: '标签：刁德一',
					},
					{
							goodsUrl: 'https://uviewui.com/common/logo.png',
							title: '马云',
							type: '标签：钱不是问题',
					}
						
				],	
				
			};
		},
		onLoad() {
	
		},
		methods: {
			change(){
				if (document.getElementById("EleId").style.display=="none")
				{
					document.getElementById("EleId").style.display="inline";
				}
				else{
					document.getElementById("EleId").style.display="none";
				}
			},
			change2(){
				if (document.getElementById("EleId2").style.display=="none")
				{
					document.getElementById("EleId2").style.display="inline";
				}
				else{
					document.getElementById("EleId2").style.display="none";
				}
			}
		
		}
	};
</script>
<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #ffffff;
}
/* #endif */
</style>
<style lang="scss">
	.u-search-box {
		border-bottom: 1rpx solid #ebebeb;
		padding: 18rpx 30rpx;
	}
	.u-search-inner {
		background-color: #f4f4f4;
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}
	
	.u-search-text {
		font-size: 25rpx;
		color:#c9c9c9;
		margin-left: 10rpx;
	}
	.top{
		display: flex;
		height:60px;
		border-bottom: 2px solid #ebebeb;
		align-items: center;
		.icon-x{
			margin-left: 10px;
		}
		.cards{
			font-weight:bolder;
			padding: 20px;
			font-size: 14px;
		}
		.cards2{
			margin-left: -14px;
			font-size: 7px;
			color:#b8b8b8;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		border-bottom: 1px solid #ebebeb;
		.left {
			margin-right: 20rpx;
			margin-left:  25rpx;
		}
		.content {
			.title {	
				font-family: WenQuanYi Micro Hei;
				font-size: 12px;				
				line-height: 50rpx;
			}
			.type {
				margin: -4rpx 0;
				font-size: 24rpx;
				color: #d3d3d3;
			}
		}
	}
	


</style>
