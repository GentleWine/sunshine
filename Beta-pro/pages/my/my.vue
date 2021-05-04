<template>
	<view>
		<view class="uchat">
			<u-icon name="more-circle" size="70"></u-icon>
		</view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<!-- 头像 -->
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="150"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{name}}</view>
				<view class="u-flex-2">
					<u-icon name="qzone" label="资料设置" @tap="openMessage"></u-icon>
				</view>
			</view>
		</view>
		<view>
			<u-grid :col="3">
				<u-grid-item @tap="openinfo5">
					<u-icon name="bookmark" :size="70"></u-icon>
					<view class="grid-text">心理状况评测</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="question-circle" :size="70"></u-icon>
					<view class="grid-text">我的动态</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="email" :size="70"></u-icon>
					<view class="grid-text">状况监测记录</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view>
			<div>阅读</div>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="bookmark-fill" title="文章收藏" @tap="openinfo"></u-cell-item>
				<u-cell-item icon="thumb-up-fill" title="我的喜欢" @tap="openinfo2"></u-cell-item>
				<u-cell-item icon="pushpin" title="我的订阅" @tap="openinfo3"></u-cell-item>
				<u-cell-item icon="clock" title="历史记录" @tap="openinfo4"></u-cell-item>
			</u-cell-group>
		</view>
		<view>
			<div class="div1">用户</div>
		</view>
		<view class="u-m-t-21">
			<u-cell-group>
				<u-cell-item icon="heart-fill" title="我的好友" @tap="openMyFriend"></u-cell-item>
				<u-cell-item icon="account" title="我的粉丝"></u-cell-item>
			</u-cell-group>
		</view>
		<view>
			<div>其他</div>
		</view>
		<view class="u-m-t-22">
			<u-cell-group>
				<u-cell-item icon="heart" title="反馈与帮助"></u-cell-item>
				<u-cell-item icon="setting-fill" title="系统设置" @tap="openSysSetting"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: '',
				name: "sun",
				show: true,
			}
		},
		onLoad() {
			uni.request({				url: 'http://www.sunshine2020cc.cn/getimage/test.png',				method: 'GET',				responseType:'ArrayBuffer',				header: {					'content-type':'application/json'				},				success: (res) => {					this.pic = "data:image/png;base64," + uni.arrayBufferToBase64(res.data);				}			})
		},
		methods: {
			openMessage(){
				uni.navigateTo({
					url: './message/message/message'
				});
			},
			openMyFriend(){
				uni.navigateTo({
					url: './friend/friend'
				});
			},
			openSysSetting(){
				uni.navigateTo({
					url: './set/set'
				});
			},
			openinfo(e) {
				uni.navigateTo({
					url: '../my/collect/collect'
				});
			},
			openinfo2(e) {
				uni.navigateTo({
					url: '../my/enjoy/enjoy'
				});
			},
			openinfo3(e) {
				uni.navigateTo({
					url: '../my/subscribe/subscribe'
				});
			},
			openinfo4(e) {
				uni.navigateTo({
					url: '../my/history/history'
				});
			},
			openinfo5() {
				uni.navigateTo({
					url: '../my/heartcondition/heartcondition'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #dedede;
	}

	.uchat {
		position: absolute;
		right: 1%
	}

	.user-box {
		height: 180px;
		padding-top: 30px;
		background-color: #ffffff;
		padding-bottom: 150px;
		border-bottom: solid #e7e7e7;

	}

	// grid字体
	.grid-text {
		font-size: 28rpx;
		margin-top: 20rpx;
		color: $u-type-info;
	}

	div {
		height: 20px;
		line-height: 30px;
		text-indent: 10px;
		color: #666;
	}

	.div1 {
		height: 30px;
		line-height: 30px;
		color: #666;
	}
</style>
