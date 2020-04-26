import { getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(){
    const address=wx.getStorageSync('address');
    const cart=wx.getStorageSync('cart')||[];

    this.setData({
      address
    })
    this.setCart(cart)
  },

  async handleChooseAdress() {
  
    try{
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      //console.log(scopeAddress)
      if (scopeAddress === false) {
        await openSetting()
      }
      let address = await chooseAddress()
      //console.log(address)
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address )
    }catch(error){
      console.log(error)
    }
    
  },
  handleItemChange(e) {
    const goods_id=e.currentTarget.dataset.id
    //console.log(goods_id)
    let {cart}=this.data
    let index=cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart)
  },
  handleItemAllChange() {
   // console.log('333')
    let {cart, allChecked}=this.data
    allChecked = !allChecked
    cart.forEach(v=>v.checked=allChecked)
    this.setCart(cart)
  },
  async handleItemNumEdit(e) {
    const { operation,id}=e.currentTarget.dataset
    //console.log(operation, id)
    let {cart}=this.data
    const index=cart.findIndex(v=>v.goods_id===id)
    //console.log(index)
    if(cart[index].num<=1&&operation===-1){
      
      const res=await showModal({content:'您确定要删除这件商品吗？'})
      if(res.confirm){
        cart.splice(index, 1)
        this.setCart(cart)
      } 
    }else{
      cart[index].num += operation
      this.setCart(cart)
    }
    
  },
  async handlePay() {
    const {address,totalNum}=this.data
    if(!address.userName){
      await wx.showToast({title:'收货地址为空'})
      return
    }
    if(totalNum===0){
      await showToast({ title: '无可结算商品' })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }




})