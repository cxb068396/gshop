// pages/my/setup/register/register.js
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reduce: [], 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('access_token'); 
    app.request(api.registerCoupon, 'get', {token: token})
    .then(data => {
      console.log(data)
      this.setData({
        reduce: data
      })
    })
    .catch(err => {
      console.log(err);
    })
  },

  // 查看更多 跳转到更多优惠券
  toMore:function() {
    wx.navigateTo({
      url: '../../coupon/drawcoupon/drawcoupon',
    })
  },

  // 点击关闭按钮跳转至首页
  close:function() {
    wx.reLaunch({
      url: '../../../index/index',
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