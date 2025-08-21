//createcomment
//getcommentbyuserid
//updatecomment
//deletecomment
import { Request, Response } from "express";
import { commentService } from "../services/comment.service";
import { customError } from "../helper";
import { commentdata } from "../express.types";
import { CLIENT_RENEG_LIMIT } from "tls";

export const commentController = {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("🚀 ~ the data of the comment:", data);
      const commented_data: commentdata = {
        commented_userid: Number(data.commented_userid),
        comment_content: data.comment_content,
        post_id: Number(data.post_id),
      };
      const creationofComment = await commentService.create(commented_data);
      if (creationofComment) {
        res.status(200).json({
          data: creationofComment,
          success: true,
          msg: "comment done successfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "commet done failed or creation failed",
        });
      }
      //   if(creationofComment)
    } catch (error) {
      console.log("the error",error)
      if (error instanceof customError) {
        if (error.errorKey == "COMMENT_NOT_DONE") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
        if (error.errorKey == "USER_NOT_LOGGED_IN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something Went Wrong",
        });
      }
    }
  },
  async getallcommentsbyuserid(req: Request, res: Response) {
    try {
      const userid = Number(req.params.userid);
      if (isNaN(userid)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const allcomments = await commentService.getallcommentsByUserid(userid);
      if (allcomments) {
        res.status(200).json({
          data: allcomments,
          success: true,
          msg: "all data of comments by user",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something Went Wrong",
        });
      }
    }
  },
  async updatecomment(req: Request, res: Response) {
    try {
      const comment_id = Number(req.params.commentid);
      if (isNaN(comment_id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      console.log(comment_id);
      const data = req.body;
      console.log("data in the comment update", data);
      const commentdata = {
        commented_userid: Number(data.commented_userid),
        comment_content: data.comment_content,
        post_id: Number(data.post_id),
      };
      const updatedComment = await commentService.updateComment(
        commentdata,
        comment_id
      );
      console.log("the updated comment", updatedComment);
      if (updatedComment) {
        res.status(200).json({
          data: updatedComment,
          success: true,
          msg: "comment updated successfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "commmet updation failed",
        });
      }
    } catch (error) {
      console.log("the error is", error);
      if (error instanceof customError) {
        if (error.errorKey == "COMMENT_NOT_UPDATED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "COMMENT_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something Went Wrong",
        });
      }
    }
  },
  async deleteComment(req: Request, res: Response) {
    try {
      const comment_id = Number(req.params.commentid);
      if (isNaN(comment_id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const deletionofComment = await commentService.deleteComment(comment_id);
      if (deletionofComment) {
        res.status(200).json({
          data: deletionofComment,
          success: true,
          msg: "comment deleted successfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "commmet deletion failed",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "COMMENT_NOT_DELETED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "COMMENT_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something Went Wrong",
        });
      }
    }
  },
};
