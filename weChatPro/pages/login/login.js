// pages/login/login.js
Page({

  data: {

  },

  onLoad: function (options) {

  },
  handlegetUserInfo(e){
    //console.log(e)
    const {userInfo}=e.detail
    console.log({userInfo})
    wx.setStorageSync("userinfo", userInfo)
    wx.navigateBack({
      delta:1
    })
  }
})