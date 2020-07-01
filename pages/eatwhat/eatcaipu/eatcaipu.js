// pages/eatwhat/eatcaipu/eatcaipu.js
var WxParse = require('../../../lib/wxParse/wxParse.js');
//获取应用实例
var api = require('../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:[],   //' 三色蛋的做法：' ,
    contents: [],
    contents1: [],   //推荐菜谱
    html: "" ,
    newBox: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options)
    console.log(JSON.parse(decodeURIComponent(options.str)))
    // console.log(JSON.parse(decodeURIComponent(options.str)).content)
    let con=JSON.parse(decodeURIComponent(options.str))
    // console.log(JSON.parse(options.str))
    // let con = JSON.stringify(options.str);
    const element =  'https://www.omeals.cn/Uploads/how_to_eat/'+con.picture;
   con.picture=element;  

    for (let index = 0; index < con.product.length; index++) {
      const element =  'https://www.omeals.cn/Uploads/files/'+con.product[index].main_images;
      con.product[index].main_images=element;    
    }

    for (let i = 0; i < con.article.length; i++) {
      const element1 =  'https://www.omeals.cn/Uploads/how_to_eat/'+con.article[i].picture;
      con.article[i].picture=element1;    
    }

    var html = JSON.parse(decodeURIComponent(options.str)).content;
    // var reg = /\<\/?p\>/gim;    //<p>匹配标签baip \b[^<>]*匹配标签p的属性，\b表示分隔符bai，[^<>]*匹配所有不是<>的字符  问号表示懒惰匹配，匹配尽可能少的字符，避免p标签配对错误。
    var s = html.indexOf("烹");
    var newBox = html.substring(s, s+5);
    console.log(newBox)
    var lastBox = html.replace("烹饪方法：", "")
    // console.log(lastBox)
    WxParse.wxParse('newBox', 'html', newBox, this, 5)
    WxParse.wxParse('lastBox', 'html', lastBox, this, 5)
    var temp = WxParse.wxParse('article', 'html', html, this, 5)

    this.setData({
      contents: con.product,
      contents1: con.article,
      str:con,
      // html: con.content
    })
  },

   //加入购物车
   pushchat(e) {
    var id = e.currentTarget.dataset.id;
    app.request(api.AddCart,'post',{num: 1,specs_id: id})
    .then(data => {
      wx.showToast({'title': data})
    })
    .catch(err => {
      wx.showToast({'title': err.mes || '添加购物车失败'})
    })
  },

  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '../../../pages/Shopcart/Shopcart'
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