//Page Object
import {request} from "../../request/index.js"
Page({
  data: {
    //轮播图数组
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });
    this.getSwiperList();   //调用获取轮播图数据
    this.getCatesList();    //调用获取分类导航数据
    this.getFloorList();    //获取楼层商品数据
  },

  //获取轮播图数据
  async getSwiperList() {
    // request({url:"/home/swiperdata"})
    // .then(result=>{
    //   this.setData({
    //     swiperList:result.data.message
    //   })
    // })
    const result=await request({url:"/home/swiperdata"})
    result.forEach(v => { v.navigator_url = v.navigator_url.replace("main","goods_detail")})
    this.setData({
      swiperList:result
    })
  },

  //获取分类导航数据
  async getCatesList() {
    // request({url:"/home/catitems"})
    // .then(result=>{
    //   this.setData({
    //     catesList:result.data.message
    //   })
    // })
    const result=await request({url:"/home/catitems"})
    this.setData({
      catesList:result
    })
  },

  //获取楼层商品数据
  async getFloorList() {
    // request({url: "/home/floordata"})
    // .then(result=>{
    //   this.setData({
    //     floorList:result.data.message
    //   })
    // })
    const result=await request({url: "/home/floordata"})
    this.setData({
      floorList:result
    })
  }



});
  