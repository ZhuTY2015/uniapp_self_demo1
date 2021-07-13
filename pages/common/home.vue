<template>
	<view class="home-box">
		<image src="../../static/imgs/home-bg.jpg" mode="aspectFill" class="bg-image"></image>
		<view>请稍后...</view>
	</view>	
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		mounted() {
			let token = uni.getStorageSync("token");
			console.log(token)
			if(token.token){
				uni.switchTab({
				    url: '../device/list'
				});
			}else{
				uni.navigateTo({
					url:'./login'
				})
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	.home-box{
		position: fixed;
		top: 0;
		right:0;
		left:0;
		bottom:0;
		z-index: 2;
		overflow: hidden;
		.bg-image{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
