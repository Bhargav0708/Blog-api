import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { customError } from "../helper";
import { genrateToken } from "../genreateToken";
import { error } from "console";
import { CLIENT_RENEG_LIMIT } from "tls";
import { verifyToken } from "../verifytoken";
export const authController = {
  async create(req: Request, res: Response) {
    try {
      const body = req.body;

      const dataOfUser = await authService.create(body);
      console.log("data of user successfully registed", dataOfUser);
      // localStorage.setItem("DataofUser",JSON.stringify(dataOfUser))
      if (dataOfUser) {
        res.status(200).json({
          data: dataOfUser,
          success: true,
          msg: "Succesfully Registred",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Succesfully Not Registed",
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof customError) {
        if (error.errorKey == "USER_ALERADY_EXISTS") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        } else if (error.errorKey == "USER_NOT_CREATED") {
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
  async login(req: Request, res: Response) {
    try {
      const data = req.body;

      const email = data.email;
      const password = data.password;
      const logininfo = {
        email,
        password,
      };

      const logindata = await authService.login(logininfo);
      // console.log("the data of the login",logindata);
      if (logindata) {
        
        res.cookie("logintoken", logindata.logintoken);
        res.cookie("userdata",logindata.dataofuser)
        res.status(200).json({
          msg: "User Login Successfully",
        });
      }
    } catch (error) {
      console.log("error of login",error)
      if (error instanceof customError) {
        if (error.errorKey == "USER_CREDENTIALS_INCORRECT") {
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
          msg: "something went wrong",
        });
      }
    }
  },
  async getAllUserInfo(req: Request, res: Response) {
    try {
      const AllUserInfo = await authService.getalluserinfo();
      console.log("🚀 ~ getAllUserInfo ~ in the constoller :", AllUserInfo);
      if (AllUserInfo) {
        res.status(200).json({
          data: AllUserInfo,
          success: true,
          msg: "All User Info",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "All User Info is null",
        });
      }
    } catch (error) {
      console.log("the error is",error)
      res.status(400).json({
        msg: "something went wrong",
        success: false,
      });
    }
  },
  async UpdateUserByid(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const data_of_update = req.body;
      const updatedUserdata = await authService.updateUserbyId(
        data_of_update,
        id
      );
      console.log("🚀 ~ UpdateUserByid ~ In controller", updatedUserdata);
      if (updatedUserdata) {
        res.status(200).json({
          success: true,
          msg: "User successfully Update",
        });
      } else {
        res.status(200).json({
          success: false,
          msg: "User is not updated Successfully",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "USER_ALERADY_EXISTS") {
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
          msg: "something went wrong",
        });
      }
    }
  },
  async DeleteUserByid(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }

      const tobedeletedUser = await authService.deleteUserById(id);
      console.log("🚀 ~ DeleteUserByid ~ controller:", tobedeletedUser);
      if (tobedeletedUser) {
      }
    } catch (error) {
      if (error instanceof customError) {
        // USER_NOT_EXISIST
        if (error.errorKey == "USER_NOT_EXISIST") {
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
          msg: "something went wrong",
        });
      }
    }
  },
  async getdataoftheUserid(req: Request, res: Response) {
    try {
      const userid = Number(req.params.id);
      if (isNaN(userid)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const userdata = await authService.getdatabyuserId(userid);
      if (userdata) {
        res.status(200).json({
          data: userdata,
          success: true,
          msg: "the daata of the user by user id ",
        });
      } else {
        res.status(200).json({
          data: null,
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        // USER_NOT_EXISIST
        if (error.errorKey == "USER_NOT_EXISIST") {
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
          msg: "something went wrong",
        });
      }
    }
  },
};
