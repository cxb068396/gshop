// pages/my/myorder/assess/assess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 5,
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    img:'/pages/static/icon/pic.png',
    video:''
    // picList: [
    //   {
    //     images: '/pages/static/icon/movie.png',
    //     texts: '添加视频',
    //     operate: this.addVideo
    //   },
    //   {
    //     images: '/pages/static/icon/pic.png',
    //     texts: '添加图片',
    //     operate: this.addImage
    //   },
    //   {
    //     images: '/pages/static/icon/pic.png',
    //     texts: '添加图片'
    //   },
    // ],
    // textList: [
    //   {
    //     contain: '物流服务',
    //     // val: value1
    //   },
    //   {
    //     contain: '快递包装',
    //     // val: value2
    //   },
    //   {
    //     contain: '送货速度',
    //     // val: value3
    //   },
    //   {
    //     contain: '配送员服务',
    //     // val: value4
    //   }
    // ],
  },

  onLoad: function (options) {
    // ToDo 获取订单ID
  },

  onShow: function () { },

  // ToDo 请求后台接口，发布评价
  postEvaluation() {
    let data = {}

  },
 
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('prew_video');
},
//分别获取商品，物流服务，快递包装，送货速度，配送员服务的评分
  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },
  onChange1(event) {
    this.setData({
      value1: event.detail,
    });
  },
  onChange2(event) {
    this.setData({
      value2: event.detail,
    });
  },
  onChange3(event) {
    this.setData({
      value3: event.detail,
    });
  },
  onChange4(event) {
    this.setData({
      value4: event.detail,
    });
  },
  // 文本框
  getDataBindTap: function (e) {
    var information = e.detail.value;//输入的内容
    var value = e.detail.value.length;//输入内容的长度
    var that = this;
    that.setData({
      information: information,
      lastArea: value
    })
  },

  // 为评论添加图片
  addImage(e) {
    const index = e.currentTarget.dataset.index
    const options = {
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    }
    // app.promisic(wx.chooseImage)(options)
    //   .then(res => {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     var tempFilePaths = res.tempFilePaths
    //     if (tempFilePaths.length > 0) {
    //       this.data.picList[index].images = tempFilePaths[0]
    //       this.setData({ picList: this.data.picList })
    //     }
    //     // ToDo 调用接口，上传文件
    //   })
    //   .catch(err => { debugger })

    var that = this
    wx.chooseImage({
      ...options,
      success: function (res) {
        //console.log(res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths
        that.setData({
          img:tempFilePaths[0]
        })
        // if (tempFilePaths.length > 0) {
        //   that.data.picList[index].images = tempFilePaths[0]
        //   that.setData({ picList: that.data.picList })
        //   // ToDo 调用接口，上传文件
        // }
      },
      fail: function (err) { },
      complete: (res) => { },
    })
  },

  // 为评论添加视频
  addVideo() {
    var that=this
    // https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseVideo.html
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      compressed: true,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          video:res.tempFilePath
        })
        // app.upload(url,filePath).then().catch()
      }
    })
  },
 //删除视频
 deleteVideo(){
  this.setData({
    video:''
  })
 },
 //删除图片
 deleteImg(){
   console.log('1234')
  this.setData({
    img:'/pages/static/icon/pic.png'
  })
 },
})