//index.js
//获取应用实例
var api = require('../../config/api.js');
const app = getApp()
Page({
  data: {
    page: 0,
    flag: true,
    userInfo: {
      avatarUrl: "", //用户头像
      nickName: "", //用户昵称
    },
    imgsrc: [],
    currentItem: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var page = that.data.page
    // wx.request({
    //   url: api.IndexUrl,
    //   data: {
    //     page: page
    //   },
    //   success: function (res) {
    //     var str = res.data.mes;
    //     console.log(str)
    //     for (let index = 0; index < str.length; index++) {
    //       const element = 'https://www.omeals.cn/Uploads/files/' + str[index].main_images;
    //       str[index].main_images = element
    //     }
    //     that.setData({
    //       imgsrc: str
    //     })
    //   }
    // })

    this.loadList()

  },

  loadList(){
    app.request(api.IndexUrl,undefined,{page: this.data.page})
    .then(data => {
      data.forEach(item => {
        item.main_images = 'https://www.omeals.cn/Uploads/files/' + item.main_images;
      })
      this.setData({imgsrc: data})
    })
  },

  //加入购物车
  pushchat(e) {

    var token = wx.getStorageSync('access_token') 
    var id = e.currentTarget.dataset.id;
    this.setData({
      currentItem:id
    })
    app.request(api.AddCart,'post',{num: 1,specs_id: id,token:token})
    .then(data => {
      wx.showToast({'title': data})
      this.setData({
        currentItem:''
      })
    })
    .catch(err => {
      wx.showToast({'title': err.mes || '添加购物车失败'})
      this.setData({
        currentItem:''
      })
    })
  },


  // 查询搜索的接口方法
  a: function () {

  },

  toshopbap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shopto/shopwt?id=' + id,
      success: function () {
        console.log('跳转成功')
      }
    })
  }
})