var api = require('../../config/api.js');
const app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
Page({
  data: {
    str:[],
    numer:0,
    isLike: true,
    // banner
    imgUrls: [],
    current: 0,
    id:0,
    indicatorDots: false, //是否显示面板指示点
    autoplay: false, //是否自动切换
    duration: 1000, //  滑动动画时长1s
    // 商品详情介绍
    detailImg: [
      "https://omeals.cn/public/home/images/wximage/egg_d.png",
      "https://omeals.cn/public/home/images/wximage/egg_d.png"
    ],
    html:'',
    isDetailImg: true,
    dataDestail: ""
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    var id = options.id
    that.setData({
      id:id
    })

    wx.request({              
      url: api.MainDetail,
      data: {
        id:id
      },          
      success: function (res) {  
         console.log(res.data.mes)
         if(res.data.code==true){
           var st = res.data.mes.images;
           var stimg=[]
           for (let index = 0; index < st.length; index++) {
             var element ='https://www.omeals.cn/Uploads/files/'+st[index];
             stimg.push(element)      
           }
          // let result=res.data.mes.detail
          //  const regex = new RegExp('<img', 'gi');
          //  result = result.replace(regex, `<img style="width:100%;margin:0 auto;"`); 
          
          let jsonDate = JSON.stringify(res.data.mes.product_specs).replace(/\"/g, "");    //去掉所有 "
          let js = jsonDate.replace(/\\/g, "").replace(/\{/g, "").replace(/\}/g, "").replace(/\,/g, "   ");   // 去掉所有的\
          // console.log(jsonDate);
          // console.log(js)
          
          WxParse.wxParse('desc', 'html', res.data.mes.detail, that,0,{type: 'detailImg'});
          that.setData({
            str:res.data.mes,   
            imgUrls: stimg, 
            detailImg:  stimg,      
            dataDestail: js
          })            
         }else{
           console.log(res.data.mes)
         }
      }
    })

  },





  // 轮播图位置
  swiperChange: function (e) {
    var that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        current: e.detail.current
      })
    }
  }, 
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/Shopcart/Shopcart'
    })
  },
  // 立即购买
  immeBuy() {
    var that = this
    var token = wx.getStorageSync('access_token') 
    var id = that.data.str.id;
    var num = 1;
   var str={
     token:token,
     formcart:0,
     product:{
       [id]:num
     }
   }
   console.log(str)
    wx.request({              
      url: api.OrderIndex,
      data: str, 
      success:function(res){
    console.log(res)
        if(res.data.code==false &&res.data.mes=='参数错误！'){
          wx.showModal({
            title: '提示',
            content: '请先登录' ,
            showCancel:false,
            success(res){
              if(res.confirm){
                wx.navigateTo({
                  url:'/pages/my/setup/login/login',
                })
                return
              }
            }              
          })
        }else{
          var str = JSON.stringify( res.data.mes)
          wx.navigateTo({
            url: '/pages/Shopcart/settlement/ettlement?str='+str
          })
        }
        
      }  
    })  
  },

  //新人优惠卷
  discount(){
     // 跳转至优惠券页面
    wx.navigateTo({
      url: `/pages/my/coupon/coupon?currentTab=0&from=shopwt`
    })

  },


  // 加入购物车
  addCar(e){
    var id = this.data.id;
    console.log(e)
    app.request(api.AddCart,'post',{num: 1,specs_id: id, uid: wx.getStorageSync('access_token')})
    .then(data => {
      wx.showToast({'title': data})
    })
    .catch(err => {
      wx.showToast({'title': err.mes || '添加购物车失败'})
    })
  }




})