// pages/my/coupon/coupon.js
//index.js  
//获取应用实例  
var api = require('../../../config/api.js');
var app = getApp();
var common = require("../../../utils/common.js");
var util = require("../../../utils/util.js");
Page({
  data: {
    // tab切换  
    currentTab: 0,
    page: 0,
    refundpage: 0,
    arrList: [],
    arrList1: [],
    arrList2: [],
    status: 2,
    status1:3,
    code_verify: '',
    inputValue: '',
    isTrue: false,   //即将过期是否存在

    from: '',   // 从哪个页面跳转过来的，默认空
  },
  onLoad: function (options) {
    const {from} = options
    this.data.from = from
    // console.log('111', options)
    this.getCoupon(this.data.status)
    this.getCoupon1(this.data.status1)
    this.initSystemInfo();
    this.setData({
      currentTab: parseInt(options.currentTab),
      // isStatus: options.otype
    });
  },

  getCoupon(status) {
    var that = this
    var token = wx.getStorageSync('access_token')
    app.request('https://www.omeals.cn/home/Coupon/noUseCoupon.html', 'get', {
      status,token
    })
      .then(data => {
       //console.log(data)
        var Time = new Date().getTime()
        var result = data.filter(item => Time - new Date(item.limit_time).getTime() > 0)
        var result1 = data.filter(item => Time - new Date(item.limit_time).getTime()  <= 0)
        // var isTe = result1.filter(item => Time - new Date(item.limit_time).getTime() <= 90)
        for (let index = 0; index < result1.length; index ++) {
          if(new Date(result1[index].limit_time).getTime() - Time  <= 5*86400000) {
            result1[index].isTrue = true;
          }else{
            result1[index].isTrue = false
          }
        }
        console.log(result1)
        // console.log(Time - new Date(item.limit_time).getTime())
        // console.log(result1);
        this.setData({
          arrList: result1,
          arrList2:result,
        })

      }).catch(err => {
        console.log(err)
      })

  },
  //已经使用的
  getCoupon1(status1){
      var token = wx.getStorageSync('access_token')
      const status=this.data.status1
      app.request('https://www.omeals.cn/home/Coupon/noUseCoupon.html', 'get', {
        status
      })
        .then(data => {
          this.setData({
            arrList1:data
          })
  
        }).catch(err => {})
  },

  bindsave: function (e) {
 
    var token = wx.getStorageSync('access_token')
    app.request(api.bindCode, 'get', {
      token: token,
      redeem: this.data.code_verify
    })
    .then(data => {
      wx.showToast({title: '兑换成功',})
      this.setData({
        inputValue: '',
      })
      this.getCoupon(this.data.status)
    })
    .catch(err => {
      wx.showToast({title: '兑换码错误',})
      this.setData({
        inputValue: '',
      })
    })
  },

  codeInput: function (e) {
    console.log( e.detail.value)
    this.setData({
      code_verify: e.detail.value
    })
  },

  getOrderStatus: function () {
    return this.data.currentTab == 0 ? 2 : this.data.currentTab == 2 ? 3 : this.data.currentTab == 3 ? 4 : 0;
  },

  // returnProduct:function(){
  // },
  initSystemInfo: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    console.log(e)
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var current = e.target.dataset.current;
      that.setData({
        currentTab: parseInt(current) - 2,
        isStatus: e.target.dataset.otype,
      });

      if(current==2||current==4){
        that.getCoupon(that.data.status)
      }else if(
        current==3
      ){
        that.getCoupon1(that.data.status1)
      }
    };
  },
  /**
   * 微信支付订单
   */
  // payOrderByWechat: function(event){
  //   var orderId = event.currentTarget.dataset.orderId;
  //   this.prePayWechatOrder(orderId);
  //   var successCallback = function(response){
  //     console.log(response);
  //   }
  //   common.doWechatPay("prepayId", successCallback);
  // },

  payOrderByWechat: function (e) {
    var order_id = e.currentTarget.dataset.orderId;
    var order_sn = e.currentTarget.dataset.ordersn;
    if (!order_sn) {
      wx.showToast({
        title: "订单异常!",
        duration: 2000,
      });
      return false;
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order_id,
        order_sn: order_sn,
        uid: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function (res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver',
                });
              }, 3000);
            },
            fail: function (res) {
              wx.showToast({
                title: res,
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function (e) {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  // 领取优惠券
  todraw: function () {
    wx.navigateTo({
      url: '/pages/my/coupon/drawcoupon/drawcoupon',
      success: function () {
        console.log('成功')
      }
    })
  },

  /**
   * 调用服务器微信统一下单接口创建一笔微信预订单
   */
  //   prePayWechatOrder: function(orderId){
  //     var uri = "/ztb/userZBT/GetWxOrder";
  //     var method = "post";
  //     var dataMap = {
  //       SessionId: app.globalData.userInfo.sessionId,
  //       OrderNo: orderId
  //     }
  //     console.log(dataMap);
  //     var successCallback = function (response) {
  //       console.log(response);
  //     };
  //     common.sentHttpRequestToServer(uri, dataMap, method, successCallback);
  //   }
  onShow: function () {
    this.getCoupon(this.data.status)
    this.getCoupon1(this.data.status1)
  },

  // 优惠券点击事件处理函数
  useCoupon(e){

    if(this.data.from === 'ettlement'){  // 从 ettlement 页面过来的
      const index = e.currentTarget.dataset.index
      const coupon = this.data.arrList[index]

      const currPages =  getCurrentPages();
      const prevPage = currPages[currPages.length-2]
      // 暂时只考虑满减券
      prevPage.setData({
        discount: coupon.minus,
        // discount_id: coupon.
      })
      wx.navigateBack()
    }else if(this.data.from === 'shopwt') {
      const index = e.currentTarget.dataset.index
      const coupon = this.data.arrList[index]

      const currPages =  getCurrentPages();
      const prevPage = currPages[currPages.length-2]
      // 暂时只考虑满减券
      prevPage.setData({
        discount: coupon.minus,
        // discount_id: coupon.
      })
    }
    wx.navigateBack()
  },
})