// pages/my/refund/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList3:[
      {
        photo_x:'/pages/static/icon/pic_egg.png',
        name:'一个鸡蛋',
        price_yh:'80.00',
        product_num:'8',
        pro_count:'2',
        price:'640.00',
        transaction:'已退款',
        youpurch:'查看物流',
        cancel:'去评价'
      },
      {
        photo_x:'/pages/static/icon/pic_egg.png',
        name:'一个鸡蛋',
        price_yh:'80.00',
        product_num:'8',
        pro_count:'2',
        price:'640.00',
        transaction:'已退款',
        youpurch:'查看物流',
        cancel:'去评价'
      }
    ]

  },

  // 跳转至退款成功页面
  torefundSuccess:function(){
    wx.navigateTo({
      url: '/pages/my/refund/refundSuccess/refundSuccess',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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