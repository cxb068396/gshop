// pages/my/coupon/drawcoupon/drawcoupon.js
var api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    row: "",
    reduce: [],     //减多少 优惠券的数量
    id: "",   //优惠券编码
    reduce1 : [],
    reduce2: []

    // progressNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('access_token'); 
    app.request(api.showCoupon, 'get', {token: token})
    .then(data => {
  
     let result=data.filter(item=>item.flag==0);
     let result1=data.filter(item=>item.flag==1)
     this.setData({
       reduce1:result,
       reduce2:result1
     })
     console.log(this.data.reduce1,this.data.reduce2)
    })
  },

  scroll(e) {
    console.log(e)
  },

  // 领取优惠券
  drawCoupons:function(e) {
    let that = this;
    var token = wx.getStorageSync('access_token');
    var coupon_code = e.currentTarget.dataset.code;
    app.request(api.bindSave, 'get', {
      token: token,
      coupon_code: coupon_code,
    })
    .then(data => {
      wx.showToast({
        title: data,
        icon: 'none',
        duration: 2000
      }) 
    })
    .catch(err => {
      wx.showToast({
        title: err.mes,
        icon: 'none',
        duration: 2000
      })
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
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  }
})