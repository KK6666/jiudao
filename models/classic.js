//将页面的request请求代码单独卸载models中，便于维护
import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP{

  //获取最近一期
  //sCallback为classic.js里的onload调用getLatest传过来的箭头函数，这里请求成功后执行sCallback（可达到将res回传给onload的效果）
  getLatest(sCallback){
    this.request({
      url:'classic/latest',
      success:(res)=>{
        sCallback(res)
        //将最近一期的index值存进缓存
        this._setLatestIndex(res.index)

        //首次加载页面时，将最新期刊的res存入缓存
        let key=`classic-${res.index}`
        wx.setStorageSync(key,res)
      }
    })
  }

  // //获取上一期
  // getPrev(index,sCallback){
  //   let url= "classic/"+index+"/previous"
  //   this.request({
  //     url:url,
  //     success:(res)=>{
  //       sCallback(res)
        
  //     }
  //   })
  // }
  // //获取下一期
  // getNext(index,sCallback){
  //   let url= "classic/"+index+"/next"
  //   this.request({
  //     url:url,
  //     success:(res)=>{
  //       sCallback(res)
  //     }
  //   })
  // }

  //如下代码为上面代码的封装
  getPrevOrNext(index,prevOrNext,sCallback,){
    let url= "classic/"+index+"/"+prevOrNext

    let indexNow= prevOrNext=='previous' ? index-1:index+1
    let key=`classic-${indexNow}`
    let classicNow = wx.getStorageSync(key)
    // console.log(classicNow+11)
    if( !classicNow ){
      this.request({
        url:url,
        success:(res)=>{
          //将获取到的期刊信息存入缓存
          wx.setStorageSync(key,res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classicNow)
    }
    
  }

  //通过当前res的index值，判断res是否为第一期/最后一期
  isFirst(index){
    return index==1? true:false
  }
  isLatest(index){
    // 将当前res的index值与最近一期res的index值进行对比，如果相等则说明当期即为最近一期
    let latestIndex = this._getLatestIndex()
    return index==latestIndex? true:false
  }

  //设置获取缓存数据，这里将最近一期的index存进缓存，以便与当前res的index值对比
  _setLatestIndex(index){
    wx.setStorageSync('latestIndex', index);
  }
  _getLatestIndex(){
    let latestIndex = wx.getStorageSync('latestIndex');
    return latestIndex;
  }
}

export {ClassicModel} 