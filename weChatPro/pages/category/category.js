import {request} from "../../request/index.js"
Page({
  data: {
    categorysList:[],
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },

  onLoad: function (options) {
    const Cates=wx.getStorageSync("cates");//取出存储在本地缓存中的data
    if(!Cates){             //无本地缓存数据
      this.getCategorys();  //获取分类数据
    }else{                  //有本地缓存数据
      if(Date.now()-Cates.time>1000*10){
        this.getCategorys();
      }else{
        this.categorysList=Cates.data   //获取缓存数据,并存入data中
        let leftMenuList=this.categorysList.map(i=>(i.cat_name));
        let rightContent=this.categorysList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }

    } 
  },

  //获取分类数据
  async getCategorys(){
    // request({url:"/categories"})
    // .then(result=>{
    //   this.categorysList=result.data.message;
    //   wx.setStorageSync("cates", {time:Date.now(), data:this.categorysList});  //将data数据存储到本地 
    //   let leftMenuList=this.categorysList.map(i=>i.cat_name);
    //   let rightContent=this.categorysList[0].children;
    //   this.setData({
    //     categorysList:result.data.message,
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    const result=await request({url:"/categories"});
    this.categorysList=result;
      wx.setStorageSync("cates", {time:Date.now(), data:this.categorysList});  //将data数据存储到本地 
      let leftMenuList=this.categorysList.map(i=>i.cat_name);
      let rightContent=this.categorysList[0].children;
      this.setData({
        categorysList:result,
        leftMenuList,
        rightContent
      })
  },

  //左侧菜单的点击事件
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent=this.categorysList[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })

  }
})