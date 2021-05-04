<template>
	<view class="root">
		<view class="win-top">
			<u-avatar :src="src" size='large'></u-avatar>
		</view>
		<view class="win-mid">
			<u-form :model="form" ref="">
				<u-form-item label="性别">
					<u-radio-group v-model="form.sex" @change="">
						<u-radio @change="" v-for="(item, index) in sexlist" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>

				<u-form-item label="学历">
					<u-radio-group v-model="form.acad" @change="">
						<u-radio @change="" v-for="(item, index) in acadlist" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>

				<u-form-item label='工作'>
					<u-select v-model="show" :list="joblist" @confirm="jobConfirm"></u-select>
					<u-button @click="show = true"><text style="color: #808080;">{{form.job}}</text></u-button>
				</u-form-item>

				<u-form-item label='生日'>
					<u-calendar v-model="caleshow" :mode="'date'" @change="dateConfirm"></u-calendar>
					<u-button @click="caleshow = true"><text style="color: #808080;">{{form.birthday}}</text></u-button>
				</u-form-item>

				<u-form-item label='爱好'>
					<u-field v-model="form.hobby" placeholder="请填写自己的爱好"></u-field>
				</u-form-item>
			</u-form>
			<u-button @click="submit" shape="square" size="default" style='margin-top: 20rpx;'>提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				caleshow: false,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				form: {
					sex: '男',
					acad: '本科',
					job: '点击进行选择',
					birthday: '点击选择生日',
					hobby: '',
				},
				sexlist: [{
						name: '男',
					},
					{
						name: '女',
					}
				],
				acadlist: [{
						name: '小学以下'
					}, {
						name: '小学'
					},
					{
						name: '初中'
					},
					{
						name: '高中'
					},
					{
						name: '本科'
					},
					{
						name: '研究生'
					},
					{
						name: '博士及以上'
					}
				],
				joblist: [{
					value: 1,
					label: '互联网相关'
				}, {
					value: 2,
					label: '医药相关'
				}, {
					value: 3,
					label: '教育'
				}]
			};
		},
		methods: {
			jobConfirm: function(res) {
				console.log(res[0].label)
				this.form.job = res[0].label
			},
			dateConfirm: function(res) {
				console.log(res)
				this.form.birthday = res.year.toString() + '-' + res.month.toString() + '-' + res.day.toString()
			},
			submit:function(){
				console.log(this.form)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: white;
	}
	.root {
		width: 750rpx;
		height: 1000rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.win-top {
		width: 100%;
		height: 30%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.win-mid {
		background-color:#F8F8F8;
		width: 90%;
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
