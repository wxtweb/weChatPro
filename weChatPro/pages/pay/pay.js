import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js"

import { request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    cart=cart.filter(v=>v.checked)

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  async handleCreateOrder(){
    try{

      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
        return
      }
      const header = { Authorization: token }
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      const goods = []
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods }
      //const {order_number} = await request({ url: "/my/orders/create", methods: "POST", data: orderParams, header})
      const { order_number } = { order_number: "HMDD20190802000000000422" }
      //console.log(order_number)
      //const {pay} = await request({ url: "/my/orders/req_unifiedorder", methods:"POST", header, data: { order_number }})
      const { pay } = {
        pay: {
          "timeStamp": "1564730510",
          "nonceStr": "SReWbt3nEmpJo3tr",
          "package": "prepay_id=wx02152148991420a3b39a90811023326800",
          "signType": "MD5",
          "paySign": "3A6943C3B865FA2B2C825CDCB33C5304"
        }
      }

      await requestPayment(pay)
      const res = await request({ url: "/my/orders/chkOrder", methods: "POST", header, data: { order_number } })
      await showToast({ title: "支付成功！" })
      let newCart=wx.getStorageSync("cart")
      newCart=newCart.filter(v=>!v.checked)
      wx.setStorageSync("cart", newCart)
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }catch(err){
      await showToast({title:"支付失败！"})
    }



  }


})