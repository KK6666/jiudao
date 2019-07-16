import {HTTP} from '../util/http-p.js'

class BookModel extends HTTP{
  getBooks(){
    return this.request({
      url:"/book/hot_list"
    })
  }


  getDetail(id){
    return this.request({
      url:"/book/"+ id +"/detail"
    })
  }

  getComments(id){
    return this.request({
      url:"/book/"+ id +"/short_comment"
    })
  }

  getLikeStatus(id){
    return this.request({
      url:"/book/"+ id +"/favor"
    })
  }

  postComment(id,content){
    return this.request({
      url:"/book/add/short_comment",
      method:'POST',
      data:{
        book_id:id,
        content:content
      }
    })
  }
}

export {BookModel}