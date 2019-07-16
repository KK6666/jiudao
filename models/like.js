import {HTTP} from '../util/http.js'

class LikeModel extends HTTP{
  //通过发送如下的url可进行当前账号的点赞或取消点赞，数据将记录进服务器
  likeCancel(behavior,artId,category){
    let url= behavior=='like'? 'like':'like/cancel'
    this.request({
      url:url,
      method:'post',
      data:{
        art_id:artId,
        type:category
      }
    });
  }


  getClassicLikeStatus(artId,category,sCallBack){
    this.request({
      url:`classic/${category}/${artId}/favor`,
      success:(res)=>{
        sCallBack(res)
      }
    })
  }
  
}

export {LikeModel};