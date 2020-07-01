// pages/my/myorder/drawback/drawback.js

//获取应用实例  
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picList: [
      { 
        images: '/pages/static/icon/pic.png',
        texts: '上传凭证'
      },
      {
        images: '/pages/static/icon/pic.png',
        texts: '上传凭证'
      },
      {
        images: '/pages/static/icon/pic.png',
        texts: '上传凭证'
      },
    ],
    hiddenmodalput: true,  //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框

    radioOptions: [{ text: '未收到货', selected: false }, { text: '已收到货', selected: true }],
    radioOptions1: [{ text: '商品破损', selected: false }, { text: '商品缺失', selected: true }],

    goodsStatus: '',   // 货物状态
    refundReason: '',  // 退款原因
   
  },



  // 跳转至交易关闭页面（选择货物状态）
  chooseGoodsStatus: function () {
    let options = {
      title: '货物状态',
      radioOptions: this.data.radioOptions,
    }

    app.promisic(wx.ysShop.showRadioModal)(options)
      .then(({ index, radioOptions }) => {
        this.setData({ radioOptions, goodsStatus: radioOptions[index].text })
      })
      .catch(err => {
        if (err.msg === 'error') {

        }
      })
  },

  // 选择退款原因
  chooseRefundReason() {
    let options = {
      title: '退款原因',
      radioOptions: this.data.radioOptions1,
    }

    app.promisic(wx.ysShop.showRadioModal)(options)
      .then(({ index, radioOptions }) => {
        this.setData({ radioOptions1: radioOptions, refundReason: radioOptions[index].text })
      })
      .catch(err => {
        if (err.msg === 'error') {

        }
      })
  },

  //点击按钮弹出指定的hiddenmodalput弹出框
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  onLoad: function (options) {
    this.data.orderId = options.orderId
    // ToDo 获取退款数据

    this.data.radioOptions.forEach(item => { if (item.selected) { this.setData({ goodsStatus: item.text }) } })
    // this.data.radioOptions1.forEach(item => { if(item.selected){this.setData({refundReason: item.text})}})
  },

  // ToDo 调用接口，提交退款申请
  commitRefund() {

  },

  // 调用wx api，实现图片上传功能
  chooseImg(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    const options = {
      count: 3, // 默认9
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
        var tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length > 0) {
          that.data.picList[index].images = tempFilePaths[0]
          that.setData({ picList: that.data.picList })
          // ToDo 调用接口，上传文件
  
        }
      },
      fail: function (err) { },
      complete: (res) => { },
    }) 
   
  },
//上传多张图片
imagesUpload(){
  //在上传图片之前先得判断piclist的数组中的图片是否选中的图片，，将没有选中的图片删除
  var picList=this.data.picList.filter(function(item){
     return item.images.match(/http/)
  })
  for (var i = 0; i < picList.length; i++) {
    var imgUrl = picList[i].images;
    wx.uploadFile({
      //上传图片的网路请求地址
      url: url,
      //选择
      filePath: imgUrl,
      name: 'file',

      success: function (res) {
        console.log("success");
      },

      fail: function (res) {
        console.log("error");
      }
    });
  }
},
  // 跳转至退款成功页面
  todrawbacksuccess: function () {
    wx.navigateTo({
      url: `/pages/my/myorder/detail/detail?orderId=${this.data.orderId}`,
    })
  },

  //删除照片
  deleteiImg(e){
    var currIndex = e.currentTarget.dataset.index
    let images = this.data.picList
    images[currIndex].images='/pages/static/icon/pic.png',
    images[currIndex].texts='上传凭证'
    this.setData({
      // imgListUrlsCp: images,
      picList:images,

    })
  }
})