<template>
	<view class="u-content">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//富文本
				content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-content {
		margin-top: 100rpx;
	}
</style>