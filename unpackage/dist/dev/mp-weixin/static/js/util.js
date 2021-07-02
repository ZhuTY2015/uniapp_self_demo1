// 时间格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 日期格式化
const formatDate = (date,fgf) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(fgf)
}


//时间转化为 几天前 几分钟前
const formatDateTime = (str) => {
  var calDate = new Date(str.replace('T', ' ').replace(/-/g, "/"));
  var nowDate = new Date();
  var date = nowDate.getTime() - calDate.getTime();
  var days = date / 1000 / 60 / 60 / 24;
  var daysRound = Math.floor(days);
  var hours = date / 1000 / 60 / 60 - (24 * daysRound);
  var hoursRound = Math.floor(hours);
  var minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  var minutesRound = Math.floor(minutes);
  if (daysRound > 2) {
    if (nowDate.getFullYear() != calDate.getFullYear()) {
      var dateStr = formatTime(calDate)
      return dateStr.substr(0, dateStr.length - 3);
    } else if (nowDate.getMonth() != calDate.getMonth()) {
      var dateStr = formatTime(calDate)
      return dateStr.substr(5, dateStr.length - 8);
    } else {
      return daysRound + '天前';
    }
  } else if (daysRound == 2) {
    if (nowDate.getHours() < calDate.getHours()) {
      return daysRound + '天前';
    } else {
      return '前天';
    }
  } else if (daysRound == 1) {
    if (nowDate.getHours() < calDate.getHours()) {
      return '前天';
    } else {
      return '昨天';
    }
  } else if (hoursRound > 0) {
    return hoursRound + '小时前';
  } else if (minutesRound > 5) {
    return minutesRound + '分钟前';
  } else {
    return '刚刚'
  }
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//生成唯一id
const generateUUID = () =>{
	var d = new Date().getTime();
	// if (window.performance && typeof window.performance.now === "function") {
	//   d += performance.now();
	// }
	var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(
	  c
	) {
	  var r = (d + Math.random() * 16) % 16 | 0;
	  d = Math.floor(d / 16);
	  return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
	});
	return uuid;
}

import CryptoJS from './aes.js';
const secretKey = "BaoWei@ChongQing";
//密码加密事件
const getAesString = (data) =>{
	
	// var key1 = "chen20190103java"; //密钥
	// var iv1 = "chen20190103java";
	var key = CryptoJS.enc.Utf8.parse(secretKey);
	var iv = CryptoJS.enc.Utf8.parse(secretKey);
	var encrypted = CryptoJS.AES.encrypt(data, key, {
	  iv: iv,
	  mode: CryptoJS.mode.CBC,
	  padding: CryptoJS.pad.Pkcs7
	});
	// console.log(encrypted.toString())
	// console.log(this.decrypt(encrypted.toString()))
	return encrypted.toString(); //返回的是base64格式的密文

}

//解密
const decrypt = (data) => {

  var key = CryptoJS.enc.Utf8.parse(secretKey);
  var iv = CryptoJS.enc.Utf8.parse(secretKey);
  // console.log(22)
  // let decrypt = CryptoJS.AES.decrypt(data, key, {iv:iv,mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  var decrypt = CryptoJS.AES.decrypt(data, key, {
	iv: iv,
	mode: CryptoJS.mode.CBC,
	padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  formatDateTime:formatDateTime,
  generateUUID:generateUUID,
  getAesString:getAesString,
  decrypt:decrypt
}
