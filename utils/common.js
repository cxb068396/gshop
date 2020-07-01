var app = getApp();
var MD5Encode = require("MD5Encode.js");

/**
 * 对字符串判空
 */
function isStringEmpty(data) {
	if (null == data || "" == data) {
		return true;
	}
	return false;
}

/**
 * 封装网络请求
 */
function sentHttpRequestToServer(uri, data, method, successCallback, failCallback, completeCallback) {
	wx.request({
		url: app.d.hostUrl + uri,
		data: data,
		method: method,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: successCallback,
		fail: failCallback,
		complete: completeCallback
	})
}

/**
 * 封装小程序原生api
 * @param {*} func 微信原生api
 * @updated 2020.06.01
 * @author 杜晓东
 */
const promisic = function (func) {
	return function (params = {}) {
		return new Promise((resolve, reject) => {
			const args = Object.assign(params, {
				success: res => resolve(res),
				fail: err => reject(err)
			})
			func(args)
		})
	}
}

/**
 * 用promise封装wx.request请求
 * @param {*} url http 请求url后缀
 * @param {*} method http 请求方法
 * @param {*} header http 请求头
 * @param {*} complete 请求失败或成功之后最后执行的函数
 * @updated 2020.06.01
 * @author 杜晓东
 */
function request(url, method = "GET", data = {}, header = {}, complete = () => { }) {
	// wx.showLoading({
	//     title: '努力加载中',
	// });
	// setTimeout(()=>{
	//     wx.hideLoading()
	// },1000)
	const token = wx.getStorageSync('access_token')
	// if (!token) {
	// 	wx.redirectTo({
	// 		url: '/pages/my/setup/login/login',
	// 	})
	// 	return;
	// }
	return new Promise((resolve, reject) => {
		wx.request({
			url: url,
			// url: app.d.hostUrl + url,
			method,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...header
			},
			data: {
				token,
				...data
			},
			success: function (res) {
				if (res.data.code==true) {
					//debugger
					resolve(res.data.mes)
				}else if(res.data.code==false &&(res.data.mes=='请求异常'||res.data.mes=='参数错误！')){
          		wx.redirectTo({
		              	url: '/pages/my/setup/login/login',
	                	})
				} else {
					reject(res.data)
				}
			},
			fail: function (err) {
				reject(err)
			},
			complete

		})
	})
}

/**
 * 用promise封装上传
 * @param {*} url 
 * @param {*} filePath 
 * @param {*} formData 
 * @param {*} name 
 * @updated 2020.06.03
 * @author 杜晓东
 */
function upload(url, filePath, formData = {}, name = 'file') {
	return new Promise((resolve, reject) => {
		wx.uploadFile({
			url,
			filePath,
			name,
			formData,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})

}

/**
 * 将map对象转换为json字符串
 */
function mapToJson(map) {
	if (null == map) {
		return null;
	}
	var jsonString = "{";
	for (var key in map) {
		jsonString = jsonString + key + ":" + map[key] + ",";
	}
	if ("," == jsonString.charAt(jsonString.length - 1)) {
		jsonString = jsonString.substring(0, jsonString.length - 1);
	}
	jsonString += "}";
	return jsonString;
}

/**
 * 弹窗提示成功
 */
function toastSuccess() {
	wx.showToast({
		title: '成功',
		icon: 'success',
		duration: 2000
	})
}

/**
 * 调用微信支付
 */
function doWechatPay(prepayId, successCallback, failCallback, completeCallback) {
	var nonceString = getRandomString();
	var currentTimeStamp = getCurrentTimeStamp();
	var packageName = "prepay_id=" + prepayId;
	var dataMap = {
		timeStamp: currentTimeStamp,
		nonceStr: nonceString,
		package: packageName,
		signType: "MD5",
		paySign: getWechatPaySign(nonceString, packageName, currentTimeStamp),
		success: successCallback,
		fail: failCallback,
		complete: completeCallback
	}
	console.log(dataMap);
	wx.requestPayment(dataMap);
}

/**
 * 获取微信支付签名字符串
 */
function getWechatPaySign(nonceStr, packageName, timeStamp) {
	var beforMD5 = "appid=" + app.d.appId + "&nonceStr=" + nonceStr + "&package=" + packageName + "&signType=MD5" + "&timeStamp=" + timeStamp + "&key=" + app.d.appKey;
	return doMD5Encode(beforMD5).toUpperCase();
}

/**
 * 获取当前时间戳
 */
function getCurrentTimeStamp() {
	var timestamp = Date.parse(new Date());
	return timestamp + "";
}

/**
 * 获取随机字符串，32位以下
 */
function getRandomString() {
	return Math.random().toString(36).substring(3, 8);
}

/**
 * MD5加密
 */
function doMD5Encode(toEncode) {
	return MD5Encode.hexMD5(toEncode);
}

module.exports = {
	isStringEmpty: isStringEmpty,
	sentHttpRequestToServer: sentHttpRequestToServer,
	mapToJson: mapToJson,
	toastSuccess: toastSuccess,
	doWechatPay: doWechatPay,
	request: request,
	promisic: promisic,
	upload: upload
}