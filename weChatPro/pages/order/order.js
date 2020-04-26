import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "待收货",
        isActive: false
      },
      {
        id: 4,
        value: "待评价",
        isActive: false
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const token=wx.getStorageSync("token")
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return
    }
    let pages=getCurrentPages()
    console.log(pages)
    let currentPage = pages[pages.length-1]
    console.log(currentPage.options)
    const {type}=currentPage.options
    this.getOrders(type)
    this.changeTitleByIndex(type-1)
  },
  async getOrders(type){
    const res = await request({ url: "/my/orders/all", data:{type}})
    console.log(res)
    this.setData({
      orders: res.orders.map(v =>( { ...v, create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })

  },
  changeTitleByIndex(index){
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    })
    this.setData({ tabs })
  },
  handleTabsItemChange(e) {
    //console.log(e.detail)
    const { index } = e.detail;
    this.changeTitleByIndex(index)
    this.getOrders(index+1)
  },
  
})