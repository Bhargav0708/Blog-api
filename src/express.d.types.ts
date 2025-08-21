import { InteractionsTypes } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface userdata {
  name: string;
  email: string;
  password: string;
  profile_picture: string;
  bio: string;
  user_id?:number
}
export interface postdata {
  author_id: number;
  post_content: string;
  Tag: string;
  Title: string;
}
export interface commentdata {
  commented_userid: number;
  comment_content:string
  post_id:number
}
export interface interactiondata{
  user_id:number
  post_id:number
  interaction_type  :InteractionsTypes
}
declare module "express" {
  export interface Request {
    user?: JwtPayload;
  }
}
interface logindata {
  email:string
  password:string
}