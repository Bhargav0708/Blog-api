import { Router } from "express";
import { postController } from "../controller/post.controller";

const postRouter = Router()

postRouter.post("/create",postController.create)
// postRouter.post("/create",postController.create)
postRouter.get("/allpost",postController.getAllpost)
postRouter.get("/allpost/:userid",postController.getpostbyUserid)
postRouter.put("/updatepost/:postid",postController.updataePostByPostid)
postRouter.delete("/delete/:postid",postController.deletepostBypostId)
export default postRouter;