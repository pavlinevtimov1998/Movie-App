import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Album } from "../models/AlbumModel";
import { IAlbum } from "../models/interfaces";
import { trimData } from "../utill";

const router = Router();

router.post("/albums", authMiddleware, async (req: Request, res: Response) => {
  const data = Object.entries(req.body) as [string, string][];

  const albumData = trimData(data) as IAlbum;

  if (req.userId) {
    albumData._ownerId = req.userId;
  }

  try {
    const createdAlbum = await Album.create(albumData);

    res.status(201).json(createdAlbum);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/albums", async (req: Request, res: Response) => {
  try {
    const albums = await Album.find({});

    res.status(200).json(albums);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/albums/:albumId", async (req: Request, res: Response) => {
  const albumId = req.params.albumId;

  try {
    const album = await Album.findById({ _id: albumId });

    if(!album) {
      throw {
        message: "No results!",
      }
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(404).json({ message: "No results!" });
  }
});

router.delete(
  "/albums/:albumId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const albumId = req.params.albumId;
    const userId = req.userId;

    try {
      const album = await Album.findOneAndDelete({
        _id: albumId,
        _ownerId: userId,
      });

      if (!album) {
        throw {
          message: "Not Found!",
        };
      }

      res.status(200).json({ album, message: "Successfull deleted!" });
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

router.put(
  "/albums/:albumId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const albumId = req.params.albumId;
    const userId = req.userId;

    let albumData = Object.entries(req.body) as [string, string][];

    try {
      const trimmedData = trimData(albumData) as IAlbum;

      const album = await Album.findOneAndUpdate(
        { _id: albumId, _ownerId: userId },
        trimmedData,
        { runValidators: true }
      );

      if (!album) {
        throw {
          message: "Not Found!",
        };
      }

      res.status(201).json({ message: "Successfull editing!" });
    } catch (err) {
      res.status(404).json(err);
    }
  }
);

export default router;
