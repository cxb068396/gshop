// pages/signin/signin.js
var api = require('../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishsow: true,
    iShsow: false,
    listdata: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // //     //查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {

    //       wx.switchTab({
    //         url: '/pages/index/index'
    //       })
    //     } else {
    //       //用户没有授权
    //       console.log("用户没有授权");
    //       that.setData({
    //         iShsow: false,
    //         ishsow: true

    //       })

    //     }
    //   }
    // });

  },
  bindGetUserInfo: function (res) {
    if (res.detail.errMsg !== 'getUserInfo:ok') {
      if (res.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      wx.showToast({
        title: '微信登录失败',
      })
      return false
    }
    console.log(res)
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);

      //  获取用户的头像和昵称
      wx.getUserInfo({
        success: function (res) {
          var avatarUrl = 'userInfo.avatarUrl';
          var nickName = 'userInfo.nickName';
          that.setData({
            [avatarUrl]: res.userInfo.avatarUrl,
            [nickName]: res.userInfo.nickName,
            isShow: true,
            isShown: false
          });

          var date = res;
          wx.login({
            success: res => {

              console.log(res)
              // 获取到用户的 code 之后：res.code
              // console.log("用户的code:" + res.code);
              // 请求自己后台获取用户openid       
              if (res.code) {
                wx.request({
                  url: api.WeXinLogin,
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    code: res.code,
                    date: JSON.stringify(date)
                  },
                  success: function (res_user) {
                    var access_token = res_user.data.token
                    var usrename = res_user.data.username
                    var avatar = res_user.data.avatar

                    wx.setStorageSync("usrename", usrename)
                    wx.setStorageSync("avatar", avatar)
                    wx.setStorageSync("access_token", access_token)
                  },
                  fail: function () {
                    // console.log('获取授权信息失败')
                  }
                })
              } else {

                console.log('登录失败');
              }       
            }
          });
        }
      })
      wx.switchTab({
        url: '/pages/index/index'
      })
   }
   //   else {
    //   用户按了拒绝按钮
    //   wx.showModal({
    //     title: '提示',
    //     content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
    //     showCancel: false,
    //     confirmText: '返回授权',
    //     success: function (res) {
    //       用户没有授权成功，不需要改变 isHide 的值
    //       if (res.confirm) {
    //         console.log('用户点击了“返回授权”');
    //       }
    //     }
    //   });
    // }
  },




  tiindex: function () {
  wx.navigateBack({
    delta: 1,
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }




})