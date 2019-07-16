// components/tag/index.js
Component({

  // 插槽显示
  options:{
    multipleSlots:true
  },

  // 引入外部样式类
  externalClasses:['tag-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    text:String
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
    onContent:function(e){
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
