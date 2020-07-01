const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function request(url,data={},method='GET'){
  return new Promise(function(resolve,reject){
    wx.request({
      url: url,
      data:data,
      method:method,
      header:{
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:function(res){
        console.log(res)
      }
    })
  })
}
function login(){
  return new Promise(function(resolve,reject){
    wx.login({
      success:function(res){
        if(res.code){
          resolve(res.code)
        }else{
          reject(res)
        }
      },
      fail:function(err){
       reject(err)
      }
    })
  })
}
function getUserInfo(code){
  return new Promise(function(resolve,reject){
    wx.getUserInfo({
      success:function(res){
        res.code =code;
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}
module.exports = {
  formatTime: formatTime,
  request,
  login,
  getUserInfo
}
