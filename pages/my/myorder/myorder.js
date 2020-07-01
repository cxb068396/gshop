var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,  // tab切换  
    status: 0,      //10待付款，20待发货，30待收货 40、50已完成
    page: 0,
    page1:0,
    page2:0,
    page3:0,
    page4:0,
    refundpage: 0,
    currentList: [],  // 当前被选中的列表
    orderList0: [],
    orderList1: [],
    orderList2: [],
    orderList3: [],
    orderList4: [],
    windowHeight:0,
     scrollTop: 0,  
     scrollHeight: 0  
   
  },
  //获取所有订单
  getAllOrder(complete=()=>{}){
    this.setData({
      page1:0,
      page2:0,
      page3:0,
      page4:0,
    })
    var that =this;
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
    const data={
      token: wx.getStorageSync('access_token'),
      status:0,
      page: this.data.page,
    }
    app.request(api.AllOrder,'post',data,{},complete).then(data=>{
    //console.log(data)
    var goods = data
    for (let index = 0; index < goods.length; index++) {
      const element = 'https://www.omeals.cn/Uploads/files/' + goods[index]['product'][0].main_images;
      goods[index].main_images = element
    }
    let goodsList=[]
    if(that.data.page!=0){
     goodsList = that.data.orderList0.concat(goods)
    }else{
     goodsList = goods
    }
  //  console.log(goodsList)
    that.setData({ orderList0: goodsList})
    wx.hideLoading()
    }).catch(err=>{
      if(err.mes && err.mes=='您还没有相关的订单'){
        that.setData({
          orderList0:[]
        })
      }else if(err.mes&&err.mes=='我是有底线的'){
        wx.showToast({
          title:'到底了',
          image:'../../static/icon/icon_error.png'
        })
      }
      wx.hideLoading()
    })
  },
  //代付款的单子
  getOrder1(complete=()=>{}){
    this.setData({
      page:0,
      page2:0,
      page3:0,
      page4:0,
    })
    var that =this;
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
    const data={
      token: wx.getStorageSync('access_token'),
      status:1,
      page: this.data.page1,
    }
    app.request(api.AllOrder,'post',data,{},complete).then(data=>{
  //  console.log(data)
    var goods = data
    for (let index = 0; index < goods.length; index++) {
      const element = 'https://www.omeals.cn/Uploads/files/' + goods[index]['product'][0].main_images;
      goods[index].main_images = element
    }
    var goodsList
   if(that.data.page1!=0){
    goodsList = that.data.orderList1.concat(goods)
   }else{
    goodsList = goods
   }
 //   console.log(goodsList)
    that.setData({ orderList1: goodsList})
    wx.hideLoading()
    }).catch(err=>{
    // console.log(err)
      if(err.mes&&err.mes=='您还没有相关的订单'){
        that.setData({
          orderList1:[]
        })
      }else if(err.mes&&err.mes=='我是有底线的'){
        wx.showToast({
          title:'到底了',
          image:'../../static/icon/icon_error.png'
        })
      }
      wx.hideLoading()
    })
  },
  //获取待发货
  getOrder2(complete=()=>{}){
    this.setData({
      page:0,
      page1:0,
      page3:0,
      page4:0,
    })
    var that =this;
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
    const data={
      token: wx.getStorageSync('access_token'),
      status:2,
      page: this.data.page2,
    }
    app.request(api.AllOrder,'post',data,{},complete).then(data=>{
   // console.log(data)
    var goods = data
    for (let index = 0; index < goods.length; index++) {
      const element = 'https://www.omeals.cn/Uploads/files/' + goods[index]['product'][0].main_images;
      goods[index].main_images = element
    }
    var goodsList
   if(that.data.page2!=0){
    goodsList = that.data.orderList2.concat(goods)
   }else{
    goodsList = goods
   }
   // console.log(goodsList)
    that.setData({ orderList2: goodsList})
    wx.hideLoading()
    }).catch(err=>{
      if(err.mes &&err.mes=='您还没有相关的订单'){
        that.setData({
          orderList2:[]
        })
      }else if(err.mes&&err.mes=='我是有底线的'){
        wx.showToast({
          title:'到底了',
          image:'../../static/icon/icon_error.png'
        })
      }
      wx.hideLoading()
    })
  },
  //待收货
  getOrder3(complete=()=>{}){
    this.setData({
      page:0,
      page1:0,
      page2:0,
      page4:0,
    })
    var that =this;
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
    const data={
      token: wx.getStorageSync('access_token'),
      status:3,
      page: this.data.page3,
    }
    app.request(api.AllOrder,'post',data,{},complete).then(data=>{
   // console.log(data)
    var goods = data
    for (let index = 0; index < goods.length; index++) {
      const element = 'https://www.omeals.cn/Uploads/files/' + goods[index]['product'][0].main_images;
      goods[index].main_images = element
    }
    var goodsList
    if(that.data.page3!=0){
     goodsList = that.data.orderList3.concat(goods)
    }else{
     goodsList = goods
    }
  //  console.log(goodsList)
    that.setData({ orderList3: goodsList})
    wx.hideLoading()
    }).catch(err=>{
      if(err.mes&&err.mes=='您还没有相关的订单'){
        that.setData({
          orderList3:[]
        })
      }else if(err.mes&&err.mes=='我是有底线的'){
        wx.showToast({
          title:'到底了',
          image:'../../static/icon/icon_error.png'
        })
      }
      wx.hideLoading()
    })
  },
    //待评价
    getOrder4(complete=()=>{}){
      this.setData({
        page:0,
        page1:0,
        page3:0,
        page2:0,
      })
      var that =this;
        // 显示加载图标
        wx.showLoading({
          title: '玩命加载中',
        })
      const data={
        token: wx.getStorageSync('access_token'),
        status:4,
        page: this.data.page4,
      }
      app.request(api.AllOrder,'post',data,{},complete).then(data=>{
     // console.log(data)
      var goods = data
      for (let index = 0; index < goods.length; index++) {
        const element = 'https://www.omeals.cn/Uploads/files/' + goods[index]['product'][0].main_images;
        goods[index].main_images = element
      }
      var goodsList
      if(that.data.page4!=0){
       goodsList = that.data.orderList4.concat(goods)
      }else{
       goodsList = goods
      }
     // console.log(goodsList)
      that.setData({ orderList4: goodsList})
      wx.hideLoading()
      }).catch(err=>{
        if(err.mes&&err.mes=='您还没有相关的订单'){
          that.setData({
            orderList4:[]
          })
        }else if(err.mes&&err.mes=='我是有底线的'){
          wx.showToast({
            title:'到底了',
            image:'../../static/icon/icon_error.png'
          })
        }
        wx.hideLoading()
      })
    },
  bindDownLoad: function () {  
  let page=this.data.page;
  page++
  this.setData({
    page:page
  })
  this.getAllOrder()
    
},  
scroll: function (event) {  
    this.setData({  
        scrollTop: event.detail.scrollTop  
    });  
},  
bindDownLoad1: function () {  
  let page1=this.data.page1;
  page1++
  this.setData({
    page1:page1
  })
  this.getOrder1()
    
},  
scroll1: function (event) {  
    this.setData({  
        scrollTop: event.detail.scrollTop  
    });  
}, 
bindDownLoad2: function () {  
  let page2=this.data.page2;
  page2++
  this.setData({
    page2:page2
  })
  this.getOrder2()
    
},  
scroll2: function (event) {  
    this.setData({  
        scrollTop: event.detail.scrollTop  
    });  
}, 
bindDownLoad3: function () {  
  let page3=this.data.page3;
  page3++
  this.setData({
    page3:page3
  })
  this.getOrder3()
    
},  
scroll3: function (event) {  
    this.setData({  
        scrollTop: event.detail.scrollTop  
    });  
}, 
bindDownLoad4: function () {  
  let page4=this.data.page4;
  page4++
  this.setData({
    page4:page4
  })
  this.getOrder4()
    
},  
scroll4: function (event) {  
    this.setData({  
        scrollTop: event.detail.scrollTop  
    });  
}, 
  // 获取设备屏幕高度
  systemType () {
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = res.windowHeight
 
        this.setData({
          windowHeight: windowHeight
        })
 
   //     console.log(res)
      }
    })
  },
  onLoad: function (options) {
    
    this.systemType()

   // console.log(options)
    this.initSystemInfo();
    this.setData({
      currentTab: parseInt(options.currentTab),
      // status: options.otype
    });

   if(this.data.currentTab==0){
     this.getAllOrder()
   }
  },

  onShow(){
    this.getAllOrder()
    this.getOrder1()
    this.getOrder2()
    this.getOrder3()
    this.getOrder4()
  },

  loadReturnOrderList: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Order/order_refund',
      method: 'post',
      data: {
        uid: app.d.userId,
        page: that.data.refundpage,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data.ord;
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            orderList4: that.data.orderList4.concat(data),
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
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

  // 滑动事件处理函数
  bindChange: function (e) {
   // console.log(e.detail)
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      status: that.setOrderStatus(e.detail.current),
   
    });
    if(e.detail.current==0){
      this.getAllOrder()
    }else if(e.detail.current==1){
      this.getOrder1()
    }else if(e.detail.current==2){
    this.getOrder2()
    }else if(e.detail.current==3){
      this.getOrder3()
    }else if(e.detail.current==4){
      this.getOrder4()
    }
  },

  /**
   * 根据索引数字，生成订单状态
   * @param {*} tabInd 
   * updated 2020.06.01
   * author 杜晓东
   */
  setOrderStatus(tabInd) {
    const statusArr = [0, 1, 2, 3, 5]
    return statusArr[tabInd]
  },

  swichNav: function (e) {
  //  console.log(e)
    var that = this;
    if (that.data.currentTab == e.target.dataset.current) {
      return;
    } else {
      var current = e.target.dataset.current;
      that.setData({
        currentTab: parseInt(current),

      });
    };
 
    if(e.target.dataset.current==0){
      this.getAllOrder()
    }else if(e.target.dataset.current==1){
      this.getOrder1()
    }else if(e.target.dataset.current==2){
    this.getOrder2()
    }else if(e.target.dataset.current==3){
      this.getOrder3()
    }else if(e.target.dataset.current==4){
      this.getOrder4()
    }
  },
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
  //下拉刷新数据
  onPullDownRefresh: function () {

  },
  /**
   * 跳转到退货等页面
   * @param {*} e 
   */
  jumpPage(e) {
    let key = e.currentTarget.dataset.key
    let orderId = ''

    if (key && key === 'logistics') {
      wx.navigateTo({
        url: `/pages/my/myorder/logistics/logistics?orderId=${orderId}`
      })
    }else if (key && key === 'assess') {
      wx.navigateTo({
        url: `/pages/my/myorder/assess/assess?orderId=${orderId}`,
      })
    }
  },

  cancelOrder(e) {
    var that=this
    const index = e.currentTarget.dataset.index
    const tabIndex = this.data.currentTab
    const order = this.data['orderList'+tabIndex][index]
    const id=e.currentTarget.dataset.id
    let modalOptions = {
      title: '取消订单',
      content: [`您确定取消订单${order.order_num}`],
    }
    app.promisic(wx.ysShop.showModal)(modalOptions)
      .then(({ confirm, cancel }) => {
        if (confirm && !cancel) {
         wx.request({
           url: api.DeleteOrder,
           data:{
             token: wx.getStorageSync('access_token'),
             id: id
           },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success:function(res){
       if(res.data.code==true){
         wx.showToast({
           title: '取消成功',
         })
         that.getOrder1()
         that.getAllOrder()
       }
      }
         })
        }
      })

  },

  //待收货状态下取消订单涉及到退款
  cancelOrder1(e) {
    var that=this
   // console.log(e)
    const index = e.currentTarget.dataset.index
    const tabIndex = this.data.currentTab
    const order = this.data['orderList'+tabIndex][index]
    const id=e.currentTarget.dataset.id
    let modalOptions = {
      title: '取消订单',
      content: [`您确定取消订单${order.order_num}`],
    }
    app.promisic(wx.ysShop.showModal)(modalOptions)
      .then(({ confirm, cancel }) => {
        if (confirm && !cancel) {
         wx.request({
             url: api.orderCancel,  
           data:{
             token: wx.getStorageSync('access_token'),
             id: id
           },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success:function(res){
       if(res.data.code==true){
         wx.showToast({
           title: '退款成功',
         })
        setTimeout(()=>{
          that.getOrder2()
          that.getAllOrder()
        },1000)
       }else{
         wx.showToast({
           title: '退款失败',
         })
       }
      }
         })
        }
      })

  },
 
