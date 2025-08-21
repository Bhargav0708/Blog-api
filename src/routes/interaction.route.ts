import { Router } from "express";
import { postController } from "../controller/post.controller";
import { interactioController } from "../controller/interaction.controller";

const interactionRoute = Router()

interactionRoute.post("/create",interactioController.create)
// postRouter.post("/create",postController.create)
interactionRoute.get("/allpost/:userid",interactioController.getAllinteractionByuserId)
interactionRoute.get("/allpost/:postid",interactioController.getAllinteractionsByPostId)
interactionRoute.put("/updatepost/:interactionid",interactioController.updateInteraction)
interactionRoute.delete("/delete/:interactionid",interactioController.deleteInteraction)
export default interactionRoute;