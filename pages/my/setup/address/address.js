// pages/Shopcart/payment/payment.js
var api = require('../../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:[],
    Mstart: '',  //记录左滑开始的位置
    index: '',   //记录左滑的元素
  },

  // 触摸开始
touchstart: function(e){
  //console.log(e);
  this.setData({
    Mstart: e.changedTouches[0].pageX,      //开始触摸时的横坐标
    index: e.currentTarget.dataset.index,
  })
},

// 开始滑动
touchmove:function(e){
  let that = this;
 // console.log(e);
  let list = that.data.str;
  // 计算滑动的距离
  let moveL = that.data.Mstart - e.changedTouches[0].pageX;
  //console.log(moveL)

  list[that.data.index].left = moveL > 0 ? -moveL : 0;

  that.setData({
    str: list
  })
},

// 滑动结束 触摸结束
touchend: function(e){
  let that = this;
 // console.log(e);
  let list = that.data.str;
  let lastMoveL = that.data.Mstart - e.changedTouches[0].pageX; //最终移动的距离

  list[that.data.index].left = lastMoveL > 100 ? -180 : 0;

  this.setData({
    str: list
  })
},

// 删除操作
scrollDel:function(e){
  let that = this;
  var addressId=e.currentTarget.dataset.id
  wx.showLoading({
    title: '',
  })
  wx.request({
    url: api.DeleteAddress,
    data:{
      token: wx.getStorageSync('access_token'),
      id:addressId
    },
    success:function(res){
      console.log(res)
       that.getaddresslist()
       wx.hideLoading()
    }
  })
  
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getaddresslist()
  },
 getaddresslist:function(){
   var that = this
   wx.request({
     url: api.AddressList,
     data: {
       token: wx.getStorageSync('access_token')
     },
     success: function (res) {
       if (res.data.code == true) {
         that.setData({
           str: res.data.mes
         })
       }else{
         that.setData({
           str:[]
         })
       }
     }
   })
 },
//获取地址列表


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toeditaddres:function(){
     wx.navigateTo({
       url: '/pages/my/setup/editaddres/editaddres',
     })
  },

  tochose: function(e) {
    console.log(e)
    var index=e.currentTarget.dataset.index
    var address = this.data.str[index]
    wx.navigateTo({
      url: '/pages/my/setup/bjaddress/bjaddress?address=' + JSON.stringify(address)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 this.getaddresslist()
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