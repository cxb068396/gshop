// pages/Shopcart/payment/payment.js
var MD5 = require('../../../utils/common')
var api = require('../../../config/api.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    countdown: '',
    isShowMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // var data = JSON.parse(decodeURIComponent(option.strs))
    var data = app.globalData.strs
    // let short = {}
    // short.expiration_time = data.expiration_time
    // short.order_num = data.order_num
    // short.remark = data.remark
    // debugger

    for (let index = 0; index < data.product.length; index++) {
      const element = 'https://www.omeals.cn/Uploads/files/' + data.product[index].main_images;
      data.product[index].main_images = element
    }
    this.countDown(data.expiration_time)

    this.setData({
      address: data.address,
      expiration_time: data.expiration_time,
      id: data.id,
      order_num: data.order_num,
      pay: data.pay,
      carts: data.product,
      total: data.total,
      remark: data.remark
    })

  },

  paymaney: function () {
    var that = this
    // 时间戳
    var timestamps = that.data.pay.timeStamp
    // 随机字符串
    var nonceStrs = that.data.pay.nonceStr
    //返回id参数
    var packages = that.data.pay.package
    //签名
    var paySigns = that.data.pay.paySign
    // 签名算法
    var signTypes = that.data.pay.signType
    console.log(timestamps)
    console.log(nonceStrs)
    console.log(packages)
    console.log(paySigns)
    console.log(signTypes)
    wx.requestPayment({
      timeStamp: timestamps,
      nonceStr: nonceStrs,
      package: packages,
      signType: signTypes,
      paySign: paySigns,
      success(res) {
        console.log(res)
        wx.showToast({
          title: '支付成功！',
          icon: 'success',
        })
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/my/myorder/detail/detail?orderId=${that.data.id}&status=${2}`,
          })
        }, 2000)

      },
      fail(res) {
        console.log(res)
      }
    })

  },

  countDown(endTime) {
    let end = 0;
    if (endTime instanceof Date) {
      end = endTime.getTime()
    } else if (typeof endTime == 'string') {
      end = new Date(endTime.replace(/-/g, '/')).getTime()
    }
    const now = new Date().getTime()
    const diff = end - now
    let m = 0
    let s = 0
    if (end - now > 0) {  // 离订单失效时间
      let num = diff / 1000 / 60
      m = parseInt(num)
      s = parseInt((num - m) * 60)
      if (s == 0 && m > 1) {
        m = m - 1
        s = 59
      }
      this.setData({ countdown: `${('0' + m).slice(-2)}分${('0' + s).slice(-2)}秒` })
      const timer = setInterval(() => {
        if (s > 0) {
          s = s - 1
          this.setData({ countdown: `${('0' + m).slice(-2)}分${('0' + s).slice(-2)}秒` })
        } else if (s == 0) {
          if (m > 0) {
            m = m - 1
            s = 59
            this.setData({ countdown: `${('0' + m).slice(-2)}分${('0' + s).slice(-2)}秒` })
          } else if (m == 0) {
            this.setData({ countdown: `${('0' + m).slice(-2)}分${('0' + s).slice(-2)}秒` })
            this.setData({ status: 7 })
            clearInterval(timer)
          }
        }

      }, 1000)
    } else {
      this.setData({ status: 7 })
    }
  },


  delOrder() {
    const options = {
      title: '取消订单',
      content: [`您确定取消订单${this.data.order_num}？`]
    }
    app.promisic(wx.ysShop.showModal)(options)
      .then(({ confirm, cancel }) => {
        if (confirm && !cancel) {
          return app.request(api.DeleteOrder, 'post', { id: this.data.id })
        }
      })
      .then(data => {
        wx.showToast({ title: '取消订单成功' })
        wx.navigateBack({ delta: 2 })
      })
      .catch(err => wx.showToast({ title: '取消订单失败' }))
  },

  // 显示更多订单细节
  showMoreDetail() {

  },
})