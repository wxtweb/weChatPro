import {request} from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    isCollect:false,
  },
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    //console.log(options)
    let pages=getCurrentPages()
    let currentPage=pages[pages.length-1]
    const options=currentPage.options
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  async getGoodsDetail(goods_id) {
    const goodsDetail =await request({url:'/goods/detail', data:{goods_id}})
    console.log(goodsDetail)
    this.goodsInfo=goodsDetail;

    let collect = wx.getStorageSync("collect") || []
    let isCollect = collect.some(v => { v.goods_id === this.goodsInfo.goods_id })

    this.setData({
      goodsDetail:{
        pics:goodsDetail.pics,
        goods_price: goodsDetail.goods_price,
        goods_name: goodsDetail.goods_name,
        goods_introduce: goodsDetail.goods_introduce.replace(/\.webp/g,'.jpg'),
        isCollect
      }
    })
  },
  handlePreviewImage(e) {
    //console.log('e')
    const urls=this.goodsInfo.pics.map(v=>v.pics_big);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  handleCollect(){
    let isCollect = false
    let collect=wx.getStorageSync("collect")||[]
    let index=collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(index!==-1){
      collect.splice(index, 1)
      isCollect=false
      wx.showToast({
        title: '取消收藏',
      })
    }else{
      collect.push(this.goodsInfo)
      isCollect=true
      wx.showToast({
        title: '收藏成功',
      })
    }
    wx.setStorageSync("collect", collect)
    this.setData({
      isCollect
    })
  },
  handleCartAdd() {
    //console.log('购物车')
    let cart=wx.getStorageSync('cart')||[];
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      this.goodsInfo.num=1;
      this.goodsInfo.checked=true;
      cart.push(this.goodsInfo);
      wx.showToast({
        title: '商品添加成功',
      })
    }else{
      cart[index].num++;
      wx.showToast({
        title: '商品数量增加',
      })
    }
    wx.setStorageSync("cart", cart)
    
  }
  
})