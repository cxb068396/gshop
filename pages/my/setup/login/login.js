// pages/my/setup/login/login.js
var  api=require('../../../../config/api.js')
const app = getApp()
var request = require('../../../../utils/common').request
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codemsg: '获取验证码',
    currentTime:60,
    phone:'',
    hidden:true,
    code:'',
    disabled:true,
  
  },
  //获取手机号码
  phoneInput:function(e){
  this.setData({
    phone:e.detail.value
  })
  },
  //获取短信验证码
  codeInput:function(e){
   this.setData({
    code:e.detail.value
   })
  },
  goLogin(){
    if(this.data.code==''){
      wx.showToast({
        title: '验证码不能为空',
        icon:'none'
      })
      return false
    }
    if(this.data.phone==''){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
      return false
    }
    var that = this
    wx.request({
      url: api.smsLogin,
        data:{
          mobile:this.data.phone,
          code:this.data.code
        },
        method:'post',
        header:{
        "content-type":"application/x-www-form-urlencoded",
        "Cookie":wx.getStorageSync('sessionid') 
              },
         success:function(res){
           console.log(res)
            if(res.data.code==true){
              wx.setStorageSync("usrename", res.data.username)
              wx.setStorageSync("avatar", res.data.avatar)
              wx.setStorageSync("access_token", res.data.token)
             wx.switchTab({
               url: '/pages/index/index',
             })
            }else{  
              wx.showToast({
                title: res.data.mes,
                image:'../../../static/icon/icon_error.png'
              })
            }           
         }
       })

  },
  //获取验证码按钮，当手机号码匹配成功之后，小程序才会唤起验证码小程序
  textCode:function(){
    var that=this;
    var phone=that.data.phone
    var currentTime=that.data.currentTime
    if(phone==''){
      wx.showToast({
        title: '号码不能为空',
        icon:'none'
      })
    }else if(phone.trim().length!=11|| ! /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/.test(phone)){
      wx.showToast({
        title: '号码不正确',
        icon:'none'
      })
    }else{
      // wx.navigateToMiniProgram({
      //   appId: 'wx5a3a7366fd07e119',
      //   path: '/pages/captcha/index',
      //   extraData: {
      //     appId: '2075400621'//您申请的验证码的 appId
      //   }
      // })
           //设置一分钟倒计时
     var timer=setInterval(function(){
      currentTime-- ;//每执行一次让其减一
      that.setData({
       codemsg:currentTime+'秒',
       hidden:false
      })
      ////如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送
      // 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
      if(currentTime<=0){
        clearInterval(timer)
        that.setData({
         codemsg:'获取验证码',
          currentTime:60,
          hidden:true,
          disabled:true
        })
      }
    },1000)
     //获取短信验证码 
    that.getSmsCode();
    }
  },
  //微信授权登录
  weixinLogin:function(){
    wx.navigateTo({
      url: '/pages/signin/signin',
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
    //首次加载获取sessionid来进行请求头的cookie的伪造，用于获取验证码和登录操作
    var that=this
    wx.request({
      url: 'https://www.omeals.cn/home/login/get_sessionid.html ',
      method:'get',
      header:{"content-type":"application/x-www-form-urlencoded"},
      success:function(res){
        if(res.data.code==true){
          var sessionid='PHPSESSID='+res.data.mes
          wx.setStorageSync('sessionid', sessionid)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //当从验证码小程序中获取captchaResult，程序才会执行以下操作，否则，则直接提示用户获取验证码失败（这一步是用于滑块验证的）
    // var that=this;
    // var currentTime=that.data.currentTime
    // const captchaResult = app.captchaResult;
    // console.log(captchaResult)
    // app.captchaResult = null; // 验证码的票据为一次性票据，取完需要置空
    // if (captchaResult && captchaResult.ret === 0) {
    //   // 将验证码的结果返回至服务端校验
    //   const ticket = captchaResult.ticket;
    //   const randstr = captchaResult.randstr;
    // }
  },
  getSmsCode(){
    var that = this
    wx.request({
      url: api.smsCode,
        data:{
          mobile:this.data.phone
        },
        method:'post',
        header:{
          "content-type":"application/x-www-form-urlencoded",
          "Cookie":wx.getStorageSync('sessionid') 
        },
         success:function(res){
            if(res.data.code==true){
              wx.showToast({
                title: '验证码已发送',
              })
           that.setData({
             disabled:false
           })
            }
                  
         }
       })

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