import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
//将HTTP类实例化才可使用
let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //通过setData可以在data里添加classicData，但建议在data里先设置一个空值的classicData，不设置也不会报错
    classicData:null,

    //nav组件相关数据
    latest:true,
    first:false,
    title:'',
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传一个箭头函数作为参数给getLatest，在getLatest请求成功后执行（可达到将res传过来的效果）
    classicModel.getLatest((res)=>{
      // setData的作用：如果data里没有classicData，先把classicData添加到了data里，再给他设置值；如果有，直接设置值
      this.setData({  
        classicData:res, //绑定数据,wxml中可以使用此数据
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },   

  onLike:function(e){
    likeModel.likeCancel(e.detail.behavior,this.data.classicData.id,this.data.classicData.type);
  },

  // //点击右箭头向上一期翻页
  // onPrev:function(){
  //   let index=this.data.classicData.index
  //   classicModel.getPrev(index,(res)=>{
  //     this.setData({  
  //       classicData:res,
  //       first:classicModel.isFirst(res.index),
  //       latest:classicModel.isLatest(res.index)
  //     })
  //   });
  // },
  // //点击左箭头向下一期翻页
  // onNext:function(){
  //   let index=this.data.classicData.index
  //   classicModel.getNext(index,(res)=>{
  //     this.setData({  
  //       classicData:res ,
  //       first:classicModel.isFirst(res.index),
  //       latest:classicModel.isLatest(res.index)
  //     })
  //   });
  // },

  //如下三段代码为上面注释代码的封装
  onPrev:function(){
    this._classicUpdate('previous')
  },
  onNext:function(){
    this._classicUpdate('next')
  },
  _classicUpdate(prevOrNext){
    let index=this.data.classicData.index
    classicModel.getPrevOrNext(index,prevOrNext,(res)=>{
      //因为期刊数据加入缓存，每次切换前后一期时，页面数据都是从缓存里拿的，但实际like的数据会随时发生变化，需要单独从服务器取，不可以直接用缓存里的数据
      this._getLikeStatus(res.id,res.type);

      this.setData({  
        classicData:res,
        first:classicModel.isFirst(res.index),
        latest:classicModel.isLatest(res.index)
      })
    });
  },


  _getLikeStatus:function(artId,category){
    likeModel.getClassicLikeStatus(artId,category,(res)=>{
      this.setData({  
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})