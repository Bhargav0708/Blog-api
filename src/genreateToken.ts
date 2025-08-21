import { userdata } from "./express.types";
import jwt, { TokenExpiredError } from "jsonwebtoken";
export function genrateToken(data: userdata): string {
  // const hasedpassword = await bcrypt.hash(data.password, 10);
  try {
     const token = jwt.sign(
        {
          name: data.name as string,
          email: data.email as string,
          password: data.password as string,
          profile_picture: data.profile_picture as string,
          role: data.bio as string,
          user_id: data.user_id as number,
        },
        "Bhargav@12345",
        {
          expiresIn: "2h",
        }
      );
      return token;
  } catch (e) {
    throw e;
  }
}