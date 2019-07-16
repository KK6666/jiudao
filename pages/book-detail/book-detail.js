// pages/book-detail/book-detail.js
import {BookModel} from '../../models/book'
const bookModel = new BookModel()

import {LikeModel} from '../../models/like.js'
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:'',
    likeCount:0,
    likeStatus:false,
    posting:false
  },

  onLike:function(e){
    likeModel.likeCancel(e.detail.behavior,this.data.book.id,400);
  },
  //点击隐藏假的输入面板post-container，显示posting-container
  onFakePost:function(){
    this.setData({
      posting:true
    })
  },
  onCancel:function(){
    this.setData({
      posting:false
    })
  },
  onPost:function(e){
    //点击已有短评得到的comment || input输入得到的comment
    const comment=e.detail.text || e.detail.value
    if(comment.length>12){
      wx.showToast({
        title:'短评最多12个字',
        icon:'none'
      })
    }

    //提交短评
    bookModel.postComment(this.data.book.id,comment)
    .then(res=>{
      wx.showToast({
        title:'+1',
        icon:'none'
      })

      //更新comments数据，在点击已有短评后，在短片列表最前面增加一个新的同字短评
      let newComments = this.data.comments
      newComments.unshift({
        content:comment,
        nums:1
      })
      this.setData({
        comments:newComments,
        // 去遮罩,恢复评论前的状态
        posting:false
      })
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({});

    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
   
    //将下面的三个请求合并一同发送，请求全部结束后隐藏loading
    Promise.all([detail,comments,likeStatus])
    .then(res=>{
      this.setData({
        book:res[0],
        comments:res[1].comments,
        likeCount:res[2].fav_nums,
        likeStatus:res[2].like_status
      })
      wx.hideLoading()
    })

    // detail.then(res=>{
    //   this.setData({
    //     book:res
    //   })
    //   console.log(res)
    // })
    // comments.then(res=>{
    //   this.setData({
    //     comments:res.comments
    //   })
    //   console.log(res)
    // })
    // likeStatus.then(res=>{
    //   this.setData({
    //     likeCount:res.fav_nums,
    //     likeStatus:res.like_status
    //   })
    //   console.log(res)
    // })

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