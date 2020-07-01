// pages/signin/signin.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    url:"../../static/icon/Closeeye.png",
    urll:"../../static/icon/Closeeye.png",
    iShow:true,
    is_pwd:false,
    isPassWord: true, // 切换密码显示隐藏
    pwd_val: '', // 密码值

  },
   // 密码框失去焦点时
   bindblur: function (e) {
    this.setData({
      pwd_val: e.detail.value
    })
   
  },
  // 密码显示隐藏
  onChangeTap:function(res){
    this.setData({
      isPassWord: !this.data.isPassWord
    })

    if (this.data.url=="../../static/icon/Closeeye.png"){    
      this.setData({
        url: "../../static/icon/Openeye.png"
      })  
      }else{
        this.setData({
          url: "../../static/icon/Closeeye.png"
        })
      }
      
  },
  


  // 注册协议跳转
  toagreement: function () {  
    wx.navigateTo({
      url: '../agreement/agreement',
      complete:function(e){
              console.log(e)
      },
      fail:function(){
        console.log('失败')
      } 
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