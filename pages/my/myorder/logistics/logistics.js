// pages/userhome/address/address.js
//第一步，先获取物流信息的起点和终点位置；
// 第二步，通过腾讯位置服务将起始点的位置进行解析获取，起始点的坐标；
//第三步：将起始点的坐标放入腾讯位置服务，进行路线规划(如果有必要，起点位置还需要进行判断是都是最新的位置，更改起始点，重新进行路线规划)
//物流信息需要3个状态进行区分，一个是终点的物流状态，一个是当下的物流状态，还有一个是已经过去的物流状态，以便进行物流信息的渲染

var api = require('../../../../config/api.js');
var app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../../../lib/qqmap/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: '2BPBZ-FER6U-27NVW-2HKMK-EKAI2-G7FWT' // 必填
});
Page({
  data: {
    position:'fixed',
    height:500,
    isshow:true,
    scale:5,
    markers: [],//标记地图上起始点和终点的图标
    orderId:'', //获取订单的id
    startAddress:'', //获取起点位置
    endAddress:'',// 终点位置
    startLocation:'', //起点坐标
    endLocation:'',  //终点坐标
    logistics:''//用于保存物流信息
  },
  //点击按钮将隐藏的部分显示出来
  getMore:function(){
    this.setData({
      position:'static',
      height:'',
      isshow:false
    })
  },

  onLoad: function(options) {
   this.getlogistics();
  if(this.data.startAddress&&this.data.endAddress){ //如果有起点地址和终点地址才会进行地址的解析坐标
    this.getStartLocation();
    this.getEndlocation();
  }
   if(this.data.startLocation&&this.data.endLocation){  //如果有起点和终点坐标，才会执行线路规划
     this.routerPlanning()
   }
  },

  //先从后端接口获取物流信息
getlogistics:function(){
//ToDo 通过订单id获取物流信息，
//分别获取起点位置和终点位置 startAddress endAddress

},
//将起点和终点位置先进行坐标的转换
getStartLocation(){
  var that = this;
  var startAddress=that.data.startAddress
  //调用地址解析接口
  qqmapsdk.geocoder({
    //获取表单传入地址
    address: startAddress, //地址参数，将起点地址和终点地址分别进行解析
    success: function(res) {//成功后的回调
      console.log(res.location);
      that.setData({
        startLocation:res.location
      }) 
    },
    fail: function(error) {
      console.error(error);
    },
    complete: function(res) {
      console.log(res);
    }
  })
},
getEndlocation(){
  var that = this;
  var endAddress=that.data.endAddress
  //调用地址解析接口
  qqmapsdk.geocoder({
    //获取表单传入地址
    address: endAddress, //地址参数，将起点地址和终点地址分别进行解析
    success: function(res) {//成功后的回调
      console.log(res.location);
     that.setData({
       endLocation:res.location
     })
    },
    fail: function(error) {
      console.error(error);
    },
    complete: function(res) {
      console.log(res);
    }
  })
},
scalefuc(distance){
//  5级 ：200公里  6级 ：100公里  7级 ：50公里  8级 ：30公里  9级 ：20公里 10级 ：10公里 11级 ：5公里  12级 ：2公里  13级 ：1公里  14级 ：500米  15级 ：200米  16级 ：100米  17级 ：50米18级 ：25米
 if(distance>=200000){
   this.setData({
     scale:5
   })
 }else if(distance>=100000){
   this.setData({
     scale:6
   })
 }else if(distance>=50000){
   this.setData({
     scale:7
   })
 }else if(distance>=30000){
   this.setData({
     scale:8
   })
 }else if(distance>=20000){
   this.setData({
     scale:9
   })
 }else if(distance>=10000){
   this.setData({
     scale:10
   })
 }else if(distance>=5000){
   this.setData({
     scale:11
   })
 }else if(distance>=2000){
   this.setData({
     scale:12
   })
 }else if(distance>=1000){
   this.setData({
     scale:13
   })
 }else if(distance>=500){
   this.setData({
     scale:14
   })
 }else if(distance>=200){
   this.setData({
     scale:15
   })
 }else if(distance>=100){
   this.setData({
     scale:16
   })
 }else if(distance>=50){
   this.setData({
     scale:17
   })
 }else{
   this.setData({
     scale:18
   })
 }
   },
// 将解析后的起点和终点坐标进行路线规划
routerPlanning() {
  var that = this;
  //调用距离计算接口
  qqmapsdk.direction({
    mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
    //from参数不填默认当前地址
    from:'', //起点的坐标 String
    to: '',  //终点的坐标 String
    success: function (res) {
      console.log(res);
      var ret = res;
      var coors = ret.result.routes[0].polyline, pl = [];
      var distance=ret.result.routes[0].distance
      that.scalefuc(distance)
      //坐标解压（返回的点串坐标，通过前向差分进行压缩）
      var kr = 1000000;
      for (var i = 2; i < coors.length; i++) {
        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
      }
      //将解压后的坐标放入点串数组pl中
      for (var i = 0; i < coors.length; i += 2) {
        pl.push({ latitude: coors[i], longitude: coors[i + 1] })
      }
      console.log(pl)
      var len=pl.length
      //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
      that.setData({
        latitude:pl[0].latitude,
        longitude:pl[0].longitude,
        polyline: [{
          points: pl,
          color: '#32CD32',
          width: 6
        }],
        markers:[
          {
                     id: 0,
                     latitude: pl[0].latitude,
                     longitude: pl[0].longitude,
                     // 起点图标
                     iconPath: '../../../static/icon/start.png',
                     width:30,
                     height:40

                   },
                   {
                     id: 1,
                     latitude:  pl[len-1].latitude,
                     longitude: pl[len-1].longitude,
                     // 终点图标
                     iconPath: '../../../static/icon/end.png',
                     width:30,
                     height:40
                   },
                   
        ]
      })
    },
    fail: function (error) {
      console.error(error);
    },
    complete: function (res) {
      console.log(res);
    }
  });
},
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})