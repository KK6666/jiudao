import {HTTP} from "../util/http-p"

class KeywordModel extends HTTP{
  key="q"
  maxLength=10

  setHistory(value){
    let arr=this.getHistory()
    if(arr.includes(value)){
      return
    }
    arr.unshift(value)
    if(arr.length>this.maxLength){
      arr.pop()
    }
    wx.setStorageSync(this.key,arr)
  }

  getHistory(){
    let arr=wx.getStorageSync(this.key)
    if(!arr){
      arr=[]
    }
    return arr
  }

  getHot(){

  }

}

export {KeywordModel}