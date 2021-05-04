<!-- oaFJfza6whPjC26.html -->
<template>
	<view>
		<view @click="testResquest" class="root">
			<text>获取图片</text>
		</view>
		<view @click="testUploadImg" class="root">
			<text>上传图片</text>
		</view>
		<view @click="testGetHtml" class="root">
			<text>获取html</text>
		</view>
		<view @click="testGetHoleAnnoun" class="root">
			<text>获取树洞公告</text>
		</view>
		<view class="in">验证码</view>
		<input class="indo" type="text" placeholder="text..." placeholder-style="color:grey" v-model="verifyCode">
		<image :src="verifyCodeImageSrc" class="verifyImage" @click="changeCodeImg()"></image>
		<view @click="testRegister" class="root">
			<text>进行注册测试</text>
		</view>
		<view class="root" @click="testGetArticleReply">
			<text>获取文章评论</text>
		</view>
		<img :src="resourcePath" alt="">
		<u-parse :html="texthtml"></u-parse>
		<u-parse :html="texthtml2"></u-parse>
		<view>
			<text>{{title}}</text>
			<text>{{content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resourcePath: '',
				texthtml: '',
				texthtml2: '',
				title: '',
				content: '',
				verifyCode: '',
				verifyCodeImageSrc: ''
			}
		},
		onLoad() {
			console.log('yes')
			uni.request({
				url: this.$webUrl + '/getverified?width=100&height=50&length=5',
				method: 'GET',
				header: {},
				responseType: 'ArrayBuffer',
				success: (res) => {
					console.log(res);
					console.log(res.cookies[0]);
					this.verifyCodeImageSrc = "data:image/png;base64," + uni.arrayBufferToBase64(res.data);
					uni.setStorage({
						key: 'token2',
						data: res.cookies[0].substring(6),
						success: function() {
							console.log('setStorageSuccess!');
						}
					});
				}
			})
		},
		methods: {
			testResquest: function() {
				uni.request({
					url: 'http://www.sunshine2020cc.cn/getimage/test.png',
					method: 'GET',
					responseType: 'ArrayBuffer',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(this.resourcePath)
						this.resourcePath = "data:image/png;base64," + uni.arrayBufferToBase64(res.data);
						console.log(this)
						console.log(this.resourcePath)
						console.log(res);
					}
				})
			},
			testUploadImg: function() {
				const usertoken = uni.getStorageSync('usertoken');
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://www.sunshine2020cc.cn/upload/img',
							filePath: tempFilePaths[0],
							fileType: 'image',
							name: 'file',
							header: {
								'Token': usertoken
							},
							success: (uploadFileRes) => {
								console.log('ajax success')
								console.log(uploadFileRes);
							}
						});
					}
				});
			},
			testGetHtml: function() {
				uni.request({
					url: 'http://www.sunshine2020cc.cn/article/user?phone=110&type=0&page=0&size=2',
					method: 'GET',
					// responseType: 'text',
					header: {
						'Token': uni.getStorageSync('usertoken'),
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(res);
						for (var num = 0; num < res.data.items.length; num++) {
							console.log(res.data.items[num].name)
							uni.request({
								url: this.$htmlUrl + '110/' + res.data.items[num].name,
								method: 'GET',
								header: {
									'Token': uni.getStorageSync('usertoken'),
									'content-type': 'application/json'
								},
								success: (res) => {
									console.log(res)
									console.log(res.data)
									if (this.num === 0) {
										this.texthtml = res.data;
									} else {
										this.texthtml2 = res.data;
									}
								}
							})
						}
					}
				})
			},
			//	这是铜铜的书信的获取公告的函数
			testGetHoleAnnoun: function() {
				uni.request({
					url: 'http://www.sunshine2020cc.cn:8080/post/getPost',
					method: 'POST',
					data: {
						id: '3'
					},
					header: {
						'content-type': 'application/json',
					},
					success: (res) => {
						console.log(res)
						this.title = res.data.title
						this.content = res.data.content
					}
				})
			},
			testRegister: function() {
				uni.request({
					url: this.$webUrl + '/register',
					method: 'POST',
					data: {
						verifycode: this.verifyCode,
						phone: "18630014212",
						email: '3106688044@qq.com',
						age: 21,
						sex: 'M',
						password: 'Aht123456',
						nickname: 'AnHaoTong'
					},
					header: {
						'content-type': 'application/json',
						'Token': uni.getStorageSync('token2')
					},
					success: (res) => {
						console.log(res)
					}
				})
			},
			changeCodeImg: function() {
				uni.request({
					url: this.$webUrl + '/getverified?width=100&height=50&length=5',
					method: 'GET',
					header: {},
					responseType: 'ArrayBuffer',
					success: (res) => {
						console.log(res);
						this.verifyCodeImageSrc = "data:image/png;base64," + uni.arrayBufferToBase64(res.data);
						uni.setStorage({
							key: 'token2',
							data: res.cookies[0].substring(6),
							success: function() {
								console.log('setStorageSuccess!');
							}
						});
					}
				})
			},
			testGetArticleReply: function() {
				uni.request({
					// url: 'http://www.sunshine2020cc.cn/article/reply?phone=110&postname=oaFJfza6whPjC26.html',
					url: 'http://www.sunshine2020cc.cn/article/reply?phone=110&postname=7nlhiyHd4VjKPQk.html',
					method: 'GET',
					header: {
						'Token': uni.getStorageSync('usertoken'),
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log('获取文章评论成功');
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.root {
		width: 200rpx;
		height: 100rpx;
		border: 2rpx solid red;
	}


	.in {
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
		font-size: large;
		align-self: flex-start;
		color: #51629E;
	}

	.indo {
		color: #e59e00;
	}

	.verifyImage {
		width: 200rpx;
		height: 100rpx;
		border: 1px solid red;
	}
</style>
