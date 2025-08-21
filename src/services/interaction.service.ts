
import { commentdata, interactiondata } from "../express.types";
import { commnetRepositry } from "../repositeries/comment.repositry";
import { interactionRepositry } from "../repositeries/interaction.repositry";

export const interactionService = {
  async create(data: interactiondata) {
    try {
      console.log("🚀 creation of data in service:", data)
      const creationofComment = await interactionRepositry.create(data);
      return creationofComment
    } catch (error) {
        throw error
    }
  },
  async getAllinteractionsByuserid(user_id:number){
    const Interactionsofuser = await interactionRepositry.getAllinteractionbyUserId(user_id)
    return Interactionsofuser;
  },
  async getinteractionByPostid(post_id:number){
    const InteractionsbyPost = await interactionRepositry.getinteractionByPostid(post_id)
    return InteractionsbyPost
  },
  async updateInteraction(data:interactiondata,interaction_id:number){
    const interactionUpdation = await interactionRepositry.updateInteraction(data,interaction_id)
    return interactionUpdation
  },
  async deleteInteraction(interaction_id:number){
    const interactionDeletion = await interactionRepositry.deleteInteraction(interaction_id)
    return interactionDeletion
  }
};
