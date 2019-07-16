// components/classic/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number,
      // observer为监听函数，当属性值index发生改变时，会调用observer,参数（改变后的值，改变前的值，路径）.
      // 注意：不要在observer中修改自身的值，容易引起无线递归的情况（如此处的index，重新定义_index，通过修改_index达到需求）
      observer:function(newVal,oldVal,changePath){
        let val = newVal<10? '0'+newVal:newVal
        this.setData({
          _index:val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    month:'',
    year:0,
    _index:0
  },

  attached:function(){
    const arrMonth = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    let date = new Date()
    let m = date.getMonth()
    let y = date.getFullYear()
    this.setData({
      month:arrMonth[m],
      year:y
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
