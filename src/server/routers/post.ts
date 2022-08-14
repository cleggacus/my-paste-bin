import { TRPCError } from "@trpc/server";
import z, { ZodError } from "zod";
import { createRouter } from 'server/createRouter';
import languages from "utils/languages";

export const postRouter = createRouter()
  .mutation("create", {
    input: z.object({
      content: z.string()
        .min(1, "Field must contain at least 1 character(s)"),
      title: z.string().default("untitled"),
      language: z.enum(languages).default("plaintext"),
    }),
    output: z.object({
      id: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { content, title, language } = input;

      const post = await prisma.posts.create({
        data: {
          content,
          title,
          language
        }
      })

      return post;
    }
  })
  .query("find", {
    input: z.object({
      id: z.string()
    }),
    output: z.object({
      id: z.string(),
      content: z.string(),
      title: z.string(),
      language: z.string(),
      createdAt: z.date(),
      updatedAt: z.date()
    }),
    resolve: async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { id } = input;

      console.log(input)
      
      const post = await prisma.posts.findFirst({
        where: {
          id
        }
      });

      if(!post)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post does't exist."
        })

      return post;
    }
  })

export type PostRouter = typeof postRouter;

function languagesValues(languagesValues: any) {
  throw new Error("Function not implemented.");
}
