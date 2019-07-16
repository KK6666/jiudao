// components/classic/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    latest:Boolean,
    first:Boolean,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:"./image/triangle.dis@left.png",
    disRightSrc: "./image/triangle.dis@right.png",
    leftSrc: "./image/triangle@left.png",
    rightSrc: "./image/triangle@right.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击左箭头向下一期翻页，
    onLeft:function(){
      // console.log(this.properties.latest);
      if(!this.properties.latest){
        this.triggerEvent('next',{},{});
      }
    },
    //点击右箭头向上一期翻页，
    onRight:function(){
      if(!this.properties.first){
        this.triggerEvent('prev',{},{});
      }
    }
  }
})
