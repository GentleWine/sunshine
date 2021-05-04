<template>
	<view class="root">
		<view style="width: 750rpx;height: 100rpx;display:flex;align-items: center;">
			<text>医生资料</text>
		</view>
		<view style="width: 750rpx;height: 400rpx;display: flex;justify-content: center;align-items: center;flex-direction: column;">
			<image src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" mode="aspectFit" style="width: 50%; height: 80%;"></image>
			<text style="width: 750rpx;">name</text>
		</view>
		
		<view style="width: 750rpx;height: 100rpx;display:flex;align-items: center;">
			<text>医生简介</text>
		</view>
		<view style="width: 750rpx;height:auto;display:flex;align-items: center;margin-bottom: 15px;">
			<!-- <u-parse :html="content" style="width: 750rpx;"></u-parse> -->
			<text style="width: 750rpx;">由美国计算机学家莱斯利·兰伯特（Leslie Lamport）在20世纪80年代初期开发，利用这种格式，即使使用者没有排版和程序设计的知识也可以充分发挥由TeX所提供的强大功能，能在几天，甚至几小时内生成很多具有书籍质量的印刷品。对于生成复杂表格和数学公式，这一点表现得尤为突出。因此它非常适用于生成高印刷质量的科技和数学类文档。这个系统同样适用于生成从简单的信件到完整书籍的所有其他种类的文档。</text>
		</view>
		<view class="bottom-button">
			<text style="color: #F0F8FF;">发起聊天</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`
			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8FF;
	}

	.root {
		width: 750rpx;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.bottom-button{
		width: 750rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 4rpx solid white;
		background-color: pink;
		border-radius:15px ;
	}
</style>
