<template>
		<view>
			<u-field
				label="收件人"
				placeholder="请输入收件人"
			>
			</u-field>
			<u-field
				label="主题"
				placeholder="请输入主题"
			>
			</u-field>
			<view class="wrap" >
				<u-row gutter="16" justify="space-between">
					<u-col span="3">
						<view class="demo-layout bg-purple">添加文件</view>
					</u-col>
					<u-col span="3">
						<view class="demo-layout bg-purple">发送</view>
					</u-col>
				</u-row>
			</view>
			<view><text>正文:</text></view>
			<jin-edit placeholder="请输入内容" @editOk="editOk" uploadFileUrl="http://www.sunshine2020cc.cn/upload/img"></jin-edit>
		</view>
</template>

<script>
</script>

<style>
	.wrap {
		padding: 24rpx;

	}
	
	.u-row {
		margin: 40rpx 0;
	}
	
	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
	}
	
	.bg-purple {
		background: #d3dce6;
		text-align: center;
	}

</style>
