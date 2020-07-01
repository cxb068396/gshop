const common = require('./utils/common')
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://www.omeals.cn/home/login/weixinlogin.html',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo            
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                console.log(this.userInfoReadyCallback(res))
              }
            }
          })
        }else{
           //用户没有授权
            console.log("用户没有授权");
          //  wx.redirectTo({
          //   url: '/pages/signin/signin'
          // })
        }
      }
    })
  },

    // ...
    // onShow: function(options) {

    //   //用来获取腾讯验证码的操作
    //   // 解决各类回调的兼容问题
    //   if (!this.captchaTicketExpire) this.captchaTicketExpire = {};
  
    //   if (options.scene === 1038 && options.referrerInfo.appId === 'wx5a3a7366fd07e119') {
    //     const result = options.referrerInfo.extraData;
    //     if (result.ret === 0) {
    //       const ticket = result.ticket;
    //       if (!this.captchaTicketExpire[ticket]) {
    //         this.captchaResult = result;
    //         this.captchaTicketExpire[ticket] = true;
    //       }
    //     } else {
    //       // 用户关闭了验证码
    //       wx.showToast({
    //         title: '获取失败',
    //         icon:"none"
    //       })
    //     }
    //   }
    // },
  promisic: common.promisic,
  upload: common.upload,
  request: common.request,
  globalData: {
    userInfo: null
  }
})


