import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    goodsList: [],
    totalPages:1,
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  //totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid||"";
    //this.QueryParams.query = options.query;
    this.getGoodsList();
  },
  handleTabsItemChange(e) {
    //console.log(e.detail)
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>{
      i===index?v.isActive=true:v.isActive=false;
    })
    this.setData({tabs})
  },
  async getGoodsList(){
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
  
    });
    //console.log(res);
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    //console.log(this.totalPages)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods],
      totalPages:this.totalPages,
    }),
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    //console.log('页面触底')
    if(this.QueryParams.pagenum >= this.totalPages){
      //console.log('我也是有底线的')
      wx.showToast({
        title: '没有更多的数据了',
      })
    }else{
      //console.log('还有下一页数据')
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },
  onPullDownRefresh() {
    console.log('下拉刷新');
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList()
  },
 
})