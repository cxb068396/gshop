// pages/Shopcart/Shopcart.js
var api = require('../../config/api.js');
var app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    hasList: false,
    totalPrice: 0,
    selectAllStatus: false,
    Mstart: '',  //记录左滑开始的位置
    index: '',   //记录左滑的元素
    checkbox_goodsid: '',
    delList: [],
    address: '',
    showDialog:false,
    //测试sku数据开始
    firstIndex:-1,
    commodityAttr: [
      {
        priceId: 1,
        price: 35.0,
        "stock": 8,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "2"
          },
          {
            "attrKey": "颜色",
            "attrValue": "白色"
          },
          {
            "attrKey": "大小",
            "attrValue": "小"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "S"
          }
        ]
      },
      {
        priceId: 2,
        price: 35.1,
        "stock": 9,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "黑色"
          },
          {
            "attrKey": "大小",
            "attrValue": "小"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "M"
          }
        ]
      },
      {
        priceId: 3,
        price: 35.2,
        "stock": 10,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "绿色"
          },
          {
            "attrKey": "大小",
            "attrValue": "大"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "L"
          }
        ]
      },
      {
        priceId: 4,
        price: 35.2,
        "stock": 10,
        "attrValueList": [
          {
            "attrKey": "型号",
            "attrValue": "1"
          },
          {
            "attrKey": "颜色",
            "attrValue": "绿色"
          },
          {
            "attrKey": "大小",
            "attrValue": "大"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "L"
          },
          {
            "attrKey": "尺寸",
            "attrValue": "L"
          }
        ]
      }
    ],
    attrValueList: []
    //测试sku数据结束

  },
  // 价格调用该方法
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;     // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

  /* 点击减号或加号 */
  bindModifyQuantity: function (e) {
    const { index, key } = e.currentTarget.dataset;
    let carts = this.data.carts;
    let num = parseFloat(carts[index].num);
    let flag = 1

    if (key === 'minus') {
      if (num <= 1) {
        return false;
      }
      num = num - 1;
      flag = -1
    } else if (key === 'add') {
      if(num>=999){
        wx.showToast({
          title: '数量限制',
          icon:'nne'
        })
        return false
      }
      num = num + 1
      flag = 1
    }

    carts[index].num = num;

    this.modifyGoodsQuantity(flag, carts[index].id)
    this.getTotalPrice()
  },

  /* 输入框事件 */
  bindManual: function (e) {
    var that = this
    let numa = e.detail.value
    if (numa == '' || numa == 0) {
      numa = 1;
    }
    if (numa>999) {
      numa=999;
      wx.showToast({
        title: '数量限制',
        icon:'none'
      })
    }
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = numa
    carts[index].num = parseFloat(num);

    let data = {
      num: numa,
      specs_id: carts[index].id,
    }
    app.request(api.SaveShopNum, 'post', data)
      .then(() => { })
    this.getTotalPrice()
  },

  // 请求接口 改变购物车内某一商品的数量
  modifyGoodsQuantity(num, id) {
    const data = {
      num,
      specs_id: id,
    }
    app.request(api.ShopNum, 'post', data)
      .then(() => { })
  },

  // 触摸开始
  touchstart: function (e) {
   // console.log(e);
    this.setData({
      Mstart: e.changedTouches[0].pageX,      //开始触摸时的横坐标
      index: e.currentTarget.dataset.index,
    })
  },

  // 开始滑动
  touchmove: function (e) {
    let that = this;
  //  console.log(e);
    let list = that.data.carts;
    // 计算滑动的距离
    let moveL = that.data.Mstart - e.changedTouches[0].pageX;
    console.log(moveL)

    list[that.data.index].left = moveL > 0 ? -moveL : 0;

    that.setData({
      carts: list,
    })
  },

  // 滑动结束 触摸结束
  touchend: function (e) {
    let that = this;
   // console.log(e);
    let list = that.data.carts;
    let lastMoveL = that.data.Mstart - e.changedTouches[0].pageX; //最终移动的距离

    list[that.data.index].left = lastMoveL > 100 ? -180 : 0;

    this.setData({
      carts: list,
    })
  },

  // 删除操作
  scrollDel(e) {
    let modalOptions = {
      title: '确认',
      content: '您确定要删除购物车中的商品？',
      confirmColor: '#F3BD56',
      cancelColor: '#e46d0c',
    }
    let _id = e.currentTarget.dataset.id;
    let list = this.data.carts;
    app.promisic(wx.showModal)(modalOptions)
      .then(({ confirm }) => {
        if (confirm) {
          app.request(api.DelshopCar, undefined, { skuid: _id })
            .then(() => { })
            .catch(err => {
              wx.showToast({
                title: err.mes,
                icon: 'success',
              })
            })
          list = list.filter((item) => {
            return item.id != _id
          });
          this.setData({
            carts: list
          })
          this.getcartlist()
        }

      })
  },

  //删除  外面的
  async deleteList(e) {
    console.log(e)
    var checkbox_goodsids = this.__data__.carts;
    var goodsids = checkbox_goodsids.map(function (v) { return v.id; });
    var checkbox_goodsid = goodsids.join(",")
    console.log(checkbox_goodsid)
    console.log('点击删除选中的商品id' + checkbox_goodsid)
    if (checkbox_goodsid === '') {
      wx.showToast({
        title: '您尚未选中商品',
        duration: 2000,
        icon: 'none'
      })
    } else {
      const modalOptions = {
        title: '确认',
        content: '您确定要删除购物车中的商品？',
        confirmColor: '#F3BD56',
        cancelColor: '#e46d0c',
      }
      
      const { confirm } = await app.promisic(wx.showModal)(modalOptions)
      if(confirm){
        const data = await app.request(api.DelshopCar, undefined, { skuid: checkbox_goodsid })
        if(data === '删除成功！'){
          this.getcartlist()
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getcartlist();
    // this.getTotalPrice();
  },

  // 进去页面时请求购物车数据
  getcartlist() {
    app.request(api.GetShopCart)
      .then(({ goods, address }) => {
        if (!goods && goods.length > 0) {
          return
        } else {
          goods.forEach(item => {
            item.image = 'https://www.omeals.cn/Uploads/files/' + item.main_images;
            item.title = item.name;
            item.id = item.id;
            item.num = item.product_num;
            item.price = parseFloat(item.sell_price);
            item.activity = item.description;
            item.selected = false
          })
          this.setData({
            hasList: true, 
            selectAllStatus:false,
            carts: goods,
            totalPrice:0,
            address
          })
        }
      })
      .catch(err => {
        if (err.mes == '购物车空空如也，快去添加商品吧') {
          this.setData({
            carts: [],
            hasList: false
          })
        } else if (err.mes == '请先新增您的收货地址！') {
          app.promisic(wx.showModal)({
            title: '提示',
            content: '请先填写你的收货地址',
          })
            .then(({ confirm }) => {
              if (confirm) {
                wx.navigateTo({
                  url: '/pages/my/setup/address/address',
                })
              }
            })
            this.setData({
              address:'',
              hasList:false
            })
        }
      })
  },

  onShow() {
    // this.getcartlist()
    this.getcartlist();
   // this.getTotalPrice();

   /**测试数据的逻辑运算开始 */
   this.setData({
    includeGroup: this.data.commodityAttr
  });
  this.distachAttrValue(this.data.commodityAttr);
  // 只有一个属性组合的时候默认选中
  // console.log(this.data.attrValueList);
  if (this.data.commodityAttr.length == 1) {
    for (var i = 0; i < this.data.commodityAttr[0].attrValueList.length; i++) {
      this.data.attrValueList[i].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue;
    }
    this.setData({
      attrValueList: this.data.attrValueList
    });
  }
    /**测试数据的逻辑运算end */
  },

  // 单选中购物车的时候
  checkboxChange: function (e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    var selectedstatus=carts.every(item=>{
      return item.selected == true
    }
      )
   if(selectedstatus){
     this.setData({
      selectAllStatus: true
     })
   }else{
    this.setData({
      selectAllStatus: false
     })
   }
    this.setData({
      carts: carts,
    });
    this.getTotalPrice();

  },

  // 全选获取总价格
  checkboxChangeAll: function (e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    console.log(carts)
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  // 结算跳转页面
  tosettlement: function (e) {
    if (this.data.totalPrice == '0.00') {
      wx.showToast({
        title: '请选择商品',
        image: "../static/icon/icon_error.png",
        duration: 2000
      });
      return 
    }
     var that = this
     var token = wx.getStorageSync('access_token')
     let carts = that.data.carts;
     console.log(token)
     let datall = that.data;
     let totalPrice = that.data.totalPrice
     // 循环购物车，查看是否有选中的商品。没有的话提示
     var id;
     var num;
     console.log(carts)
 //结算商品，循环购物车所有的商品，找到选中的商品，把商品数据和总金额传给结算页面
       var product = {}
       for (let i = 0; i < carts.length; i++) {
         if (carts[i].selected) {
           var sty = carts[i].id
           var valu = carts[i].num
           product[sty] = valu
         }
       }
       var str = {
         // token: token,
         formcart: 1,
         product: product
       }
       // console.log(str)
 
       app.request(api.OrderIndex, undefined, str)
         .then(data => {
        console.log(data)
           wx.navigateTo({
             url: '../Shopcart/settlement/ettlement?str=' + JSON.stringify(data),
           })
         })
         .catch(err => {
           wx.navigateTo({
             url: '../Shopcart/settlement/ettlement?str=' + JSON.stringify(str),
           })
         })
 
     

  },

  toaddress: function () {
    wx.navigateTo({
      url: '/pages/my/setup/address/address',
      success: function () {
        console.log('成功')
      }
    })
  },

//显示sku选择
toggleDialog(){
  this.setData({
    showDialog:!this.data.showDialog
  })
 if(this.data.showDialog){
   wx.hideTabBar()
 }else{
   wx.showTabBar()
 }
},
//关闭按钮的点击事件
closeDialog(){
  this.setData({
    showDialog:false
  })
  wx.showTabBar()
},
  onShareAppMessage: function () { },



  /**数据逻辑运算start  这里是对获取的数据进行一系列的逻辑处理*/
  /* 获取数据 */
  distachAttrValue: function (commodityAttr) {
    /**
      将后台返回的数据组合成类似
      {
        attrKey:'型号',
        attrValueList:['1','2','3']
      }
    */
    // 把数据对象的数据（视图使用），写到局部内
    var attrValueList = this.data.attrValueList;
    // 遍历获取的数据
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
        // console.log('属性索引', attrIndex); 
        // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置
        if (attrIndex >= 0) {
          // 如果属性值数组中没有该值，push新值；否则不处理
          if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
            attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
          }
        } else {
          attrValueList.push({
            attrKey: commodityAttr[i].attrValueList[j].attrKey,
            attrValues: [commodityAttr[i].attrValueList[j].attrValue]
          });
        }
      }
    }
    // console.log('result', attrValueList)
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].attrValueStatus) {
          attrValueList[i].attrValueStatus[j] = true;
        } else {
          attrValueList[i].attrValueStatus = [];
          attrValueList[i].attrValueStatus[j] = true;
        }
      }
    }
    this.setData({
      attrValueList: attrValueList
    });
  },
  getAttrIndex: function (attrName, attrValueList) {
    // 判断数组中的attrKey是否有该属性值
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrName == attrValueList[i].attrKey) {
        break;
      }
    }
    return i < attrValueList.length ? i : -1;
  },
  isValueExist: function (value, valueArr) {
    // 判断是否已有属性值
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i] == value) {
        break;
      }
    }
    return i < valueArr.length;
  },
  /* 选择属性值事件 */
  selectAttrValue: function (e) {
    /*
    点选属性值，联动判断其他属性值是否可选
    {
      attrKey:'型号',
      attrValueList:['1','2','3'],
      selectedValue:'1',
      attrValueStatus:[true,true,true]
    }
    console.log(e.currentTarget.dataset);
    */
    var attrValueList = this.data.attrValueList;
    var index = e.currentTarget.dataset.index;//属性索引
    var key = e.currentTarget.dataset.key;
    var value = e.currentTarget.dataset.value;
    if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
      if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
        // 取消选中
        this.disSelectValue(attrValueList, index, key, value);
      } else {
        // 选中
        this.selectValue(attrValueList, index, key, value);
      }
 
    }
  },
  /* 选中 */
  selectValue: function (attrValueList, index, key, value, unselectStatus) {
    // console.log('firstIndex', this.data.firstIndex);
    var includeGroup = [];
    if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选
      var commodityAttr = this.data.commodityAttr;
      // 其他选中的属性值全都置空
      // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus);
      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
          attrValueList[i].selectedValue = '';
        }
      }
    } else {
      var commodityAttr = this.data.includeGroup;
    }
 
    // console.log('选中', commodityAttr, index, key, value);
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
          includeGroup.push(commodityAttr[i]);
        }
      }
    }
    attrValueList[index].selectedValue = value;
 
    // 判断属性是否可选
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = false;
      }
    }
    for (var k = 0; k < attrValueList.length; k++) {
      for (var i = 0; i < includeGroup.length; i++) {
        for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
          if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
            for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
              if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                attrValueList[k].attrValueStatus[m] = true;
              }
            }
          }
        }
      }
    }
    // console.log('结果', attrValueList);
    this.setData({
      attrValueList: attrValueList,
      includeGroup: includeGroup
    });
 
    var count = 0;
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].selectedValue) {
          count++;
          break;
        }
      }
    }
    if (count < 2) {// 第一次选中，同属性的值都可选
      this.setData({
        firstIndex: index
      });
    } else {
      this.setData({
        firstIndex: -1
      });
    }
  },
  /* 取消选中 */
  disSelectValue: function (attrValueList, index, key, value) {
    var commodityAttr = this.data.commodityAttr;
    attrValueList[index].selectedValue = '';
 
    // 判断属性是否可选
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = true;
      }
    }
    this.setData({
      includeGroup: commodityAttr,
      attrValueList: attrValueList
    });
 
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrValueList[i].selectedValue) {
        this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
      }
    }
  },
  /* 点击确定 */
  submit: function () {
    var value = [];
    for (var i = 0; i < this.data.attrValueList.length; i++) {
      if (!this.data.attrValueList[i].selectedValue) {
        break;
      }
      value.push(this.data.attrValueList[i].selectedValue);
    }
    if (i < this.data.attrValueList.length) {
      wx.showToast({
        title: '请完善属性',
        icon: 'loading',
        duration: 1000
      })
    } else {
      var valueStr = "";
      for(var i = 0;i < value.length;i++){
        console.log(value[i]);
        valueStr += value[i]+",";
      }
      wx.showModal({
        title: '提示',
        content: valueStr,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })  
      console.log(valueStr);
    }
  },
/**逻辑运算结束 */

})