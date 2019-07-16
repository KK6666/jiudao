//对wx.request函数进行封装

import {config} from '../config.js'

const tips = {
  1:'抱歉，出现错误', //设置默认的错误代码
  1005:'appkey无效',
  3000:'期刊不存在'
}

class HTTP{
  /*参数params为一个json对象，
   params={
     url:'',  //请求路径
     mothod:'',  //请求方法：GET,POST
     data:'',    //post请求需要带数据
     success:()=>{},   //请求成功回调函数
     fail:()=>{}     //请求失败回调函数
   }
  */
  request(params){
    if(!params.method){
      params.method='GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method:params.method,
      data:params.data,
      header:{
        'content-type': 'application/json', // 默认值
        'appkey':config.appkey
      },
      // 请求返回2xx,4xx，都算是请求成功，相关操作在success中写，如果为未反馈回相应值，在fail里处理
      success:(res)=>{
        let statusCode = res.statusCode.toString();
        if( statusCode.startsWith('2') ){
          //有时不需要执行回调函数，也就没有传递success，此处如不先判断是否有success，在不存在回调success回调函数时，执行params.success会报错
          params.success && params.success(res.data);
        }else{
          this._show_err(res)
        }
      },
      fail:(err)=>{
        wx.showToast({
          title: '出现错误',
          icon: 'none',
          image: '',
          duration: 2000
        })
      }
    })
  }

  // 私有函数书写规范为_xx_xxx，表示这个函数只在父级函数体内使用，不要在外部调用。（因为小程序没有私有函数的定义，所以此处我们只是自己定义成私有函数，但实际上外部仍可以调用）
  _show_err(res){
    let errCode = res.data.error_code
    // 如果没返回tips中对应的error_code值，则设置默认错误值为1
    if(!errCode){
      errCode=1
    }
    wx.showToast({
      title: tips[errCode],
      icon: 'none',
      image: '',
      duration: 2000
    })
  }
}

export  {HTTP};