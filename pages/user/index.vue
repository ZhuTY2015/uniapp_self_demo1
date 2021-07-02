<template>
	<view class="user-content">
		<!-- 未登录 -->
		<view class="item-box" v-if="!isLogin" @click="bindGoLogin">
			<view class="item-top flex-row align-center justify-between bg-white">
				<view class="">
					<view class="main-title">点击登录</view>
					<view class="sub-title">登录后查看更多信息</view>
				</view>
				<image src="../../static/imgs/header_img.png" mode=""></image>
			</view>
			<view class="item-bottom bg-white" @click="bindGoLogin">
				<uni-list :border="false">
				    <uni-list-item v-for="(item,ind) in list" :key="ind" 
					:showArrow="true" :rightText="item.subName"
					:showExtraIcon="true" :extraIcon="item.icon" :clickable="true"
					:title="item.name" @click="bindGoLogin"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<!-- 已登录 -->
		<view class="item-box" v-if="isLogin">
			<view class="item-top flex-row align-center justify-between bg-white">
				<view class="">
					<view class="main-title" v-if="userInfo.userName">{{userInfo.userName}}</view>
					<view class="main-title" v-else ><button open-type="getUserInfo" @getuserinfo='getWXUserData'>获取个人信息</button></view>
					<view class="sub-title">我还么填写个人介绍</view>
				</view>
				<image v-if="!userInfo.avatarUrl" src="../../static/imgs/header_img.png" mode=""></image>
				<image v-else :src="userInfo.avatarUrl" mode=""></image>
			</view>
			<view class="item-bottom bg-white">
				<uni-list :border="false">
				    <uni-list-item v-for="(item,ind) in list" :key="ind" 
					:showArrow="true" :rightText="item.subName"
					:showExtraIcon="true" :extraIcon="item.icon" 
					:title="item.name"></uni-list-item>
				</uni-list>
				
			</view>
			<view class="out-login" @click="outLogin">
				退出登录
			</view>
		</view>
		
		
		<popModal :popAll="popAll" ref="childPop"></popModal>
		
	</view>
</template>

<script>
	import app from '../../App.vue';
	export default {
		data() {
			return {
				isLogin:false,
				userInfo:'',
				list:[
					{
						name:'简历',
						icon:{color: '#303031',size: '18',type: 'email'},
						subName:'完整度10%',
						url:'',
					},
					{
						name:'投递记录',
						icon:{color: '#303031',size: '18',type: 'chatbubble'},
						subName:'',
						url:'',
					},
					{
						name:'职位收藏',
						icon:{color: '#303031',size: '18',type: 'star'},
						subName:'',
						url:'',
					},
					{
						name:'意见反馈',
						icon:{color: '#303031',size: '18',type: 'chat'},
						subName:'',
					},
					{
						name:'隐私设置',
						icon:{color: '#303031',size: '18',type: 'locked'},
						subName:'',
						url:'',
					},
				],
				popAll:{
					title:'',
					content:'确认要退出吗？',
					popType:'message',//message，dialog，share
					msgType:'success',//提示消息类型 success，warn，error，info
					cancelTxt:'取消',//取消按钮文字
					confirmTxt:'确定',//确认按钮文字
				}
			}
		},
		onShow() {
			this.getUserData();
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
		
			//获取个人信息
			getUserData(){
				let _this = this;
				_this.isLogin = uni.getStorageSync('token').token?true:false;
				this.$request('xy_admin/api/v1/user/selectUserDataById',{userId:'adminguid'}).then(res => {
					// 打印调用成功回调
					console.log(res)
					if(res.code == '00'){
						let data = res.body;
						console.log(data)
						this.userInfo = data;
					}else{
						
					}
				
				})
			},
			//进入登录页面
			bindGoLogin(){
				uni.navigateTo({
					url:'../common/login'
				})
			},
			//退出登录
			outLogin(){
				let _this = this;
				// this.open();
				this.$refs.childPop.open();
				return
				uni.setStorageSync('token',{token:null},);
				
			},
			
		}
	}
</script>

<style lang="less">
	Page{
		background-color: #FAFAFA;
	}
	.user-content{
		
		.item-box{
			
			.item-top {
				padding: 30rpx;
				.main-title{
					font-size: 36rpx;
					button{
						background-color: transparent !important;
						line-height: 1 !important;
						font-size: 36rpx;
						text-align: left !important; 
						padding: 0 !important;
						&::after{
							border: none !important;
						}
					}
				}
				.sub-title{
					padding-top: 10rpx;
					font-size: 28rpx;
				}
				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
			.item-bottom{
				margin-top: 20rpx;
			}
			.out-login{
				margin-top: 50rpx;
				text-align: center;
				color: #999999;
				
			}
		}
	}

</style>
