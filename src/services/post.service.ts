import { postdata } from "../express.types";
import { postRepositry } from "../repositeries/post.repositry";

export const postService = {
    async create (data:postdata){
        const createpost  = await postRepositry.create(data)
        return createpost
    },
    async getAllpost(){
        const allpostdata = await postRepositry.getPost()
        return allpostdata
    },
    async getPostByUserid(userid:number){
        const postsbyuserid = await postRepositry.getpostByuserID(userid)
        return postsbyuserid
    },
    async updatePostBypostid(data:postdata,post_id:number){
        const updatepostbypostid = await postRepositry.updateUserPostId(data,post_id)
        return updatepostbypostid
    },
    async getpostdatabypostid(postid:number){
        const getpostdata = await postRepositry.getPostdataBypostid(postid)
        return getpostdata
    },
    async deletepostbypostId(postid:number){
        const deletepost =  await postRepositry.deletePost(postid)
        return deletepost
    }
}