// components/search/index.js
import {KeywordModel} from "../../models/keyword"
const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    historyWords:[]
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
    onCancel:function(){
      this.triggerEvent('cancelEvent',{},{})
    },
    onConfirm:function(e){
      keywordModel.setHistory(e.detail.value)
      const data =  keywordModel.getHistory()
      
    }
  },

  // attached:function(){
  //   this.setData({
  //     historyWords:keywordModel.getHistory()
  //   })
  // }

})
