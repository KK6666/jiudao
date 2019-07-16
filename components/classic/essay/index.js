// components/classic/essay/index.js

import {classicBeh} from '../classic-beh'

Component({
  //behaviors:[classicBeh,beh2,beh3],多继承，可继承多个behavior，但如果beh里有相同属性，后面继承的会覆盖前面继承的，但入组继承的组件里的相同属性，最终会被组件里的属性覆盖
  behaviors:[classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    img:String,
    content:String,
    hiddenProperty:{
      type:Boolean
    }
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

  }
})
