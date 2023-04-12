import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    if (!movieId) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
