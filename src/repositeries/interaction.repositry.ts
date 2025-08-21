import { CLIENT_RENEG_LIMIT } from "tls";
import { interactiondata } from "../express.types";
import { PrismaClient } from "../generated/prisma";
import { customError } from "../helper";
const prisma = new PrismaClient();

export const interactionRepositry = {
  async create(data: any) {
    try {
      console.log("the data in the repo", data);

      const InteractiontobeCreated = await prisma.interaction.create({
        data: {
          user_id: data.user_id,
          post_id: data.post_id,
          interaction_type: data.interaction_type,
        },
      });
      console.log(
        "🚀 ~ create ~ InteractiontobeCreated: in the repo",
        InteractiontobeCreated
      );
      if (InteractiontobeCreated) {
        return InteractiontobeCreated;
      } else {
        throw new customError(
          "INTERACTION_NOT_CREATED",
          "Interaction is not Refelected "
        );
      }
    } catch (error) {
      console.log("the error is", error);
      if (error instanceof customError) {
        throw error;
      }
      throw error;
    }
  },
  async getAllinteractionbyUserId(user_id: number) {
    try {
      console.log("the interaction", user_id);
      const AllInteractions = await prisma.interaction.findMany({
        where: {
          user_id,
        },
      });
      console.log("in the all interaction", AllInteractions);
      if (AllInteractions) {
        return AllInteractions;
      } else {
        return null;
      }
    } catch (error) {
      console.log("the error is", error);
      throw error;
    }
  },
  async getinteractionByPostid(post_id: number) {
    try {
      const AllInteractions = await prisma.interaction.findMany({
        where: {
          post_id,
        },
      });
      if (AllInteractions) {
        return AllInteractions;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
  async updateInteraction(data: interactiondata, interaction_id: number) {
    try {
      const Interaction_EXISTS = await prisma.interaction.findUnique({
        where: {
          interaction_id,
        },
      });
      if (Interaction_EXISTS) {
        const update_interaction = await prisma.interaction.update({
          data: {
            interaction_type: data.interaction_type,
          },
          where: {
            interaction_id,
          },
        });
        if (update_interaction) {
          return update_interaction;
        } else {
          throw new customError(
            "INTERACTION_NOT_UPDATED",
            "interaction cannot be updated"
          );
        }
      } else {
        throw new customError(
          "INTERACTION_NOT_FOUND",
          "interaction cannot be founded"
        );
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async deleteInteraction(interaction_id: number) {
    try {
      const Interaction_EXISTS = await prisma.interaction.findUnique({
        where: {
          interaction_id,
        },
      });
      if (Interaction_EXISTS) {
        const tobeDeleted = await prisma.interaction.delete({
          where: {
            interaction_id,
          },
        });
        if (tobeDeleted) {
          return tobeDeleted;
        } else {
          throw new customError(
            "INTERACTION_NOT_DELETED",
            "your interaction is not deleted"
          );
        }
      } else {
        throw new customError(
          "INTERACTION_NOT_FOUND",
          "you are deleting the interaction which is never exisst please choose valid interaction to delete"
        );
      }
    } catch (error) {
      // throw error;
       if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
};
