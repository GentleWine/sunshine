<template>

	<view class="u-demo-area">
		<u-toast :type="type" ref="uToast"></u-toast>
		<u-notice-bar :autoplay="autoplay" :playState="playState" :speed="speed" @getMore="getMore" :mode="mode" @end="end"
		 @close="close" @click="click" :show="show" :type="type" :list="list" :moreIcon="moreIcon" :volumeIcon="volumeIcon"
		 :duration="duration" :isCircular="isCircular"></u-notice-bar>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				show: true,
				autoplay: false,
				type: 'primary',
				list: [
					'锦瑟无端五十弦，一弦一柱思华年',
					'庄生晓梦迷蝴蝶，望帝春心托杜鹃',
					'沧海月明珠有泪，蓝田日暖玉生烟'
				],
				mode: 'horizontal',
				playState: 'play',
				speed: 160,
				duration: 2000,
				moreIcon: true,
				volumeIcon: true,
				isCircular: true,
				current: 0,
			}
		},
	}
</script>

<style>
</style>
