// pages/my/myorder/logisticstest/logisticstest.js
// 引入SDK核心类
var QQMapWX = require('../../../../lib/qqmap/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: '2BPBZ-FER6U-27NVW-2HKMK-EKAI2-G7FWT' // 必填
});
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    scale:5
  },
  scalefuc(distance){
 //5级 ：200公里
// 6级 ：100公里
// 7级 ：50公里
// 8级 ：30公里
// 9级 ：20公里
// 10级 ：10公里
// 11级 ：5公里
// 12级 ：2公里
// 13级 ：1公里
// 14级 ：500米
// 15级 ：200米
// 16级 ：100米
// 17级 ：50米
// 18级 ：25米
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
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: e.detail.value.start,
      to: e.detail.value.dest, 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = []; 
        var distance=ret.result.routes[0].distance
        _this.scalefuc(distance)
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
        _this.setData({
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