//删除订单操作
AbrogateDelete(e) {
  var that=this
    const index = e.currentTarget.dataset.index
    const tabIndex = this.data.currentTab
    const order = this.data['orderList'+tabIndex][index]
    const id=e.currentTarget.dataset.id
    let modalOptions = {
      title: '删除订单',
      content: ['您确定取删除订单？', '删除后将无法查询该订单']
    }

    app.promisic(wx.ysShop.showModal)(modalOptions)
      .then(({ confirm, cancel }) => {
        // ToDo 请求后台接口，实现删除对应订单的记录
        if (confirm && !cancel) {
          wx.request({
              url: api.AbrogateDelete,  
            data:{
              token: wx.getStorageSync('access_token'),
              id: id
            },
             method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
         'Content-Type': 'application/x-www-form-urlencoded'
       }, // 设置请求的 header
       success:function(res){
        if(res.data.code==true){
          wx.showToast({
            title: '删除成功',
          })
         setTimeout(()=>{
           that.getAllOrder()
         },1000)
        }else{
          wx.showToast({
            title: '删除失败',
          })
        }
       }
          })
         }
      })
  },

//确认收货按钮
  recOrder(e) {
    const index = e.currentTarget.dataset.index
    const tabIndex = this.data.currentTab
    const order = this.data['orderList'+tabIndex][index]

    let modalOptions = {
      title: '确认',
      content: ['您确定已经收到货品？']
    }

    app.promisic(wx.ysShop.showModal)(modalOptions)
      .then(({ confirm, cancel }) => {
        // ToDo 请求后台接口，实现 确认收货
        if (confirm && !cancel) {

        }
      })
  },

  //确认收货
  _recOrder: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.orderId;
    wx.showModal({
      title: '提示',
      content: '你确定已收到宝贝吗？',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Order/orders_edit',
          method: 'post',
          data: {
            id: orderId,
            type: 'receive',
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var status = res.data.status;
            if (status == 1) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
            
            
            //  that.loadOrderList();
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });

      }
    });
  },

  

  //去支付
  topay(e){
    const index = e.currentTarget.dataset.index
    const tabIndex = this.data.currentTab
    const order = this.data['orderList'+tabIndex][index]
    wx.navigateTo({
      url: `/pages/my/myorder/detail/detail?orderId=${order.id}&status=${order.order_status}`
    })
  },
//再一次购买
buyAgain:function(e){
const {id,status}=e.currentTarget.dataset
wx.navigateTo({
  url: '/pages/my/myorder/detail/detail?orderId='+id+'&status='+status,
})
},

//测试解析
gototest:function(){
  wx.navigateTo({
    url: '/pages/my/myorder/logisticstest/logisticstest',
  })
},

drawback:function(e){
 const index = e.currentTarget.dataset.index
 const tabIndex = this.data.currentTab
 const order = this.data['orderList'+tabIndex][index]
  console.log(order)
  this.setData({
    islogin:true,
    order:order
  })
},
close:function(){
this.setData({
 islogin:false
})
},
btncancel:function(){
  this.setData({
    islogin:false
  })
},
//跳转售后页面
btnconfirm:function(){
  this.setData({
    islogin:false
  })
  wx.navigateTo({
  url: `/pages/my/myorder/drawback/drawback?orderId=${this.data.order.id}`,
   })
},
// 跳转至退换货政策页面
toPolicy:function() {
  wx.navigateTo({
    url: '../setup/about/goodsPolicy/goodsPolicy',
  })
},
})