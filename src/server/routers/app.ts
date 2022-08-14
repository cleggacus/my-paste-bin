import { ZodError } from 'zod';
import { createRouter } from 'server/createRouter';
import { postRouter } from './post';

export const appRouter = createRouter()
  .formatError(({ shape, error }) => {
    const isZodErr = 
      error.code === 'BAD_REQUEST' &&
      error.cause instanceof ZodError;

    const getError = () => {
      if(error.code == "INTERNAL_SERVER_ERROR")
        return 'Something went wrong.'

      if(isZodErr)
        return 'Validation failed.'

      return shape.message;
    }

    delete shape.data.stack;

    return {
      code: shape.code,
      message: getError(),
      data: {
        code: shape.data.code,
        path: shape.data.path,
        httpStatus: shape.data.httpStatus,
        zodError: 
          isZodErr
            ? error.cause.flatten()
            : null,
      }
    };
  })
  .merge('post.', postRouter)

export type AppRouter = typeof appRouter;