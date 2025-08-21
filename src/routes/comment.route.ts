import { Router } from "express";
import { commentController } from "../controller/comments.controller";
import { isUserLoggedIn } from "../verifytoken";
import cookieParser from 'cookie-parser';
const commentRouter = Router();
commentRouter.use(cookieParser())
commentRouter.post("/create",isUserLoggedIn(),commentController.create)
commentRouter.get("/getcomments/:userid",commentController.getallcommentsbyuserid)
commentRouter.put("/update/:commentid",commentController.updatecomment)
commentRouter.delete("/delete/:commentid",commentController.deleteComment)
export default commentRouter