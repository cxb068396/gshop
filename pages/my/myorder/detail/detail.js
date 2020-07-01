
var app = getApp()
var api = require('../../../../config/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // time: 30 * 60 * 60 * 1000,
    isShowMore: false,   // 是否显示更多订单详情
    orderStatus: {},   // 对应状态的订单对应的操作
    headerData: {},    // 页面头部对应的数据信息
    orderDetail: [],

    address: {},  // 地址相关信息
    products: [],   // 产品相关信息
    prices: {
      orderPrice: '',
      discount: '',
      sendfee: '',
      total: ''
    },    // 各种价格相关
    orderDetail: {},  // 订单详细信息
    status: 1,
    countdown: '29分59秒',
    isshow:true,
    pay_status:11,
     arr:[] //获取再次购买的订单id和数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { orderId, status } = options
    this.data.orderId = orderId
    this.setData({ status })
    if(status==1) {
       this.loadOrderDetail(orderId)}
    else
    {   this.OrderDetail(orderId)}
   
  },

  // 请求接口加载代付款订单详情
  loadOrderDetail(id) {
    const data = {
      token: wx.getStorageSync('access_token'),
      id
    }
    app.request(api.Repay, 'post', data)
      .then(data => {
     console.log(data)
        let { address, products, prices, orderDetail } = this.data
        address = data.address
        address.addr = data.address.province + data.address.city + data.address.county + data.address.area
        data.product.forEach(item => {
          item.main_images = 'https://www.omeals.cn/Uploads/files/' + item.main_images
        })
        data.pay?this.data.pay = data.pay:''

        products = data.product
        prices.orderPrice = data.original_price
        prices.discount = data.discounts
        prices.sendfee = data.freight
        prices.total = data.total
        orderDetail.orderNum = data.order_num
        orderDetail.createTime = data.create_time
        orderDetail.expiration_time = data.expiration_time
        orderDetail.remark = data.remark
        orderDetail.payNum = data.pay_num

        this.setData({ address, products, prices, orderDetail })

        if (this.data.status == 1 || this.data.status == 11) {
          this.countDown(data.expiration_time);
        }
      })
      .catch(err => { })
  },
  //待发货获取订单详情
  OrderDetail(id) {
    const data = {
      token: wx.getStorageSync('access_token'),
      id
    }
    app.request(api.orderDetail, 'post', data)
      .then(data => {
     console.log(data)
        let { address, products, prices, orderDetail } = this.data
        address = data.address
        address.addr = data.address.province + data.address.city + data.address.county + data.address.area
        data.product.forEach(item => {
          item.main_images = 'https://www.omeals.cn/Uploads/files/' + item.main_images
        })
        data.pay?this.data.pay = data.pay:''

        products = data.product
        prices.orderPrice = data.original_price
        prices.discount = data.discounts
        prices.sendfee = data.freight
        prices.total = data.total
        orderDetail.orderNum = data.order_num
        orderDetail.createTime = data.create_time
        orderDetail.expiration_time = data.expiration_time
        orderDetail.remark = data.remark
        orderDetail.payNum = data.pay_num,
        orderDetail.list=data.product
        orderDetail.total=data.total
        orderDetail.address=data.address
        orderDetail.discounts=0,
        orderDetail.formcart='0'
        orderDetail.freight=0
        

        this.setData({ address, products, prices, orderDetail,pay_status:data.pay_status })
           console.log('123455',this.data.orderDetail) 
        if (this.data.status == 1 || this.data.status == 11) {
          this.countDown(data.expiration_time);
        }
      })
      .catch(err => { })
  },
 //请求接口获取待发货的详情
  /**
   * 待支付未付款时的倒计时
   * @param {string} endTime 
   */
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

  // 跳转到交易关闭页面
  gocloseorder: function () {
    wx.navigateTo({
      url: '/pages/my/myorder/closeorder/closeorder',
    })
  },

  // 跳转到物流信息页面
  navigatePage(e) {

    const key = e.currentTarget.dataset.key
    if (key && key === 'logistics') {
      wx.navigateTo({
        url: `/pages/my/myorder/logistics/logistics?orderId=${this.data.orderId}`
      })
    }
  },

  showMoreDetail() {
    // ToDo 同时操作滚动条到底部
    this.setData({
      isShowMore: true
    })
  },

  // ToDo 相关操作 去支付 售后、退款 确定收货

  /**
   * 取消订单 操作处理函数
   * @author 杜晓东
   * @updated 2020.06.05
   */

  //代付款取消订单
  cancelOrder(e) {
    const orderId = this.data.orderId
    var that=this
    let modalOptions = {
      title: '取消订单',
      content: [`您确定取消订单${this.data.orderDetail.orderNum}`],
    }
    app.promisic(wx.ysShop.showModal)(modalOptions)
      .then(({ confirm, cancel }) => {
        if (confirm && !cancel) {
          wx.request({
            url: api.DeleteOrder,
            data:{
              token: wx.getStorageSync('access_token'),
              id: orderId
            },
             method: 'POST', 
          header: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       success:function(res){
         console.log(res)
        if(res.data.code==true){
          wx.showToast({
            title: '取消成功',
          })
          that.setData({ status: 6,isshow:false })
          that.loadOrderDetail()
        }
       }
          })
         }     
      })
  },
 
  //待发货取消订单涉及到退款
  cancelOrder1(e) {
    const orderId = this.data.orderId
    var that=this
    let modalOptions = {
      title: '取消订单',
      content: [`您确定取消订单${this.data.orderDetail.orderNum}`],
    }
    app.promisic(wx.ysShop.showModal)(modalOptions)
      .then(({ confirm, cancel }) => {
        if (confirm && !cancel) {
          wx.request({
            url: api.orderCancel,
            data:{
              token: wx.getStorageSync('access_token'),
              id: orderId
            },
             method: 'POST', 
          header: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       success:function(res){
         console.log(res)
        if(res.data.code==true){
          wx.showToast({
            title: '取消成功',
          })
          that.setData({ status: 5,isshow:false })
         // that.orderDetail()
        }
       }
          })
         }     
      })
  },

  //已经退款的涉及到永久删除订单
  deleteforever(){
    const orderId=this.data.orderId
    var that=this
    let modalOptions = {
      title: '取消删除',
      content: ['您确定取删除订单？', '删除后将无法查询该订单']
    }
    app.promisic(wx.ysShop.showModal)(modalOptions)
      .then(({ confirm, cancel }) => {
        if (confirm && !cancel) {
          wx.request({
            url: api.AbrogateDelete,
            data:{
              token: wx.getStorageSync('access_token'),
              id: orderId
            },
             method: 'POST', 
          header: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       success:function(res){
         if(res.data.code==true){
           wx.showToast({
             title: '删除成功',
           })
           wx.navigateBack({
             delta: 1,
           })
         }
    
       }
          })
         }     
      })
  },

  /**
   * 去支付
   */
  payAgain(){
    app.promisic(wx.requestPayment)({...this.data.pay})
    .then(data => {
      // 
      this.setData({status: 2,isshow:false})
    })
    .catch(err => {})
    
  },
 //再次购买跳入到点击结算按钮这块
async buyAgain(){
let that=this
let orderDetail=that.data.orderDetail
  const data = { 
    id: this.data.orderId
  }
  await app.request(api.buyAgain, 'post', data).then(data=>{
  for(let i=0;i<orderDetail['list'].length;i++){
    orderDetail['list'][i]['id']=data[i]['pid']
    orderDetail['list'][i]['num']=data[i]['num']
  }
  wx.navigateTo({
    url: '/pages/Shopcart/settlement/ettlement?str='+ JSON.stringify(this.data.orderDetail)+'&page=detail'
  })
  }).catch(err=>{
     if(err.mes&&err.mes=='商品不存在或者已经下架'){
         wx.showToast({
           title: '商品下架',
           image:'../../../static/icon/icon_error.png'
         })
     }
  })


  // let arr=that.data.arr;
  // let orderDetail=that.data.orderDetail
  // for(let i=0;i<orderDetail['list'].length;i++){
  //   orderDetail['list'][i]['id']=arr[i]['pid']
  //   orderDetail['list'][i]['num']=arr[i]['num']
  // }
  // wx.navigateTo({
  //   url: '/pages/Shopcart/settlement/ettlement?str='+ JSON.stringify(this.data.orderDetail)+'&page=detail'
  // })
}
})

