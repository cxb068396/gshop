// pages/my/my.js
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isShown:false,
    token:''

  },
//拼团的按钮
assemble:function(){
 wx.showToast({
   title: '开发中',
   image:'../static/icon/icon_error.png'
 })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     },
    //获取用户信息
    getUserInfo(){
      this.setData({
        token: wx.getStorageSync('access_token') 
      })
      var that = this
      wx.request({
        url: api.GetUserInfo,
          data:{
            token: wx.getStorageSync('access_token') 
          },
          method:'post',
          header:{"content-type":"application/x-www-form-urlencoded"},
           success:function(res){
               console.log(res.data)
               if(res.data.code==true){
                that.setData({
                  userInfo:res.data,
                  isShown:false
                 })  
               }else{
                // wx.showToast({
                //   title: '请先登录',
                //   icon: 'none',
                // });
                that.setData({
                  isShown:true,
                  userInfo:''
                })
               }                
           }
         })
  
    },

    changeData:function(){
      this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
    dial:function(){
      this.setData({
        kefuShow:true
      })
    },
    goLogin:function(){
      this.setData({
        islogin:true
      })
      console.log(this.data.islogin)
    },
   close:function(){
   this.setData({
     islogin:false
   })
    },
    CallShow:function(){
      this.setData({
        kefuShow:false
      })
    },
    // 客服电话
    timcall:function(){
  
      wx.makePhoneCall({
        phoneNumber: '400-100-2720', //仅为示例，并非真实的电话号码
        success:function(res){
          console.log(res)
        }
      })
    },
     //跳转至优惠券页面
     tocoupon:function(){
      if(!this.data.token){
        wx.showToast({
          title: '请先登录',
          icon:'none'
        })
        return false
      }
        wx.navigateTo({
          url: '/pages/my/coupon/coupon?currentTab=0',
          success:function(){
            console.log('成功')
          }
        })

    },
    // 设置
    tosetup:function(){
      if(!this.data.token){
        wx.showToast({
          title: '请先登录',
          icon:'none'
        })
        return false
      }
      wx.navigateTo({
        url: '/pages/my/setup/setup'
      })
    },
    // 编辑
    toedit:function(){
      var that = this
      var st  = that.data
      console.log(st)
      wx.navigateTo({
        url: '/pages/my/edit/edit?st='+JSON.stringify(st)
      })
    },
    //所有订单
    tomyorder:function(e){
      if(!this.data.token){
        wx.showToast({
          title: '请先登录',
          icon:'none'
        })
        return false
      }
      var currenttab = e.currentTarget.dataset.currenttab
      wx.navigateTo({
        url: '/pages/my/myorder/myorder?currentTab='+currenttab,
        success:function(){
          console.log('成功')
        }
      })
    },
    //售后
    torefund:function(){
      if(!this.data.token){
        wx.showToast({
          title: '请先登录',
          icon:'none'
        })
        return false
      }
      wx.navigateTo({
        url: '/pages/my/refund/refund',
        success:function(){
          console.log('成功')
        }
      })
    },

 //跳转到注册页面
 goRegister:function(){
   wx.navigateTo({
     url: '/pages/my/setup/login/login',
   })
   this.setData({
     islogin:false
   })
 },
 //跳转微信授权登录页面
 goWechatLogin:function(){
   wx.navigateTo({
     url: '/pages/signin/signin',
   })
   this.setData({
     islogin:false
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
    this.getUserInfo()
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