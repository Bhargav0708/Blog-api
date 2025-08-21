//createcomment
//getcommentbyuserid
//updatecomment
//deletecomment

import { CLIENT_RENEG_LIMIT } from "tls";
import { commentdata } from "../express.types";
import { PrismaClient } from "../generated/prisma";
import { customError } from "../helper";
const prisma = new PrismaClient();
export const commnetRepositry = {
  async create(data: commentdata) {
    try {
      const comment = await prisma["comment"].create({
        data,
      });
      if (comment) {
        return comment;
      } else {
        throw new customError(
          "COMMENT_NOT_DONE",
          "comment not done by the user "
        );
      }
    } catch (error) {
       if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async getallcommentsByuserId(userid: number) {
    try {
      const getAllcommentsByUser = await prisma["comment"].findMany({
        where: {
          commented_userid: userid,
        },
      });
      if (getAllcommentsByUser) {
        return getAllcommentsByUser;
      } else {
        return null;
      }
    } catch (error) {
       if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async updateComment(data: commentdata, commentid: number) {
    try {
      const Comment_Exisist = await prisma.comment.findUnique({
        where: {
          comment_id: commentid,
        },
      });
      console.log("the comment id is exisit ", Comment_Exisist);
      if (Comment_Exisist) {
        console.log("in the comment existst and comment data", data);
        const updateComment = await prisma.comment.update({
          data: {
            comment_content: data.comment_content,
            post_id: data.post_id,
          },
          where: {
            comment_id: commentid,
          },
        });
        console.log("after the comment updation");
        console.log("🚀 ~ updateComment ~ in the repo:", updateComment);
        if (updateComment) {
          return updateComment;
        } else {
          throw new customError(
            "COMMENT_NOT_UPDATED",
            "your comment is not updated"
          );
        }
      } else {
        throw new customError(
          "COMMENT_NOT_FOUND",
          "your comment is not exisist to update"
        );
      }
    } catch (error) {
       if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async deleteComment(comment_id: number) {
    try {
      const Comment_Exisist = await prisma.comment.findUnique({
        where: {
          comment_id,
        },
      });
      console.log("🚀 ~ deleteComment ~ Comment_Exisist:", Comment_Exisist)
      
      if (Comment_Exisist) {
        const delted_comment = await prisma.comment.delete({
          where: {
            comment_id,
          },
        });
        console.log("🚀 ~ deleteComment ~ delted_comment:", delted_comment)
        // console.log()
        if (delted_comment) {
          return delted_comment;
        } else {
          throw new customError(
            "COMMENT_NOT_DELETED",
            "your comment is not updated"
          );
        }
      } else {
        throw new customError(
          "COMMENT_NOT_FOUND",
          "your comment is not exisist to update"
        );
      }
    } catch (error) {
       if (error instanceof customError) {
        throw error;
      }
      console.error("the error of the comment deletion",error)
      throw error;
    }
  },
};
