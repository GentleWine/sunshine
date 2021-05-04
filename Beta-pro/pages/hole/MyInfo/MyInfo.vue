<template>
	<view>
		<u-card :title="title" :sub-title="subTitle" :thumb="thumb">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">这是回复的内容</view>
					<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
					 mode="aspectFill"></image>
				</view>
		
			</view>
			<view style="display: flex;justify-content: space-around;" slot="foot">
				<view class="u-body-item-title u-line-2">{{answer}}</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '这是管理员的ID',
				subTitle: '2021-01-19',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				answer:'这是我的帖子标题'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
	
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
