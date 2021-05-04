<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in news" :key="index" @tap="openinfo" :data-newsid="item.post_id">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.author_avatar"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.created_at}}</view>
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
				news : []
			};
		},
		onLoad:function(){
			uni.showLoading({
				title:"加载中...."
			})
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news',
				method: 'GET',
				data: {},
				success: res => {
					this.news = res.data;
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			openinfo(e) {
				var newsid = e.currentTarget.dataset.newsid;
				uni.navigateTo({
					url: '../info/info?newsid='+newsid
				});
			}
		},
	}
</script>

<style lang="scss">
/* .uni-media-list-body{height: auto;}
.uni-media-list-text-top{line-height:1.6em;} */


.uni-media-list {
	padding: 22upx 30upx;
	box-sizing: border-box;
	display: flex;
	width: 100%;
	flex-direction: row;
	border-bottom: 1px solid #e7e7e7;
}

.uni-navigate-right.uni-media-list {
	padding-right: 74upx;
}

.uni-pull-right {
	flex-direction: row-reverse;
}

.uni-pull-right>.uni-media-list-logo {
	margin-right: 0upx;
	margin-left: 20upx;
}

.uni-media-list-logo {
	height: 84upx;
	width: 84upx;
	margin-right: 20upx;
}

.uni-media-list-logo image {
	height: 100%;
	width: 100%;
}

.uni-media-list-body {
	height: auto;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	overflow: hidden;
}

.uni-media-list-text-top {
	width: 100%;
	line-height: 1.6em;
	font-size: 34upx;
}

.uni-media-list-text-bottom {
	width: 100%;
	line-height: 30upx;
	font-size: 28upx;
	color: #8f8f94;
}

</style>

