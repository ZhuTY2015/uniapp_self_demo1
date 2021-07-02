const baseUrl = 'http://192.168.1.118:8890/';
import util from '../static/js/util.js';
let token = uni.getStorageSync('token').token;
const request = (url = '', reqData = {}, type = 'POST',header={
	"H-User-Token":token
}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: baseUrl + url,
            data: {
				"sign": "sign",
				"actionId": util.generateUUID(),
				"requestId": util.generateUUID(),
				"requestCaller": {
				  callerName: '知识笔记',
				},
				"requestData": reqData,
				"appId": "baowei-web",
				"signType": "signType",
				"requestTime": util.formatTime(new Date()),
				"method": "method",
			},
            header: header,
            dataType: 'json',         
        }).then((response) => {
		
           /* setTimeout(function() {
                uni.hideLoading();
            }, 200); */
            let [error, res] = response;
			let result = {
				code:res.data.responseCode,
				body:res.data.responseData,
				msg:res.data.responseMessage
			}
			resolve(result);  
			
			
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}
export default request
