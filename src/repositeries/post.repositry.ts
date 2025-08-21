import { postdata } from "../express.types";
import { PrismaClient } from "../generated/prisma";
import { customError } from "../helper";
const prisma = new PrismaClient();
export const postRepositry = {
  async create(data: postdata) {
    try {
      console.log("the data is in the repo", data);
      const USER_Exisist = await prisma.user.findUnique({
        where: {
          user_id: data.author_id,
        },
      });
      if (USER_Exisist) {
        const dataofPost = await prisma.post.create({
          data: {
            author_id: Number(data.author_id),
            post_content: data.post_content,
            Tag: data.Tag,
            Title: data.Title,
          },
        });
        if (dataofPost) {
          return dataofPost;
        } else {
          throw new customError("POST_NOT_CREATED", "Post is not created ");
        }
      } else {
        throw new customError(
          "AUTHOR_NOT_FOUND",
          "Author not found for which you are creating post "
        );
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },

  async getPost() {
    const allpost = await prisma.post.findMany();
    if (allpost) {
      return allpost;
    } else {
      return null;
    }
  },
  async getpostByuserID(userid: number) {
    try {
      const USER_Exisist = await prisma.user.findUnique({
        where: {
          user_id: userid,
        },
      });
      if (USER_Exisist) {
        const UsersPost = await prisma.post.findMany({
          where: {
            author_id: userid,
          },
        });
        if (UsersPost) {
          return UsersPost;
        } else {
          return null;
        }
      } else {
        throw new customError(
          "USER_NOT_FOUND",
          "user is not found so he cannot create post"
        );
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async getPostdataBypostid(postid: number) {
    try {
      const post_exists = await prisma.post.findFirst({
        where: {
          post_id: postid,
        },
      });
      if (post_exists) {
        const postdata = await prisma.post.findMany({
          where: {
            post_id: postid,
          },
        });
        if (postdata) {
          return postdata;
        } else {
          return null;
        }
      } else {
        throw new customError("POST_NOT_FOUND", "your post is not found");
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async updateUserPostId(data: postdata, postid: number) {
    try {
      const postExisist = await prisma.post.findUnique({
        where: {
          post_id: postid,
        },
      });
      if (postExisist) {
        const updatePost = await prisma.post.update({
          data: {
            post_content: data.post_content,
            Tag: data.Tag,
            Title: data.Title,
          },
          where: {
            post_id: postid,
          },
        });
        if (updatePost) {
          return updatePost;
        } else {
          throw new customError("POST_NOT_UPDATED", "post Not updated ");
        }
      } else {
        throw new customError("POST_NOT_FOUND", "Post not Founded");
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
  async deletePost(postid: number) {
    try {
      const postExisist = await prisma.post.findUnique({
        where: {
          post_id: postid,
        },
      });
      if (postExisist) {
        const deletePost = await prisma.post.delete({
          where: {
            post_id: postid,
          },
        });
        if (deletePost) {
          return deletePost;
        } else {
          throw new customError("POST_NOT_DELETED", "post Not deleted ");
        }
      } else {
        throw new customError("POST_NOT_FOUND", "Post not Founded");
      }
    } catch (error) {
      if (error instanceof customError) {
        throw error;
      }

      throw error;
    }
  },
};
