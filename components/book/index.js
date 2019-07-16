// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      const bid=this.properties.book.id
      //跳转至书籍详情页面，传递bin参数过去，传递给book-detail的onLoad里的options
      wx.navigateTo({
        url: `../../pages/book-detail/book-detail?bid=${bid}`
      })
        
    }
  }
})
 