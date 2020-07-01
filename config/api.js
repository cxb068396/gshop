const ApiRootUrl = 'https://www.omeals.cn/home/'

// 购物车模块相关 api url
const shopcart = {
  AddCart: ApiRootUrl + 'ShopCar/addshopGood', //添加购物车
  GetShopCart: ApiRootUrl + 'ShopCar/getshopCar',//获得商品购物车接口
  ShopNum: ApiRootUrl + 'ShopCar/addshopCarNum', //确认商品的添加数量
  SaveShopNum: ApiRootUrl + 'ShopCar/saveshopCarNum',//商品数量保存接口
  OrderIndex: ApiRootUrl + 'order/index.html',//立即购买接口
  DelshopCar: ApiRootUrl +'/ShopCar/delshopCar.html',  // 删除订单
  CreateOrder: ApiRootUrl +'order/order.html'  // 创建订单

}

// 怎么吃模块相关  api url
const howeat = {
  howseason: ApiRootUrl + 'eat/index.html',   //怎么吃季节菜谱
}

// 优惠券模块相关  apu url
const myCoupon = {
  bindCode: ApiRootUrl + 'Coupon/couponCoin.html', //兑换码兑换优惠券
  showCoupon: ApiRootUrl + 'Coupon/showCoupon.html', //领取优惠券进去直接加载
  bindSave: ApiRootUrl + 'Coupon/getCoupon.html', //点击领取优惠券
  registerCoupon: ApiRootUrl + 'Coupon/showNewCoupon.html', //注册页面的优惠券
}
module.exports = {
  ...shopcart,
  ...howeat,
  ...myCoupon,
  WeXinLogin: ApiRootUrl + 'login/weixinlogin.html',//微信登陆接口
  IndexUrl: ApiRootUrl + 'main/index.html', //首页信息借口

  MainDetail: ApiRootUrl + 'main/detail.html',//商品详情接口

  GetUserInfo: ApiRootUrl + 'login/getuser.html',//获得用户信息接口
  AddressGetCity: ApiRootUrl + 'Address/getcity.html',//省市区的接口
  AddressAdd: ApiRootUrl + 'Address/addAddress.html', //添加地址
  AddressList: ApiRootUrl + 'Address/getAddress.html',//地址列表,
  DeleteAddress: ApiRootUrl + 'Address/deladdress.html',//删除地址
  EditAddress: ApiRootUrl + 'Address/editAddress.html',//修改地址
  AllOrder: ApiRootUrl + 'order/allorder.html', //全部订单
  Repay: ApiRootUrl + 'order/repay.html', //待付款订单重新发起支付
  DeleteOrder: ApiRootUrl + 'order/cancellation.html',//取消订单
  orderDetail:ApiRootUrl+'order/detail.html',//待收货详情
  orderCancel:ApiRootUrl+'/order/cancel.html',//待收货取消订单
  AbrogateDelete:ApiRootUrl+'/order/abrogate.html',//只允许售后完成，订单取消和交易关闭的订单删除
  buyAgain:ApiRootUrl+'/order/buy_again.html',//再次购买
  smsCode:ApiRootUrl+'sms/code.html', //获取验证码
  smsLogin:ApiRootUrl+'/login/smslogin.html' //手机号，验证码登录
}
