import { Router, Request, Response, NextFunction } from "express";

import likeController from "./likeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Album } from "../models/AlbumModel";
import { IAlbum } from "../models/interfaces";
import { Sorting } from "../utils/utill";
import { catchAsyncError } from "../utils/catchAsyncErr";
import { Like } from "../models/LikeModel";
import { AppError } from "../utils/appError";

const router = Router();

router.use("/likes", authMiddleware, likeController);

router.post(
  "/albums",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response) => {
    const albumData = req.body as IAlbum;

    if (req.user?._id) {
      albumData._ownerId = req.user._id;
    }

    const createdAlbum = await Album.create(albumData);

    res.status(201).json(createdAlbum);
  })
);

router.get(
  "/albums",
  catchAsyncError(async (req: Request, res: Response) => {
    const futures = new Sorting(
      Album.find(),
      req.query as { [key: string]: string }
    )
      .filter()
      .sort()
      .fields();

    const albums = await futures.query.populate("likes");

    res.status(200).json(albums);
  })
);

router.get(
  "/albums/:albumId",
  catchAsyncError(async (req: Request, res: Response) => {
    const albumId = req.params.albumId;

    const album = await Album.findById(albumId).populate("likes");

    res.status(200).json(album);
  })
);

router.delete(
  "/albums/:albumId",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const albumId = req.params.albumId;
    const userId = req.user?._id;

    const album = await Album.findOneAndDelete({
      _id: albumId,
      _ownerId: userId,
    });

    if (!album) {
      return next(new AppError("Not found!", 404));
    } else {
      await Like.deleteMany({ albumId });
    }

    res.status(200).json({ message: "Successfull deleted!" });
  })
);

router.put(
  "/albums/:albumId",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response) => {
    const albumId = req.params.albumId;
    const userId = req.user?._id;

    let albumData = req.body as IAlbum;

    const album = await Album.findOneAndUpdate(
      { _id: albumId, _ownerId: userId },
      albumData,
      { new: true, runValidators: true }
    );

    res.status(201).json({ message: "Successfull editing!", album });
  })
);

export default router;
