// createpost
// getpost
// getpostofallusers
//updatepostofuser
//deletepostofuser

import { postdata } from "../express.types";
import { Request, Response } from "express";
import { postService } from "../services/post.service";
import { customError } from "../helper";

export const postController = {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const senttothepost = {
        author_id: Number(data.author_id),
        post_content: data.post_content,
        Tag: data.Tag,
        Title: data.Title,
      };
      const createPost = await postService.create(senttothepost);
      if (createPost) {
        res.status(200).json({
          data: createPost,
          success: true,
          msg: "Succesfully Registred",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "POST_NOT_CREATED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "AUTHOR_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something went wrong",
        });
      }
    }
  },
  async getAllpost(req: Request, res: Response) {
    const getAlldataofpost = await postService.getAllpost();
    if (getAlldataofpost) {
      res.status(200).json({
        data: getAlldataofpost,
        sucess: true,
        msg: "All data of post",
      });
    } else {
      res.status(200).json({
        data: null,
        msg: "no post found in the post table",
      });
    }
  },
  async getpostbyUserid(req: Request, res: Response) {
    try {
      const userid = Number(req.params.userid);
      if (isNaN(userid)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const postbyuser = await postService.getPostByUserid(userid);
      if (postbyuser) {
        res.status(200).json({
          data: postbyuser,
          success: true,
          msg: "Post of the user",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "no post found of th user ",
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
        } else if (error.errorKey == "USER_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something went wrong",
        });
      }
      // throw error;
    }
  },
  async updataePostByPostid(req: Request, res: Response) {
    try {
      const postid = Number(req.params.postid);
      const updated_data = req.body;
      if (isNaN(postid)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const updated_post = await postService.updatePostBypostid(
        updated_data,
        postid
      );
      if (updated_data) {
        res.status(200).json({
          msg: "post Updated successfully",
          sucess: true,
        });
      } else {
        res.status(200).json({
          msg: "post is not updated",
        });
      }
    } catch (error) {
      // throw error;
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "POST_NOT_UPDATED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "POST_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something went wrong",
        });
      }
    }
  },
  async getAllPostdatabypostid(req: Request, res: Response) {
    try {
      const postid = Number(req.params.postid);
      if (isNaN(postid)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const postdata = await postService.getpostdatabypostid(postid);
      if (postdata) {
        res.status(200).json({
          data: postdata,
          success: true,
          msg: "the all post data by postid",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "the all post data by postid",
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
        } else if (error.errorKey == "POST_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something went wrong",
        });
      }
    }

    // constAlldataByPostid =
  },
  async deletepostBypostId(req: Request, res: Response) {
    try {
      const postid = Number(req.params.postid);
      if (isNaN(postid)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const deletedpost = await postService.deletepostbypostId(postid);
      if (deletedpost) {
        res.status(200).json({
          msg: "post deleted Succuessfully",
        });
      } else {
        res.status(200).json({
          msg: "post is not deletd",
        });
      }
    } catch (error) {
      // console.log("Delete error", error);
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "POST_NOT_DELETED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "POST_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      } else {
        res.status(400).json({
          msg: "Something went wrong",
        });
      }
    }
  },
};
