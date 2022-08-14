import prisma from 'utils/prisma';
import { inferAsyncReturnType } from '@trpc/server';
import { NextApiRequest, NextApiResponse } from 'next';

export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest,
  res: NextApiResponse<any>
}) => {
  return {
    req,
    res,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;