let ajaxTimes=0;
export const request=(params)=>{
  let header={...params.header}
    if(params.url.includes("/my/")){
      header["Authorization"]=wx.getStorageSync("token")
    }

    ajaxTimes++;
    wx.showLoading({
      title: '拼命加载中',
      mask: true
    })
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject)=>{
        var reqTask = wx.request({
           ...params,
           header:header,
           url:baseUrl+params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
              ajaxTimes--;
              if(ajaxTimes===0) {
                wx.hideLoading()
              }
            }
        });
          
    })
}