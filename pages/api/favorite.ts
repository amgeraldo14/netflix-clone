import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;
      const existingMovie = prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        return res.status(400).json({ msg: "Invalid ID" });
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;
      const existingMovie = prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) {
        return res.status(400).json({ msg: "Invalid ID" });
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });
      return res.status(200).json(updatedUser);
    }
    return res.status(400).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
