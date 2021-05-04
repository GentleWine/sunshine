<template>
	<view class="root">
		<view class="windows-top">
			<u-avatar :src="src" mode='square' size='200'></u-avatar>
			<view>
				<text style="color: grey;">点击头像上传照片</text>
			</view>
		</view>
		<view class="windows-mid">
			<view class="form-see">
				<view>
					<text>注意事项</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.root {
		width: 750rpx;
		height: 1000rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.windows-top {
		width: 750rpx;
		height: 45%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.windows-mid {
		width: 750rpx;
		height: 45%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.form-see {
		width: 80%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
	}
</style>
