import { customError } from "./helper";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import { CLIENT_RENEG_LIMIT } from "tls";
interface CustomJwtPayload extends JwtPayload {
  token: string;
}

// export const verifytoken = (token: string) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (!token) {
//         throw new customError(
//           "TOKEN_MISSING",
//           "The token is missing please provide the token"
//         );
//       }
//       const decoded = jwt.verify(token, "Bhargav@12345") as CustomJwtPayload;
//       req.user = decoded
//       return decoded;
//     } catch (error) {
//       if (error instanceof jwt.JsonWebTokenError) {
//         res.status(401).json({
//           success: false,
//           errorKey: "TOKEN_EXPIRED",
//           error: "Token has expired. Please log in again.",
//         });
//         return;
//       }
//     }
//   };
// };
export async function verifyToken(token: string) {
  try {
    if (!token) {
      throw new customError(
        "TOKEN_MISSING",
        "The token is missing please provide the token"
      );
    }

    const decoded = jwt.verify(token, "Bhargav@12345");
    return decoded;
  } catch (error) {
    if (error instanceof customError) {
      throw error;
    } else if (error instanceof TokenExpiredError) {
      return {
        success: false,
        errorKey: "TOKEN_EXPIRED",
        errorMessage: "Token has expired. Please log in again.",
      };
    }
  }
}

export const isUserLoggedIn = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("the cokies i have",req.cookies)
        
       const token = req.cookies?.logintoken;
      //  const userdata = req.cookies
      console.log("🚀 ~ isUserLoggedIn ~ token:", token);

      if (!token || token == "") {
        throw new customError("USER_NOT_LOGGED_IN", "You are not logged in");
      }

      const decoded = jwt.verify(token, "Bhargav@12345") as CustomJwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      console.log("the error of verification", error);
      if (error instanceof customError) {
        if (error.errorKey == "USER_NOT_LOGGED_IN") {
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
  };
};
