import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "server/routers/app";

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
