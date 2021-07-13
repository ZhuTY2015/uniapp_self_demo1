<template>
	<view class="container">
		<view class="tab-search">
			<uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem" activeColor="#2d8cf0"></uni-segmented-control>
			<view class="search-box">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				items:["设备清单","设备实时监控"],
				current:0,
				
			}
		},
		mounted() {
			
		},
		methods:{
			//点击切换tab
			onClickItem(e){
				this.current = e.currentIndex;
			},
			
		}
	}
</script>

<style lang="less">
	Page{
		background-color: #F4F4F4;
	}
	.container{
		.tab-search{
			background-color: #FFFFFF;
			padding: 30rpx 0;
			.search-box{
				border-top: 1px solid #EEEEEE;
			}
		}

		
	}
</style>
