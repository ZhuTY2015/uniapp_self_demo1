<template>
	<view class="charts-box">
	    <qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				chartData:{
					categories: [ "2018", "2019", "2020", "2021"],
					series: [
						{ name: "目标值",data: [31, 33, 13, 34] }, 
						{ name: "完成量",data: [21, 24, 6, 28] },
					],
				},
				opts:{
					color:["#007aff","#f0ad4e"],
					xAxis:{
						// axisLineColor:"#EEEEEE"
					},
					legend:{
						position:"top"
					},
					extra:{
						bar:{
							width:10,
						}
					},
					
				},
			}
		},
		onLoad() {
		
		
		},
		methods: {
		
	
		}
	}
</script>

<style>
</style>
