import { CLIENT_RENEG_LIMIT } from "tls";
import { userdata } from "../express.types";
import { PrismaClient } from "../generated/prisma";
import { isConstructorDeclaration } from "typescript";
import { customError } from "../helper";
const prisma = new PrismaClient();
export const authRepositry = {
  async create(data: userdata) {
    try {
      const alreday_registered = await prisma["user"].findUnique({
        where: {
          email: data.email,
        },
      });
      if (alreday_registered) {
        throw new customError(
          "USER_ALERADY_EXISTS",
          "User_already Exists please register through unique Email"
        );
      }
      const newUser = await prisma["user"].create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          profile_picture: data.profile_picture,
          bio: data.bio,
        },
      });

      console.log("the user hase registed successfully ", newUser);
      if (newUser) {
        return newUser;
      } else {
        throw new customError("USER_NOT_CREATED", "User is not Created ");
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async GetAlluserInfo() {
    try {
      const Alluserdata = await prisma["user"].findMany();
      console.log("🚀 ~ GetAlluserInfo ~ Alluserdata:", Alluserdata);

      return Alluserdata;
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async UpdateUserById(data: userdata, id: number) {
    try {
      const USER_Exisist = await prisma.user.findUnique({
        where: {
          user_id: id,
        },
      });
      if (USER_Exisist) {
        const updateddata = await prisma["user"].update({
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
            profile_picture: data.profile_picture,
            bio: data.bio,
          },
          where: {
            user_id: id,
          },
        });
        // console.log("🚀 ~ updated user details", updateddata);
        return updateddata;
      } else {
        throw new customError(
          "USER_NOT_EXISIST",
          "user is not exisist which you want to update"
        );
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async DeleteUserById(id: number) {
    try {
      const USER_Exisist = await prisma["user"].findUnique({
        where: {
          user_id: id,
        },
      });
      console.log("the user exisistence is ...", USER_Exisist);
      if (USER_Exisist) {
        const deletedUser = await prisma["user"].delete({
          where: {
            user_id: id,
          },
        });
        return deletedUser;
      } else {
        throw new customError(
          "USER_NOT_EXISIST",
          "user is not exisist which you want to update"
        );
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async getdatabyuserid(userid: number) {
    try {
      const USER_Exisist = await prisma["user"].findUnique({
        where: {
          user_id: userid,
        },
      });
      if (USER_Exisist) {
        const userdata = await prisma["user"].findMany({
          where: {
            user_id: userid,
          },
        });
        if (userdata) {
          return userdata;
        } else {
          return null;
        }
      } else {
        throw new customError(
          "USER_NOT_EXISIST",
          "user is not exisist which you want to update"
        );
      }
    } catch (error) {
       if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async getUserByEmail(email:string){
    try {
       const getuserbyemail = await prisma.user.findUnique({
      where:{
        email
      }
    })
    if(getuserbyemail){
      return getuserbyemail
    }
    else{
      throw new customError("USER_NOT_FOUND","user is not found")
    }
    } catch (error) {
      if(error instanceof customError){
        throw error
      }
      throw error
    }
   
  }
};
