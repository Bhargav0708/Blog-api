import { logindata, userdata } from "../express.types";
import { authRepositry } from "../repositeries/auth.repositry";
import bcrypt from "bcrypt";
import { customError } from "../helper";
import { genrateToken } from "../genreateToken";

export const authService = {
  async create(data: userdata) {
    try {
      const hashedpassword = await bcrypt.hash(String(data.password), 12);
      const dataofusertoesent = {
        name: data.name,
        email: data.email,
        password: hashedpassword,
        profile_picture: data.profile_picture,
        bio: data.bio,
      };
      const dataofuser = await authRepositry.create(dataofusertoesent);
      return dataofuser;
    } catch (error) {
      throw error;
    }
  },
  async login(data: logindata) {
    try {
      const email = data.email;
      const password = data.password;
      const getuserdata = await authRepositry.getUserByEmail(email);
      console.log("the user data in db", getuserdata);
      console.log("the user entered password", password);
      console.log("the getuserdatapassword", getuserdata.password);
      // const comparepassword = await
      const validation = await bcrypt.compare(password, getuserdata.password);
      console.log("🚀 ~ login ~ validation:", validation);

      if (validation) {
        const dataofuser = {
          name: getuserdata.name,
          user_id: getuserdata.user_id,
          email,
        };
        const logintoken = genrateToken(getuserdata);
        console.log("🚀 ~ login ~ logintoken:", logintoken);

        return {
          logintoken,
            dataofuser
        };

        // localStorage.setItem("login_token",JSON.stringify(tokenwithuser))
      } else {
        throw new customError(
          "USER_CREDENTIALS_INCORRECT",
          "please check your credatinals again"
        );
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }
      throw error;
    }
  },
  async getalluserinfo() {
    const AllUSerinfo = await authRepositry.GetAlluserInfo();
    return AllUSerinfo;
  },
  async updateUserbyId(data: userdata, id: number) {
    const updateuserdata = await authRepositry.UpdateUserById(data, id);
    return updateuserdata;
  },
  async deleteUserById(id: number) {
    const deletedUser = await authRepositry.DeleteUserById(id);
    return deletedUser;
  },
  async getdatabyuserId(userid: number) {
    const userdata = await authRepositry.getdatabyuserid(userid);
    return userdata;
  },
};
