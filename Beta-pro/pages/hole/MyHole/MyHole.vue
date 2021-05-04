<template>
	<view style="width: 750rpx;height: 1000rpx;">
		<view class="win-top">
			<view class="win-top-left" style="">
				<u-avatar :src="src" style="margin-bottom: 8%;"></u-avatar>
				<text>用户:{{username}}</text>
				<text>签名:{{sign}}</text>
			</view>
			<view class="win-top-right" style="">
				<text>身份:{{status}}</text>
				<text>关注数:{{followNumber}}</text>
				<text>粉丝数:{{fansNumber}}</text>
			</view>
		</view>
		<u-subsection :list="list" :current="curNow" active-color="#00BFFF" @change="sectionChange"></u-subsection>

		<view v-show="curNow === 0" class="tab_first">
			<u-card :title="title" :sub-title="subTitle" :thumb="thumb">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">这是文章的正文</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						 mode="aspectFill"></image>
					</view>

				</view>
				<view style="display: flex;justify-content: space-around;" slot="foot">
					<u-icon name="chat-fill" size="34" color="" label="30点赞"></u-icon>
					<u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon>
					<u-icon name="chat-fill" size="34" color="" label="30转发"></u-icon>
				</view>
			</u-card>

			<u-card :title="title" :sub-title="subTitle" :thumb="thumb">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">这是文章的正文</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						 mode="aspectFill"></image>
					</view>

				</view>
				<view style="display: flex;justify-content: space-around;" slot="foot">
					<u-icon name="chat-fill" size="34" color="" label="30点赞"></u-icon>
					<u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon>
					<u-icon name="chat-fill" size="34" color="" label="30转发"></u-icon>
				</view>
			</u-card>
		</view>

		<view v-show="curNow === 1" class="tab_second">
			<u-card :title="answer" :sub-title="subTitle" :thumb="thumb">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">这是回复的内容</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						 mode="aspectFill"></image>
					</view>

				</view>
				<view style="display: flex;justify-content: space-around;" slot="foot">
					<u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon>
				</view>
			</u-card>
			<u-card :title="answer" :sub-title="subTitle" :thumb="thumb">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">这是回复的内容</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						 mode="aspectFill"></image>
					</view>

				</view>
				<view style="display: flex;justify-content: space-around;" slot="foot">
					<u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon>
				</view>
			</u-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '我的树洞'
					},
					{
						name: '我的评论'
					}
				],
				curNow: 0,
				title: '这是文章的标题',
				subTitle: '2021-01-19',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				answer: '这是回复的标题',
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				username: "这是用户的名字",
				sign: "这是一个签名",
				status:"这是一个身份",
				followNumber:"这是一些关注数",
				fansNumber:"这是一些粉丝数"
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8FF;
	}

	.win-top {
		width: 100%;
		height: 40%;
		display: flex;
		flex-direction: row;
		border-bottom: 2rpx solid #808080;
		border-top: 2rpx solid #808080;
	}

	.win-top-left {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-right: 1px dashed #808080;
	}

	.win-top-right {
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-left: 1px dashed #808080;
		text{
			width:80%;
			height:auto;
			margin:2% 0;
		}
	}

	.tab_first {
		width: 750rpx;
		height: 1500rpx;
	}

	.tab_second {
		width: 750rpx;
		height: 1500rpx;
	}

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
