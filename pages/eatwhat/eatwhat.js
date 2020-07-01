// pages/eatwhat/eatwhat.js
//获取应用实例
var api = require('../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    contents: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this;
    // wx.request({
    //   url: 'https://www.omeals.cn/home/eat/index.html ',
    //   data: {
    //   },
    //   success (res) {
    //     if (res.data.mes.content.length > 0){
    //       console.log(res)
    //       if(res.data.code === true) {  
    //         // 循环转地址
    //         for (let index = 0; index < res.data.mes.content.length; index++) {
    //           const element =  'https://www.omeals.cn/Uploads/how_to_eat/'+res.data.mes.content[index].picture;
    //           res.data.mes.content[index].picture = element;    
    //         }

    //         that.setData({
    //           name: res.data.mes.season,
    //           contents: res.data.mes.content,
    //         })

    //         // console.log(res.data.mes.content)
    //       }
    //     }
        
    //   }
    // })
    app.request(api.howseason, undefined, {})
    .then(data => {
      for (let i = 0; i < data.content.length; i ++) {
        data.content[i].picture = 'https://www.omeals.cn/Uploads/how_to_eat/' + data.content[i].picture;
      }
      this.setData({
        name: data.season,
        contents: data.content,
      })
    })
    // console.log(typeof data);
  },

  toeatcaipu:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    console.log(id)
    let that = this;
    wx.request({
      url: 'https://www.omeals.cn/home/eat/detail.html ', //仅为示例，并非真实的接口地址
      data: {
        id:id
      },
      success (res) {
        console.log(res)
        if(res.data.code === true) {
          // 循环转地址
         let str =encodeURIComponent(JSON.stringify(res.data.mes))
          wx.navigateTo({
            url: '/pages/eatwhat/eatcaipu/eatcaipu?str='+str,
            success:function(){
              console.log('成功')
            }
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