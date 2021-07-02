<template>
	<view class="content-box">
		<view class="title">登录小程序</view>
		<!-- 手机号验证码登录 -->
		<view v-if="pageType==1">
			<uni-forms :modelValue="formData" ref="form"  :rules="rules">
				<view class="form-item-box">
					<uni-forms-item  name="account">
						<uni-easyinput type="number" :inputBorder="false" placeholderStyle="color:#C0C4CC" maxlength="11" v-model="formData.account" placeholder="请输入您的手机号" />
					</uni-forms-item>
				</view>
				<view class="form-item-box flex-row justify-between">
					<uni-forms-item name="pwd">
						<uni-easyinput type="text" :inputBorder="false" placeholderStyle="color:#C0C4CC" v-model="formData.pwd" maxlength="6" placeholder="请输入收到的验证码" />
					</uni-forms-item>
					<view class="form-count">
						<view class="flex-row flex-end align-center" style="color: #999999;" v-if="isShowVery">
							<uni-countdown  :second="60" :start="isShowVery" @timeup="bindTimeUp"></uni-countdown>s
						</view>
						<view class="" v-if="!isShowVery" @click="bindGetVery">{{veryTxt}}</view>
					</view>
				</view>
				
				<view class="btn-footer">
					<button type="primary" @click="submitForm">登录</button>
					<view class="tips">登录小程序代表你已经同意 <text>《用户协议》</text></view>
				</view>
			</uni-forms>
		</view>
		
		
		<!-- 账号密码登录 -->
		<view v-if="pageType==2">
			<uni-forms :modelValue="formData" ref="form"  :rules="rules">
				<view class="form-item-box">
					<uni-forms-item  name="account">
						<uni-easyinput type="text" :inputBorder="false" placeholderStyle="color:#C0C4CC" maxlength="11" v-model="formData.account" placeholder="请输入用户名" />
					</uni-forms-item>
				</view>
				<view class="form-item-box">
					<uni-forms-item name="pwd">
						<uni-easyinput type="password" :inputBorder="false" placeholderStyle="color:#C0C4CC" v-model="formData.pwd" maxlength="6" placeholder="请输入您的密码" />
					</uni-forms-item>
				</view>
				
				<view class="btn-footer">
					<button type="primary" @click="submitForm">登录</button>
				</view>
			</uni-forms>
		</view>
		
		<!-- <view class="float-btn" @click="binndCutType(pageType)">{{pageType==1?'密码登录':'手机号登录'}}</view> -->
		
	</view>
</template>

<script>
	
	import util from '../../static/js/util.js';
	export default {
		data() {
			return {
				pageType:2,//1:手机验证码登录 2：账号密码登录
				formData:{
					account:'',
					pwd:'',
				},
				isShowVery:false,
				veryTxt:'获取验证码',
				rules: {
					account: {
						rules: [
							{required: true,errorMessage: '请输入您的手机号码'},
							// {pattern:/^1{10}$/,errorMessage: '请输入正确的手机号码'},
							{
								validateFunction:function(rule, value, data, callback) {
									let iphoneReg = /^1[3456789]{10}$/
									if (!iphoneReg.test(value)) {
										callback('请输入正确的手机号码')
									}
									return true
								}
							}
						],
					},
					
					pwd: {
						rules: [
							{required: true,errorMessage: '请输入验证码'},
						]
					}
				},

			}
		},
		mounted() {
			let a = util.generateUUID();
			console.log(a)
		},
		methods: {
			//点击登录
			submitForm(){
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
					let param = {
						account:res.account,
						password:util.getAesString(res.pwd),
					}
					this.$request('xy_admin/api/v1/user/login', param).then(res => {
						// 打印调用成功回调
						console.log(res)
						if(res.code == '00'){
							let data = res.body;
							let obj = {
								token:data.userToken
							}
							uni.setStorageSync("token",obj);
							uni.navigateBack();
						}else{
							
						}
					
					})
					
					
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			//点击-获取验证码
			bindGetVery(){
				this.isShowVery = true;
			},
			//倒计时结束时
			bindTimeUp(){
				console.log("shijai");
				this.veryTxt = '重新获取';
				this.isShowVery = false;
			},
			
			//切换密码登录和手机号验证码登录
			binndCutType(tp){
				console.log(tp);
				if(tp==1){
					this.pageType = 2;
				}
				if(tp==2){
					this.pageType = 1;
				}
				this.formData = {
					account:'',
					pwd:'',
				};
			},
		}
	}
</script>

<style lang="less">
	.content-box{
		padding: 30rpx;
		background-color: #FFFFFF;
		.uni-easyinput__content-input{
			padding-left: 0 !important;
		}
		.title{
			font-size: 40rpx;
			margin-bottom: 60rpx;
		}
		.form-item-box{
			// border-bottom: 1px solid #EEEEEE;
			position: relative;
			&::after{
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 45rpx;
				height: 1rpx;
				background-color: #EEEEEE;
			}
		}
		.form-count{
			font-size: 32rpx;
			position: relative;
			top: 20rpx;
			text-align: right;
		}
		
		.btn-footer{
			margin-top: 80rpx;
		}
		.tips{
			font-size: 30rpx;
			margin-top: 20rpx;
			color: #999999;
			text{
				color: #333333;
			}
		}
		
		
		.float-btn{
			position: absolute;
			left: 30rpx;
			bottom: 30rpx;
			font-size: 30rpx;
			color: #42B187;
		}
	}
	
	
	
	
	.uni-countdown {
		text-align: right !important;
		align-content: flex-end !important;
		justify-content: flex-end !important ;
		
		text{
			font-size: 30rpx !important;
			color: #999999 !important;
		}
		.uni-countdown__number{
			display: none !important;
			&:last-child{
				display: inline-block !important;
			}
		}
		.uni-countdown__splitor{
			display: none !important;

		}
	}
</style>
