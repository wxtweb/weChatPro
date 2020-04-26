import { login} from "../../utils/asyncWx.js"
import { request } from "../../request/index.js"
Page({

  data: {

  },

  onLoad: function (options) {

  },
  async handlegetUserInfo(e) {
    //console.log(e)
    try{
      const { encryptedData, iv, rawData, signature } = e.detail
      const { code } = await login()
      console.log(code)
      const loginParams = { encryptedData, iv, rawData, signature, code }
      //const { token } = await request({ url: '/users/wxlogin', method: "post",data: loginParams })
      const { token } = { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"}
      console.log(token)
      wx.setStorageSync("token", token)
      wx.navigateBack({
        delta: 1
      })
    }catch(err){
      console.log(err)
    }
  }
})