<script>
	export default {
		
		globalData:{
			token:'',
			user:{},
		},
		onLaunch: function() {
			console.log('App Launch');
			this.getUserState();
			// this.getUserData();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			//获取用户信息
			getUserState(){
				let _this = this;
				let obj = uni.getStorageSync('token');
				this.globalData.token = obj
			},
			//获取用户信息
			getUserData(){
				this.$request('xy_admin/api/v1/user/selectUserDataById',{userId:'adminguid'}).then(res => {
					// 打印调用成功回调
					console.log(res)
					if(res.code == '00'){
						let data = res.body;
						console.log(data)
						let obj = {
							isLogin:true,
							msg:data
						}
						this.globalData.user = obj
						uni.setStorageSync('user',obj)
					}else{
						
					}
				
				})
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
