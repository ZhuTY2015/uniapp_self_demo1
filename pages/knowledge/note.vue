<template>
	<view class="container-box">
		<uni-datetime-picker  v-model="vModelDatetime" type="datetimerange"  start="2021-6-10 00:00:00" end="2021-6-17 23:59:59" :border="false" return-type="string" @change="bindGetDate"></uni-datetime-picker>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				vModelDatetime:''
			}
		},
		mounted() {
			
		},
		methods:{
			bindGetDate(e){
				console.log(e)
			},
		}
	}
</script>

<style lang="less">
	.container-box{
		
	}
</style>
