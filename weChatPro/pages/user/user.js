// pages/user/user.js
Page({
  data: {
    userinfo:{},
    collectNum:0,
  },

  onShow: function (options) {
    const userinfo=wx.getStorageSync("userinfo")
    const collect=wx.getStorageSync("collect")||[]
    //console.log(userinfo)
    let collectNum = collect.length
    console.log(collectNum)
    this.setData({
      userinfo,
      collectNum
    })
  },







})