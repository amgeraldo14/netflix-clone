import { PrismaClient } from "@prisma/client";

//prevent many prisma client instances because of next hot reloading
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
