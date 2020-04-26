import {request} from "../../request/index.js"
Page({

  data: {
    goods:[],
    noneValue:false,
  },
  TimeId:-1,
  onLoad: function (options) {

  },
  onShow: function () {

  },
  handleinput(e){
    const {value}=e.detail
    //console.log({value})
    if(!value.trim()){return}

    clearTimeout(this.TimeId)
    this.TimeId=setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  async qsearch(query){
    const goods = await request({ url:'/goods/search', data:{query}})
    console.log(goods)
    this.setData({
      goods
    })
  },
  handleCancel(){
    wx.navigateBack({
      delta:1
    })
  }
  
})