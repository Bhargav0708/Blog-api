//createinteractionbyuserid
//getineractionbyuserid
//getintractionbypostid
//updateinteractionbyuserid
//deleteinteractionbyuserid
import { Request, Response } from "express";
import { interactionService } from "../services/interaction.service";
import { customError } from "../helper";
import { CLIENT_RENEG_LIMIT } from "tls";
import { interactiondata } from "../express.types";
export const interactioController = {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log("🚀 ~ create ~ data:", data);
      const interactiondata: interactiondata = {
        user_id: data.user_id,
        post_id: data.post_id,
        interaction_type: data.interaction_type,
      };

      const creationofInteraction = await interactionService.create(
        interactiondata
      );
      if (creationofInteraction) {
        console.log("🚀 the interaction creation:", creationofInteraction)
        res.status(200).json({
          data: creationofInteraction,
          success: true,
          msg: "Interaction Created Successfully",
        });
      } else {
        res.status(200).json({
          data: creationofInteraction,
          msg: "Interaction creation Failed",
        });
      }
    } catch (error) {
      console.log("the error is of interaction create controller",error)
      if (error instanceof customError) {
        if (error.errorKey == "INTERACTION_NOT_CREATED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
      
      else {
        res.status(400).json({
          msg: "Something Went Wrong",
        });
      }
    }
  },
  async getAllinteractionByuserId(req: Request, res: Response) {
    try {
      const userid = Number(req.params.userid);
      if (isNaN(userid)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const getAllinteractiondataByUserid =
        await interactionService.getAllinteractionsByuserid(userid);
      console.log(
        "getting all interaction by userid",
        getAllinteractiondataByUserid
      );
      if (getAllinteractiondataByUserid) {
        res.status(200).json({
          data: getAllinteractiondataByUserid,
          success: true,
          msg: "Interaction data By user",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Interaction data null",
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
  async getAllinteractionsByPostId(req: Request, res: Response) {
    try {
      const post_id = Number(req.params.postid);
      if (isNaN(post_id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const getAllinteractionDataByPostid =
        await interactionService.getinteractionByPostid(post_id);
      if (getAllinteractionDataByPostid) {
        res.status(200).json({
          data: getAllinteractionDataByPostid,
          success: true,
          msg: "Interaction data By postid",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Interaction data ",
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
  async updateInteraction(req: Request, res: Response) {
    try {
      const interaction_id = Number(req.params.interactionid);
      if (isNaN(interaction_id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const data = req.body;
      const tobesentData = {
        user_id: Number(data.user_id),
        post_id:Number(data.post_id),
        interaction_type:data.interaction_type
      };
      const updateinteraction = await interactionService.updateInteraction(
        tobesentData,
        interaction_id
      );
      if (updateinteraction) {
        res.status(200).json({
          data: updateinteraction,
          success: true,
          msg: "Interaction data is successfully Updated",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Interaction updation failed",
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
        } else if (error.errorKey == "INTERACTION_NOT_UPDATED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "INTERACTION_NOT_FOUND") {
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
  async deleteInteraction(req: Request, res: Response) {
    try {
      const interaction_id = Number(req.params.interactionid);
      if (isNaN(interaction_id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const deletionofinteraction = await interactionService.deleteInteraction(
        interaction_id
      );
      if (deletionofinteraction) {
        res.status(200).json({
          data: deletionofinteraction,
          success: true,
          msg: "Interaction data is successfully Updated",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Interaction deletion failed",
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
        } else if (error.errorKey == "INTERACTION_NOT_DELETED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "INTERACTION_NOT_FOUND") {
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
