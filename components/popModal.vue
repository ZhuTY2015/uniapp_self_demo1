<template>
	<view class="">
		<uni-popup ref="popup" :type="popAll.popType" :mask-click="false"> 
			<!-- <view class="pop-box">
				<view class="title">通知</view>
				<view class="content">
					确认要退出登录吗
				</view>
				<view class="btn-bottom flex-row align-center justify-between">
					<view @click="close()">{{popAll.cancelTxt?popAll.cancelTxt:'取消'}}</view>
					<view>{{popAll.confirmTxt?popAll.confirmTxt:'确认'}}</view>
					
				</view>
			</view> -->
			<uni-popup-message v-if="popAll.popType=='message'"  type="success" message="成功消息" :duration="2000"></uni-popup-message>
			<uni-popup-dialog v-if="popAll.popType=='dialog'" mode="base" :message="popAll.content" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			<uni-popup-share v-if="popAll.popType=='share'" title="分享到" @select="select"></uni-popup-share>
		    
		</uni-popup>
		
		<!-- <uni-popup ref="popup" type="message">
		    <uni-popup-message type="success" message="成功消息" :duration="2000"></uni-popup-message>
		</uni-popup> -->
		
		<!-- <uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog mode="base" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		
		<!-- <uni-popup ref="popup" type="share">
		    <uni-popup-share title="分享到" @select="select"></uni-popup-share>
		</uni-popup> -->
	</view>
</template>

<script>
	export default {
		data(){
			return {}
		},
		props:["popAll"],
		methods:{
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
		}
	}
</script>

<style lang="less">

	.pop-box{
		background-color: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		.title{
			text-align: center;
			padding: 30rpx;
		}
		.content{
			color: #303031;
			text-align: center;
			padding: 0 30rpx 30rpx 30rpx;
		}
		.btn-bottom{
			border-top: 1px solid #C0C0C0;
			text-align: center;
			view{
				width: 50%;
				padding: 20rpx 30rpx;
				&:first-child{
					border-right: 1px solid #C0C0C0;
					color: #303031;
				}
				&:last-child{
					color: #42B187;
				}
			}
		}
	}
</style>
