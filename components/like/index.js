// components/like/index.js
Component({
  /**
   * 组件的属性列表(组件外部可以设置的数据)
   */
  properties: {
    // like: true,
    // count: 99
    like:{
      type:Boolean,
      value:false
    },
    count:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: "images/like.png",
    noSrc:"images/like@dis.png"
  },

  
  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(e){
      let like=this.properties.like
      let count=this.properties.count
      this.setData({
        count:like ? count-1:count+1,
        like: !like
      }) 

      // 在onLike事件执行时激活likeEvent事件，使其执行
      let behavior = this.properties.like? 'like':'cancel';
      this.triggerEvent('likeEvent',{
        behavior:behavior
      },{});
    }
  }
})
