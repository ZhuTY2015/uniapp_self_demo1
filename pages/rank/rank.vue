<template>
	<view class="charts-box">
		<view class="tab-box">
			<uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem" activeColor="#2d8cf0"></uni-segmented-control>
		</view>
		<view v-if="showPage" style="margin-top: 40px;">
			<view class="chart-item" v-if="current == 0">
				<view class="charts-item-box">
					<view class="flex-row justify-between align-center padding-sm">
						<view>总产量</view>
						<uni-icons class="float-ico" type="scan" size="18" color="#999" @click="showModal('column',columeChart)"></uni-icons>
					</view>
					<qiun-data-charts type="column" :opts="columeChart.opts" :chartData="columeChart.chartData" />
				</view>
				
				<view class="charts-item-box">
					<view class="flex-row justify-between align-center padding-sm">
						<view>产量车型TOP5</view>
						<uni-icons class="float-ico" type="scan" size="18" color="#999" @click="showModal('bar',barChart)"></uni-icons>
					</view>
					<qiun-data-charts type="bar" :opts="barChart.opts" :chartData="barChart.chartData" />
				</view>
				
				<view class="charts-item-box">
					<view class="flex-row justify-between align-center padding-sm">
						<view>班次平均循环时长</view>
						<uni-icons class="float-ico" type="scan" size="18" color="#999" @click="showModal('line',lineChart)"></uni-icons>
					</view>
					<qiun-data-charts type="line" :opts="lineChart.opts" :chartData="lineChart.chartData" />
				</view>
				
			</view>
			<view class="chart-item" v-if="current == 1">
				<button type="default" @click="downdFile">下载文件</button>
				
				
			</view>
		</view>
		
		
		
		
		
		<scanModal ref="childScan" :scanAll="scanAll" @childHide="showSmall"></scanModal>
	</view>
</template>

<script>
	import scanModal from '../../components/scanModal';
	export default {
		data() {
			return {
				items:["生产数据报表","设备数据报表"],
				current:0,
				showPage:true,
				columeChart:{
					chartData:{
						categories: [ "06-20","06-21","06-22","06-23", "06-24", "06-25", "06-26"],
						series: [
							{ name: "完成量",data: [21, 24, 6, 28,30,40,25] },
						],
					},
					opts:{
						color:["#007aff"],
						padding:[10,10,10,10],
						yAxis:{
							disableGrid:true,
							showTitle: true,
							data:[
								{
								    "type": "value",
									"title": "产量(台)",
								}
							]
						},
						xAxis:{},
						
						legend:{
							show:false
						},
						rotate:false,
					
						
					},
				},
				barChart:{
					chartData:{
						categories: [ "TOP1","TOP2","TOP3","TOP4", "TOP5"],
						series: [
							{ name: "完成量",data: [21, 24, 6, 28,15] },
						],
					},
					
					opts:{
						color:["#007aff"],
						padding:[10,20,10,10],
						yAxis:{},
						xAxis:{
							disabled:true,
							disableGrid:true,
						},
						legend:{
							show:false
						},
						rotate:false,
						
					},
				},
				lineChart:{
					chartData:{
						categories: [ "26","27","28","29", "30"],
						series: [
							{ name: "完成量",data: [21, 24, 6, 28,15] },
						],
					},
					
					opts:{
						color:["#007aff"],
						padding:[10,20,10,10],
						yAxis:{
							disableGrid:true,
							showTitle: true,
							data:[
								{
								    "type": "value",
									"title": "秒",
								}
							]
						},
						xAxis:{},
						legend:{
							show:false
						},
						rotate:false,
						
					},
				},
				scanAll:{
					isShow:false,
					type:'column',
					opts:{},
					chartData:{},
				},
			}
		},
		onLoad() {
		
		
		},
		components:{scanModal},
		methods: {
			downdFile(){
				console.log('下载开始');
				uni.downloadFile({
				    url: 'http://47.108.201.101:8890/project-file/b91bcc33aade45f28f56559746d92bef.jpg', //仅为示例，并非真实的资源
				    success: (res) => {
						console.log(res)
				        if (res.statusCode === 200) {
				            console.log('下载成功');
				        }
				    },
					fail: (err) => {
						console.log(err);
						uni.showToast({icon: 'none',mask: true,title: '失败请重新下载'});
					},
				});
				/* let URL= 'http://47.108.201.101:8890/project-file/b91bcc33aade45f28f56559746d92bef.jpg';
				uni.chooseImage({
				  success: function (res) {
				    var tempFilePaths = res.tempFilePaths;
				    uni.saveFile({
				      tempFilePath: tempFilePaths[0],
				      success: function (res) {
				        var savedFilePath = res.savedFilePath;
				      }
				    });
				  }
				}); */
				// uni.saveFile({
				// 	tempFilePath: URL,
				// 	success: function (res) {
				// 		console.log(res)
				// 		var savedFilePath =  res.savedFilePath;
				// 		console.log('下载成功');
				// 	}
				// });
			},
		
			//点击切换tab
			onClickItem(e){
				this.current = e.currentIndex;
			},
			
			//恢复小统计图显示
			showSmall(){
				this.showPage = true;
				this.scanAll.isShow = false;
				this.columeChart.opts.rotate = false;
				this.barChart.opts.rotate = false;
				this.lineChart.opts.rotate = false;
				console.log(this.showPage)
			},
			//显示横屏统计图
			showModal(tp,obj){
				this.scanAll.type = tp;
				this.scanAll.opts = obj.opts;
				this.scanAll.opts.rotate = true;
				this.scanAll.chartData = obj.chartData;
				console.log(this.scanAll)
				this.scanAll.isShow = true;
				this.showPage = false;
			},
	
		}
	}
</script>

<style lang="less">
	.tab-box{
		border-bottom: 2px solid #EEEEEE;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		z-index: 99999999999999;
	}
	canvas{
		z-index: 99 !important;
	}
	.chart-item{
		padding: 30rpx;
		border-radius: 10rpx;
		.charts-item-box{
			background-color: #F0F0F0;
			position: relative;
			margin-bottom: 30rpx;
			border-radius: 10rpx;
			.float-ico{
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				z-index: 99999;
			}
		}
	}
	
</style>
