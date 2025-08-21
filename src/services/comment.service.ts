import { commentdata } from "../express.types";
import { commnetRepositry } from "../repositeries/comment.repositry";

export const commentService = {
  async create(data: commentdata) {
    try {
      const creationofComment = await commnetRepositry.create(data);
      return creationofComment
    } catch (error) {
        throw error
    }
  },
  async getallcommentsByUserid(userid:number){
    const commetnsofuser = await commnetRepositry.getallcommentsByuserId(userid)
    return commetnsofuser
  },
  async updateComment(data:commentdata,comment_id:number){
    const commentUpdation = await commnetRepositry.updateComment(data,comment_id)
    console.log("in the update coment service",commentUpdation)
    return commentUpdation
  },
  async deleteComment(comment_id:number){
      const commentDeletion = await commnetRepositry.deleteComment(comment_id)
    return commentDeletion
  }
};
