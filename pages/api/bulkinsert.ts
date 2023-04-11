import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { body } = req;
    const createMany = await prismadb.movie.createMany({
      data: body,
    });
    console.log(createMany);
    return createMany;
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export default handler;
