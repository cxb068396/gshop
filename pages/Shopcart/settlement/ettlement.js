const app = getApp()
const api = require('../../../config/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    totalPrice: 0,//总价格
    cartsnum: 0,//几件产品
    payment: 0,  //支付金额
    freight: 0,//运费
    discount: 0,//优惠金额
    remark: ''//备注
  },


  // 支付金额等于总金额减去优惠金额加上运费
  paymen() {
    let totalPrice = this.data.totalPrice;
    let freight = this.data.freight;
    let discount = this.data.discount;

    console.log(freight)
    console.log(discount)
    this.setData({
      payment: totalPrice - discount + freight
    })
    console.log(this.data.payment)
  },



  // 价格调用该方法
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      // if(carts[i].selected){                   // 判断选中才会计算价格
      total += carts[i].num * carts[i].sell_price || carts[i].num * carts[i].price ;     // 所有价格加起来
      // }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
    this.paymen()
  },

  // /* 点击减号 */
  // bindMinus: function (e) {
  //   const index = e.currentTarget.dataset.index;
  //   let carts = this.data.carts;
  //   let num = carts[index].num;
  //   if (num <= 1) {
  //     return false;
  //   }
  //   num = num - 1;
  //   carts[index].num = num;
  //   this.setData({
  //     carts: carts,
  //   });
  //   this.getTotalPrice()
  // },
  // /* 点击加号 */
  // bindPlus: function (e) {
  //   const index = e.currentTarget.dataset.index;
  //   let carts = this.data.carts;
  //   let num = carts[index].num;
  //   if (num >999) {
  //     return false;
  //   }
  //   num = parseFloat(num + 1)
  //   carts[index].num = num;
  //   this.setData({
  //     carts: carts
  //   });
  //   this.getTotalPrice();
  // },
  /* 输入框事件 */
  // bindManual: function (e) {
  //   let numa = e.detail.value
  //   if (numa == '' || numa == 0) {
  //     numa = 1;
  //   }
  //   if (numa>999) {
  //     wx.showToast({
  //       title: '数量最大999',
  //       icon:'none'
  //     })
  //     return false
  //   }
  //   const index = e.currentTarget.dataset.index;
  //   let carts = this.data.carts;
  //   let num = numa
  //   carts[index].num = parseFloat(num);
  //   this.setData({
  //     carts: carts
  //   });
  //   this.getTotalPrice()
  // },
  bindin: function (e) {
    var that = this
    var str = e.detail.value;
    that.setData({
      remark: str
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('123',options)
    var that = this
    // 来自购物车的数据
    var data = JSON.parse(options.str);
    console.log(data)

   if(options.page!='detail'){
    for (let index = 0; index < data.list.length; index++) {
      const element = 'https://www.omeals.cn/Uploads/files/' + data.list[index].main_images;
      data.list[index].main_images = element;
    }
   }
    that.setData({
      carts: data.list,
      address: data.address,
      freight: data.freight,
      discount: data.discounts,
      formcart: data.formcart
    })
    that.getTotalPrice()
    that.paymen()
  },

  onShow(){
    this.getTotalPrice()
  },




  topayment: function () {
    var that = this
    var address_id = that.data.address.id
    var token = wx.getStorageSync('access_token')
    var product = {};
    var discount_id = 0;
    // ToDo 动态获取 discount_id 优惠券id
    // var discount_id = this.data.discount_id;
    var freight = that.data.freight;
    var remark = that.data.remark;
    var carts = that.data.carts;
    var from_cart = that.data.formcart
    console.log(carts)
    for (let i = 0; i < carts.length; i++) {
      var sty = carts[i].id
      var valu = carts[i].num
      product[sty] = valu;
    }
    var str = {
      token: token,
      address_id: address_id,
      product: product,
      discount_id: discount_id,
      freight: freight,
      remark: remark,
      formcart: from_cart
    }
    console.log(str)

    app.request(api.CreateOrder, undefined, str)
      .then(data => {
        // var str = encodeURIComponent(JSON.stringify(data))
        // wx.navigateTo({ url: '/pages/Shopcart/payment/payment?strs=' + str })
        // 通过app.globalData 传值
        data.remark = remark
        app.globalData.strs = data
        wx.navigateTo({url: '/pages/Shopcart/payment/payment'})
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.mes || ''
        })
      })

  },

  // 跳转至优惠券页面
  navigateToCoupon() {
    wx.navigateTo({
      url: `/pages/my/coupon/coupon?currentTab=0&from=ettlement`
    })
  },

  //跳转到地址列表进行修改地址
  toaddress: function () {
    wx.navigateTo({
      url: '/pages/my/setup/address/address',
      success: function () {
        console.log('成功')
      }
    })
  },

})