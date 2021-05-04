<template>
	<view>
		<view>
			<view class="total">
				<text>欢迎注册SUNSHINE平台</text>
			</view>
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view class="title">昵称</view>
					<input name="nicheng" placeholder="请输入您的昵称" v-model="name" />
				</view>
				<view>
					<view class="title">性别</view>
					<radio-group name="sex" v-model="sex">
						<label>
							<radio value="1" checked="true" color="#E6E6FA" /><text>男</text>
						</label>
						<label>
							<radio value="0" color="#FFE4E1" /><text>女</text>
						</label>
					</radio-group>
				</view>
				<view>
					<view class="title">邮箱</view>
					<input name="user" placeholder="请输入您的邮箱" v-model="email" />
				</view>
				<view>
					<view class="title">密码</view>
					<input name="password" placeholder="请输入您的密码" password="true" v-model="password" />
				</view>
				<view>
					<view class="title">手机号</view>
					<input name="phonenumber" placeholder="请输入您注册手机号" v-model="phoneNumber" />
				</view>
				<view>
					<view class="title">您的年龄</view>
					<slider value="50" name="age" max="120" v-model="age" activeColor="#8470FF" show-value></slider>
				</view>
				<view>
					<button form-type="submit" @click="btnReg()">注册</button>
					<button type="default" form-type="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				sex: "",
				email: "",
				password: "",
				phoneNumber: "",
				age: 50
			};
		},
		methods: {
			formSubmit: function(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				console.log(this.$data)
				// var formdata = e.detail.value
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			// 注册并传输数据
			btnReg: function() {
				uni.request({
					// 服务器的URL
					url: 'xxxx',
					method: 'POST',
					data: {
						nickname: this.name,
						password: this.password,
						sex: this.sex,
						email: this.email,
						phone: this.phonenumber,
						age: this.age
					},
					success: res => {
						this.res = res.data;
						if (this.res.code == 500) {
							uni.showToast({
								title: "注册成功",
								duration: 2000,
								success() {
									setTimeout(function() {
										uni.navigateTo({
											url: '../login/login',
										});
									}, 1000);

								}
							});
						}
					},
					fail: () => {
						console.log("服务器请求失败!");
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.total {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.total text {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: larger;
		color: #FFDAB9;
	}

	.title {
		width: 100%;
		height: 5%;
		border-top: 2rpx solid #D3D3D3;
		border-bottom: 2rpx solid #8470FF;
		margin: 20rpx 0;
		background-color: #F8F8FF;
	}
</style>
