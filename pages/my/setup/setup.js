// pages/my/setup/setup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toaddress:function(){
    wx.navigateTo({
      url: '/pages/my/setup/address/address'
    })
  },
  toopinion:function(){
    wx.navigateTo({
      url: '/pages/my/setup/opinion/opinion'
    })
  },
  // 跳转到关于页面
  toAbout:function(){
    wx.navigateTo({
      url: '/pages/my/setup/about/about',
    })
  },

  // 跳转到登录页面
  tologin:function() {
    wx.showModal({
      title: '',
      confirmColor: '#F6C75C',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorageSync('access_token')
          wx.reLaunch({
            url: '/pages/my/setup/login/login',
          })
        }
      }
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