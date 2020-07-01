

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: ['春季','番茄炒鸡蛋'],
    hotList:['夏季','鸡蛋','黑米'],
    inputValue: null,
    resultList:[
      {
        id: "4",
        main_images: "https://www.omeals.cn/Uploads/files/20200615/5ee72993dc769.jpg",
        title: "绿壳富硒鸡蛋"
      },
      {
        id: "4",
        main_images: "https://www.omeals.cn/Uploads/files/20200615/5ee72993dc769.jpg",
        title: "绿壳富硒鸡蛋"
      },
      {
        id: "4",
        main_images: "https://www.omeals.cn/Uploads/files/20200615/5ee72993dc769.jpg",
        title: "绿壳富硒鸡蛋"
      },
      {
        id: "4",
        main_images: "https://www.omeals.cn/Uploads/files/20200615/5ee72993dc769.jpg",
        title: "绿壳富硒鸡蛋"
      },
      {
        id: "4",
        main_images: "https://www.omeals.cn/Uploads/files/20200615/5ee72993dc769.jpg",
        title: "绿壳富硒鸡蛋"
      },
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'historySearch',
      success(res) {
        that.setData({
          historyList: res.data
        })
      }
    })
  },
  blur: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    this.search();
  },
  search:function(){
  //ToDo 获取关键词进行请求
  },
  save: function () {
    var list = this.data.historyList;
    if (list.indexOf(this.data.inputValue) == -1 & this.data.inputValue != '') {
      list.push(this.data.inputValue);
    }
    this.setData({
      historyList: list
    })
    wx.setStorage({
      key: 'historySearch',
      data: list
    })
    
  },
  searchName: function (e) {
    this.setData({
      inputValue: e.currentTarget.dataset.value
    })
    this.search();
  },
  remove: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认清空所有记录？',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'historySearch',
            success() {
              that.setData({
                historyList: []
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  clean:function(){
     var that=this
    setTimeout(function () {
      that.setData({
        inputValue: '',

      })
    },100)
  },
  detail: function (e) {
    this.save();
   //ToDo跳转到详情页

  }
})