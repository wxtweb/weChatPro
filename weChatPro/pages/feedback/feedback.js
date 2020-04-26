// pages/feedback/feedback.js
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品|商家投诉",
        isActive: false
      }
    ],
    chooseimages:[],
    textvalue:"",
   
  },
  UpLoadImgs: [],
  onLoad: function (options) {

  },

  onShow: function () {

  },
  handleTabsItemChange(e) {
    //console.log(e.detail)
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false;
    })
    this.setData({ tabs })
  },
  handleChooseImg(){
    wx.chooseImage({
      count: 5,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success: (res)=> {
        this.setData({
          chooseimages:[...this.data.chooseimages, ...res.tempFilePaths]
        })
      }
    })
  },
  handleRemoveImg(e){
    let index=e.currentTarget.dataset
    console.log(index)
    let { chooseimages}=this.data;
    chooseimages.splice(index,1)
    this.setData({
      chooseimages
    })
  },
  handleTextInput(e){
    this.setData({
      textvalue:e.detail.value
    })
  },
  handleFormSubmit(){
    const { textvalue, chooseimages}=this.data
    if(!textvalue.trim()){
      wx.showToast({
        title: '请正确描述问题',
        icon:'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中...',
    })
    if(chooseimages.length!==0){
      chooseimages.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://img.coolcr.cn/index/api.html',
          filePath: v,
          name: 'image',
          formData: {},
          success: res => {
            console.log(res)
            if (i === chooseimages.length - 1) {
              wx.hideLoading()
              this.setData({
                textvalue: "",
                chooseimages: []
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      })
    }else{
      console.log('只有文本')
      wx.hideLoading()
      wx.navigateBack({
        delta:1
      })
    }
   
  }

})