// pages/my/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imagedizhi:'',
    isedit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = JSON.parse(options.st)
    that.setData({
      userInfo:data.userInfo
    })

    console.log(options)


 
  },
  // 清除昵称
  deletename:function(){
    var  that = this;
    var nickName = 'userInfo.username';
    that.setData({
      [nickName]:'',
    })
  },
  wanch:function(e){
    this.data.userInfo.username = e.detail.value;
  },
  changeParentData: function () {
    var pages =getCurrentPages();//当前页面栈
    if (pages.length >1) {
        var beforePage = pages[pages.length- 2];//获取上一个页面实例对象
        beforePage.changeData();//触发父页面中的方法
    }
},

//点击完成按钮
  wancheng:function(e){
    wx.showLoading({
      title: '正在上传',
    })
    var _this = this
 var nickName = this.data.userInfo.username
    if(nickName.length<=1){
      wx.showToast({
        title: '昵称过短',
        icon:'none'
      })
    return false
    }else if( nickName.length>16){
      wx.showToast({
        title: '昵称过长',
        icon:'none'
      })
    return false
    } else{
      var tempFilePath  = _this.data.userInfo.avatar
      var token = wx.getStorageSync('access_token') 
      var username = _this.data.userInfo.username  
      //判断是否是传入头像或者是头像和文字 
       if(_this.data.isedit){
        wx.uploadFile({
          url:'https://www.omeals.cn/home/login/edit.html', //图片上传至开发服务器接口
          filePath:tempFilePath,
          name: 'file',       
          header:{
           'content-type': 'multipart/form-data',
           // 'token':wx.getStorageSync('access_token'),  //如果需要token的话要传 
         },  
          formData: {
           username: username,
           token:token       
         },
          success(res) {
          wx.hideLoading()
         var res=JSON.parse(res.data)
         console.log(res)
            if(res.code==true){
                 wx.navigateBack({
                 delta: 1
               })
                      
     }
          }
        }) 
       }else{
        wx.request({
         url:'https://www.omeals.cn/home/login/edit.html',
            data:{
              token: wx.getStorageSync('access_token'),
              username: username,
            },
            method:'post',
            header:{"content-type":"application/x-www-form-urlencoded"},
             success:function(res){
                 wx.hideLoading()
                if(res.data.code==true){
                  wx.navigateBack({
                    delta: 1,
                  })
                }             
             }
           })
    
       }

     
    }
  },

  changeAvatar:function(){
    const _this = this;
    wx.showActionSheet({
      itemList: ['拍照', '从手机相册选择','保存到手机'],
      itemColor:'#888888',
      success: function(res) {
       if(res.tapIndex==0){
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['camera'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePath = res.tempFilePaths[0];             
            var avatar = 'userInfo.avatar';
            _this.setData({           
              [avatar]:tempFilePath,
              isedit:true       
            })                      
          }
        })


       }else if(res.tapIndex==1){

        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePath = res.tempFilePaths[0];
            // tempFilePath可以作为img标签的src属性显示图片        
            var avatar = 'userInfo.avatar';
            _this.setData({           
              [avatar]:tempFilePath,
              isedit:true       
            })  
          }
        })
       }else if(res.tapIndex==3){
// 把头像保存到相册
          // var that = this
          // var value = that.data.tempFilePath;// 你的图片路径
          // if (value != undefined && value != "") {
          //   wx.saveImageToPhotosAlbum({
          //     filePath: value,
          //     success: (res) => {
          //       that.hideModal();
          //       that.hideMoments();
          //       wx.showToast({
          //         title: "已保存到相册",
          //         icon: 'none',
          //         duration: 2000,
          //         mask: true
          //       })
          //     },
          //     fail: function (res) {
          //       console.error(res)
          //         //首次保存会询问你是否授权，选是就好了
          //       // if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
          //       console.error("打开设置窗口");
          //       wx.openSetting({
          //         success(settingdata) {
          //           console.error(settingdata)
          //           if (settingdata.authSetting["scope.writePhotosAlbum"]) {
          //             console.error("获取权限成功，再次点击图片保存到相册")
          //           } else {
          //             console.error("获取权限失败")
          //           }
          //         }
          //       })
          //       // }
          //     }
          //   })
          // }
        
     
       }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })





   
    
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