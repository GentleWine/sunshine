<template>
	<view class="all">
		<!--状态栏-->
		<!--回到顶部-->
		<view>
		<u-back-top :scrollTop="scrollTop" :mode="mode" :bottom="bottom" :right="right" :top="top" :icon="icon" :custom-style="customStyle"
		 :icon-style="iconStyle" :tips="tips">
		</u-back-top>
		</view>
		<!--顶部模块-->
		<view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-tabs v-if="control" :background="background" :bold="bold" :active-color="activeColor" :list="list1" @change="change"
				 :current="current" :is-scroll="isScroll" :offset="offset" @click="goActivity1()"></u-tabs>
			</view>
		</view>
		<!--主题页面-->
		<view class="total">
			<view>
				<view class="u-demo-area">
					<u-toast ref="uToast"></u-toast>
					<u-swiper @change="change" :height="250" :list="list" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos"
					 :mode="mode" :interval="3000" @click="click"></u-swiper>
				</view>
			</view>
			<view class="articles">
				<view @click="goArticle()">
					<button>
						<view class="article">
							<!--文章导航-->
							<view class="article-picture">
								<!--发布时间-->
								<text>{{timing1}}</text>
							</view>
							<view class="information">
								<view class="article-title">
									<!--标题-->
									<text>{{title1}}</text>
								</view>
								<view class="blank1"></view>
								<view class="article-information">
									<view class="article-author">
										<!--作者-->
										<text>{{author1}}</text>
									</view>
									<view class="blank2"></view>
									<view class="article-reader">
										<!--阅读数-->
										<text>{{readers1}}</text>
									</view>
								</view>
							</view>
						</view>
					</button>
				</view>


				<view @click="goArticle()">
					<button>
						<view class="article">
							<!--文章导航-->
							<view class="article-picture">
								<!--发布时间-->
								<text>{{timing1}}</text>

							</view>

							<view class="information">
								<view class="article-title">
									<!--标题-->
									<text>{{title1}}</text>
								</view>
								<view class="blank1"></view>
								<view class="article-information">
									<view class="article-author">
										<!--作者-->
										<text>{{author1}}</text>
									</view>
									<view class="blank2"></view>
									<view class="article-reader">
										<!--阅读数-->
										<text>{{readers1}}</text>
									</view>
								</view>
							</view>

						</view>
					</button>
				</view>

				<view @click="goArticle()">
					<button>
						<view class="article">
							<!--文章导航-->
							<view class="article-picture">
								<!--发布时间-->
								<text>{{timing1}}</text>

							</view>

							<view class="information">
								<view class="article-title">
									<!--标题-->
									<text>{{title1}}</text>
								</view>
								<view class="blank1"></view>
								<view class="article-information">
									<view class="article-author">
										<!--作者-->
										<text>{{author1}}</text>
									</view>
									<view class="blank2"></view>
									<view class="article-reader">
										<!--阅读数-->
										<text>{{readers1}}</text>
									</view>
								</view>
							</view>

						</view>
					</button>
				</view>


				<view class="articles">
					<view @click="goArticle()">
						<button>
							<view class="article">
								<!--文章导航-->
								<view class="article-picture">
									<!--发布时间-->
									<text>{{timing2}}</text>

								</view>

								<view class="information">
									<view class="article-title">
										<!--标题-->
										<text>{{title2}}</text>
									</view>
									<view class="blank1"></view>
									<view class="article-information">
										<view class="article-author">
											<!--作者-->
											<text>{{author2}}</text>
										</view>
										<view class="blank2"></view>
										<view class="article-reader">
											<!--阅读数-->
											<text>{{readers2}}</text>
										</view>
									</view>
								</view>

							</view>
						</button>
					</view>

					<view class="articles" @click="get_article()">
						<view @click="goArticle()">
							<button>
								<view class="article">
									<!--文章导航-->
									<view class="article-picture">
										<!--发布时间-->
										<text>{{timing3}}</text>

									</view>

									<view class="information">
										<view class="article-title">
											<!--标题-->
											<text>{{title3}}</text>
										</view>
										<view class="blank1"></view>
										<view class="article-information">
											<view class="article-author">
												<!--作者-->
												<text>{{author3}}</text>
											</view>
											<view class="blank2"></view>
											<view class="article-reader">
												<!--阅读数-->
												<text>{{readers3}}</text>
											</view>
										</view>
									</view>

								</view>
							</button>
						</view>
					</view>
					<view class="u-demo-area">
						<u-toast ref="uToast" />
						<u-loadmore :status="status" :loadText="loadText" :icon-type="iconType" :is-dot="isDot" @loadmore="loadmore" />
					</view>
				</view>
			</view>
			<!--底部模块-->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//
				scrollTop: 0,
				mode: 'circle',
				bottom: 200,
				right: 40,
				top: 400,
				icon: 'arrow-upward',
				iconStyle: {
					color: '#909399',
					fontSize: '38rpx'
				},
				customStyle: {},
				tips: '',
				/*顶部TAB*/
				list1: [],
				data: [{
					name: '活动',
					count: 100
				}, {
					name: '文章',
					count: 7
				}, {
					name: '订阅'
				}, ],
				current: 0,
				sectionCurrent: 0,
				isScroll: false,
				tabCountIndex: 0,
				activeColor: this.$u.color['primary'],
				bold: true,
				control: true,
				offset: [5, -5],
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 28), rgb(141, 198, 63))'
				},
				/*活动图片索引*/
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				title: false,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: false,
				/*文章索引*/
				timing1: "33分钟前",
				title1: "互联网时代：灵魂的归属与栖息之地在何处",
				author1: "吴怼怼",
				readers1: "12k",
				timing2: "33分钟前",
				title2: "互联网时代：灵魂的归属与栖息之地在何处",
				author2: "吴怼怼",
				readers2: "12k",
				timing3: "33分钟前",
				title3: "互联网时代：灵魂的归属与栖息之地在何处",
				author3: "吴怼怼",
				readers3: "12k",
				//加载
				status: 'loadmore',
				iconType: 'circle',
				isDot: false,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
				current: 0,
			}
		},

		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

		onLoad() {
			this.list1 = this.data;
		},

		computed: {
			slotRightCurrent() {
				return this.slotRight ? 0 : 1;
			}
		},

		onShow() {

		},
		methods: {

			change(index) {
				this.current = index;
			},

			click(index) {
				this.$refs.uToast.show({
					title: `点击了第${index + 1}张图片`,
					type: 'success'
				})
			},
			goSearch: function() {
				uni.reLaunch({
					url: '/pages/home/search'
				});
			},
			goArticle: function() {
				uni.reLaunch({
					url: '/pages/home/article'
				});
			},
			goActivity1: function() {
				uni.reLaunch({
					url: '/pages/home/activity'
				});
			},
			goActivity2: function() {
				uni.reLaunch({
					url: '/pages/home/activity'
				});
			},
			goActivity3: function() {
				uni.reLaunch({
					url: '/pages/home/activity'
				});
			},

			get_article: function() {
				const data = {
					time: this.timing3,
					title: this.title3,
					author: this.author3,
					readers: this.readers3
				};
				console.log(data);
				uni.request({
					//文章的URL
					url: 'http://www.sunshine2020cc.cn:8080/user/login',
					//
					method: 'post',
					//
					data: {
						time: data.time,
						title: data.title,
						author: data.author,
						readers: data.readers,
					},
					//header
					header: {
						'content-type': 'application/json;charset=utf-8',
					},
					dataType: 'json',

					complete: (res) => {
						console.log(getStorageSync('information')),
							console.log('get'),
							uni.setStorageSync('information')
					}
				})
				return
			},

		},

		styleChange(index) {
			this.current = 1;
			this.statusChange(1);
			this.iconType = index == 0 ? 'circle' : 'flower';
		},
		isDotChange(index) {
			this.current = 3;
			this.statusChange(3);
			this.isDot = index == 0 ? true : false;
		},
		// 点击组件，触发加载更多事件(status为'loadmore'状态下才触发)
		loadmore() {
			this.$refs.uToast.show({
				title: '点击触发加载更多',
				type: 'success'
			})
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/SCSS/global.scss";

	.u-demo {
		//height: 200vh;
		height: calc(100% - 44px);
		height: calc(100% - 44px - constant(safe-area-inset-top));
		height: calc(100% - 44px - env(safe-area-inset-top));
	}

	.wrap {
		padding: 24rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
		display: flex;
	}

	.message-box {}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240, 240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}

	.map-wrap-text {
		padding: 0 6rpx;
	}

	/*顶部选中线*/
	.chosenline {}

	.home {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		height: 8vh;
	}

	.homebutton {
		background-color: rgba(206, 255, 206, 1);
		width: 3vh;
		height: 3vh;
		align-self: center;
	}

	.hometext {
		width: 3vh;
		height: 2vh;
		line-height: 2vh;
		color: rgba(206, 255, 206, 1);
		font-size: 1vh;
		text-align: center;
		font-family: PingFangSC-regular;
	}

	.total {
		display: inline-flex;
		flex-flow: column nowrap;
	}

	.picture-title {
		flex: 3;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}


	.picture {
		width: 40vh;
		height: 20vh;
	}

	.articles {
		overflow-y: scroll;
		flex: 4;
		display: inline-flex;
		flex-direction: column;
	}

	.article {
		width: 100%;
		border: 1vh solid rgba(255, 255, 255, 1);
		display: inline-flex;
		flex-direction: row nowrap;
		align-self: flex-start;
	}



	.information {
		flex: 10;
		display: inline-flex;
		background-color: darkgreen;
		flex-flow: column nowrap;
		align-self: flex-start;
		height: 15vh;
	}

	.article-picture {
		background-image: url(./u=2792432903,20076664&fm=26&gp=0.jpg);
		background-size: cover;
		flex: 7;
		height: 15vh;
		display: inline-flex;
		justify-content: flex-start;
		align-items: flex-end;
		color: rgba(255, 255, 255, 1);
		text-align: left;
		font-family: PingFangSC-regular;
		font-size: 1vh;
	}


	.article-title {
		color: rgba(16, 16, 16, 1);
		text-align: left;
		font-family: PingFangSC-regular;
		font-size: 2vh;
		flex: 1;
	}

	.blank1 {
		flex: 1;
	}

	.article-information {
		display: inline-flex;
		flex-flow: row nowrap;
		justify-content: space-around;
	}

	.article-author {
		color: rgba(190, 190, 190, 1);
		text-align: left;
		font-family: PingFangSC-regular;
		font-size: 1vh;
		flex: 3;
	}

	.blank2 {
		flex: 10;
	}

	.article-reader {
		color: rgba(190, 190, 190, 1);
		text-align: right;
		font-family: SFUIText-regular;
		font-size: 1vh;
		flex: 1;
	}
</style>
