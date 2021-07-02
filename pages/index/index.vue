<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<!-- 分组 -->
		<!-- <uni-group title="分组">
		    <view>分组 的内容</view>
		    <view>分组 的内容</view>
		</uni-group> -->
		
		<!-- 数字徽标 -->
		<!-- <uni-group title="数字徽标" top="20">
			<uni-badge size="small" :text="100" absolute="rightTop" type="primary">
				<button type="primary" size="mini" class="mini-btn">右上</button>
			</uni-badge>
		</uni-group> -->
		
		<!-- 卡片 -->
	<!-- 	<uni-group title="卡片" top="20">
		
			<uni-card 
			    title="Dcloud" 
			    :is-shadow="true" 
			    extra="技术没有上限" 
			    note="Tips"
				:isShadow="true"
			>
			    uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代app同时也是更好的小程序开发框架。
			</uni-card>
		</uni-group> -->
		
		<!-- 加载更多 -->
		<!-- <uni-group title="加载更多" top="20"> -->
			<view class="" v-for="(item,ind) in list" :key="ind">
				<!-- <uni-card title="标题文字" thumbnail="" extra="额外信息" note="Tips">
					内容主体，可自定义内容及样式
				</uni-card> -->
				<uni-card
				    :title="item.alarmTypeName" 
				    :is-shadow="true" 
				    :extra="item.c_date" 
				    :note="item.c_time"
					:isShadow="true"
				>
				    {{item.alarmname}}
				</uni-card>
				<!-- <view class="card-box">内容主体，可自定义内容及样式</view> -->
			</view>
			<uni-load-more iconType="snow" iconSize="16" :status="loadingText" color="#999" ></uni-load-more>
		<!-- </uni-group> -->
		
		
	
	</view>
</template>

<script>
	import app from "../../App.vue";
	export default {
		data() {
			return {
				title: 'Hello',
				list:[],
				loadingText: 'loading',
				
				timer:null,
				page:1,
				size:10,
				isOver:false,
			}
		},
		onLoad() {
			this.initPageInfo();
			
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('下拉刷新')
			uni.showNavigationBarLoading();
			this.initPageInfo();
		},
		//触底加载更多
		onReachBottom(e) {
			const _this = this;
			this.initPageInfo();
		},
		methods: {
			//获取数据
			initPageInfo() {
				const _this = this;
				
				if(this.isOver) { return}
				let param = {
					insertTimeEnd: "",
					insertTimeStart: "",
					keywords: "",
					notetypeid: "",
					pageCurrent: this.page++,
					pageSize: this.size,
				}
				
				this.$request('xy_aims/api/v1/alarmData/queryAlarmDataByCondition', param).then(res => {
					// 打印调用成功回调
					console.log(res)
					if(res.code == '00'){
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh() // 得到数据后停止下拉刷新
						if(res.body.list.length<10){
							this.isOver = true;
							this.loadingText = 'noMore';
						}else{
							this.isOver = false;
							this.loadingText = 'loading';
						}
						res.body.list.forEach(item=>{
							this.list.push(item)
						})
						
					}
					console.log(this.list)
				})
				
				
			},
			//加载更多
			doMoreData(){
				console.log(343);
				for(let i=0;i<10;i++){
					this.list.push(i+'dr')
				}
				
			},

		}
	}
</script>

<style>
	.content {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
		padding: 30rpx;
	}
	.card-box{
		padding: 10px;
		box-shadow: 0 0 2px 2px #F0F0F0;
		border: 1px solid #eee;
		border-radius: 5px;
		margin-bottom: 20px;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
