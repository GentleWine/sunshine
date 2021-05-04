<template>
	<view>
		<!-- 左侧消息/头像 -->
		<view class="u-flex">
			<u-avatar :src="src_xx" mode="circle" @click="gotoMyInfo"></u-avatar>
			<u-avatar :src="src_tx" mode="circle" @click="gotoMyHole"></u-avatar>
		</view>

		<view>
			<!-- 分段器 -->
			<u-subsection :list="list0" :current="1" @change="sectionChange"></u-subsection>
		</view>

		<view v-show="curNow === 0" class="huodong">
			<!-- 字体大小不一尚未进行设置 -->
			<u-cell-group>
				<u-cell-item icon="setting-fill" title="[公告] 社区发帖守则"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[招募]  社区警察 I WANT YOU"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[活动]  书写心情 分享故事"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[话题]  你最想出续作的作品"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[热门]  我的一个抑郁症朋友"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[反馈]  为了更好的体验,我们需要您的反馈"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view v-show="curNow === 1" class="huodong">
			<!-- 字体大小不一尚未进行设置 -->
			<u-cell-group>
				<u-cell-item icon="setting-fill" title="[公告] 社区发帖守则"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[招募]  社区警察 I WANT YOU"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[热门]  我的一个抑郁症朋友"></u-cell-item>
				<u-cell-item icon="setting-fill" title="[反馈]  为了更好的体验,我们需要您的反馈"></u-cell-item>
			</u-cell-group>
		</view>

		<!-- 瀑布流 -->
		<view class="wrap">
			<u-button @click="clear">清空帖子</u-button>
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @tap="">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.date}}
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								关注
							</view>
							<view class="demo-tag-text">
								收藏
							</view>
						</view>
						<view class="demo-shop">
							{{item.writer}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @tap="">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.date}}
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								关注
							</view>
							<view class="demo-tag-text">
								收藏
							</view>
						</view>
						<view class="demo-shop">
							{{item.writer}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//分段器的两个段
				list0: [{
						name: '热门活动'
					},
					{
						name: '最新活动'
					}
				],
				curNow :0,
				// 头像
				src_tx: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				src_xx: 'https://i.loli.net/2021/01/18/sTMqxPSv78FZrE2.png',

				loadStatus: 'loadmore',
				flowList: [],
				list: [{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						writer: '作者A',
						title: '这是一个文章',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						date: 2021 - 1 - 18,
						title: '这是一个文章',
						writer: '作者A',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
				]
			}
		},
		onLoad() {
			this.addRandomData();
		},
		// onReady() {
		// 	this.addRandomData();
		// },
		// onShow() {
		// 	this.addRandomData();
		// },
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			gotoMyHole() {
				uni.navigateTo({
					url: 'MyHole/MyHole'
				});
			},
			gotoMyInfo() {
				uni.navigateTo({
					url: 'MyInfo/MyInfo'
				});
			},
			sectionChange(index) {
				this.curNow = index;
			},
			addRandomData() {
				for (let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = this.$u.guid();
					this.flowList.push(item);
				}
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			},
			// 暂时没有URL先这样
			// openinfo(e) {
			// 	var newsid = e.currentTarget.dataset.newsid;
			// 	uni.navigateTo({
			// 		url: './ariticle/article?newsid='+newsid
			// 	});
			// }
		}
	}
</script>

<style lang="scss">
	.u-flex {
		flex-direction: row;
		justify-content: space-between;
	}

	.huodong {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: #FFB6C1;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 20rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>
