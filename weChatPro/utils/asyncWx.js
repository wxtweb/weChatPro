export const getSetting=()=>{
  return new Promise((res,rej)=>{
    wx.getSetting({
      success: result => {
        res(result)
      },
      fail: err => {
        rej(err)
      }
    })
  })
}

export const chooseAddress = () => {
  return new Promise((res, rej) => {
    wx.chooseAddress({
      success: result => {
        res(result)
      },
      fail: err => {
        rej(err)
      }
    })
  })
}

export const openSetting = () => {
  return new Promise((res, rej) => {
    wx.openSetting({
      success: result => {
        res(result)
      },
      fail: err => {
        rej(err)
      }
    })
  })
}

export const showModal = ({content}) => {
  return new Promise((resolve, rej) => {
    wx.showModal({
      title: '商品删除',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: err => {
        rej(err)
      }
    })
  })
}

export const showToast = ({title}) => {
  return new Promise((resolve, rej) => {
    wx.showToast({
      title: title,
      duration: 2000,
      success: (res) => {
        resolve(res)
      },
      fail: err => {
        rej(err)
      }
    })
  })
}

export const login = () => {
  return new Promise((resolve, rej) => {
    wx.login({
      timeout: 10000,
      success: result => {
        resolve(result)
      },
      fail: err => {
        rej(err)
      }
    })
  })
}

export const requestPayment = (pay) => {
  return new Promise((resolve, rej) => {
   wx.requestPayment({
    ...pay,
     success: result => {
       resolve(result)
     },
     fail: err => {
       rej(err)
     }
   })
  })
}