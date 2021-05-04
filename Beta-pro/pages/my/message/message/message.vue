<template>
	<view class="root">
		<view class="windows-top">
			<view style="width: 350px;color: #C0C0C0;margin-bottom: 40px;">
				<view @click="gotoModify">修改资料</view>
			</view>
			<u-avatar :src="src" mode='square' size='large' @click="gotoAvatar"></u-avatar>
		</view>

		<view class="windows-mid">
			<view class="form-see">
				<view class='table-unit'>
					<text>昵称</text>
					<text style="color: #C0C0C0;">{{name}}</text>
				</view>
				<view class='table-unit'>
					<text>性别</text>
					<text style="color: #C0C0C0;">{{sex}}</text>
				</view>
				<view class='table-unit'>
					<text>学历</text>
					<text style="color: #C0C0C0;">{{acad}}</text>
				</view>
				<view class='table-unit'>
					<text>工作</text>
					<text style="color: #C0C0C0;">{{job}}</text>
				</view>
				<view class='table-unit'>
					<text>生日</text>
					<text style="color: #C0C0C0;">{{birthday}}</text>
				</view>
				<view class='table-unit'>
					<text>爱好</text>
					<text style="color: #C0C0C0;">{{hobby}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				name:'Bob',
				sex:'male',
				acad:'本科',
				job:'IT',
				birthday:'2000-10-02',
				hobby:'吃'
			};
		},
		methods:{
			gotoAvatar(){
				uni.navigateTo({
				    url: '../avatarSetting/avatarSetting'
				});
			},
			gotoModify(){
				uni.navigateTo({
					url:'../modifyInfo/modifyInfo'
				})
			}
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
	.form-see{
		width: 80%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
	}
	.table-unit{
		left: 20%;
		width: 100%;
		height: 20%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		border-bottom:#3F536E solid 2rpx;
	}
	
</style>
