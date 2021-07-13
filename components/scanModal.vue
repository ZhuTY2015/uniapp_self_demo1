<template>
	<view class="scan-box" v-if="scanAll.isShow">
		<uni-icons class="float-ico" type="closeempty" size="25" color="#999" @click="hideModal"></uni-icons>
			<qiun-data-charts :type="scanAll.type" :opts="scanAll.opts" :chartData="scanAll.chartData" />
	</view>
</template>

<script>
	export default {
		data(){
			return {}
		},
		props:["scanAll"],
		mounted() {
			
		},
		methods:{
			//关闭全屏查看
			hideModal(){
				this.scanAll.isShow = false;
				this.$emit("childHide");
			},
		},
	}
</script>

<style lang="less">
	.scan-box{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 99999999;
		padding: 30rpx;
		.float-ico{
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			z-index: 9999;
		}
	}
</style>
