import { NextFunction, Request, Response, Router } from "express";
import { Album } from "../models/AlbumModel";
import { Like } from "../models/LikeModel";
import { AppError } from "../utils/appError";
import { catchAsyncError } from "../utils/catchAsyncErr";

const router = Router();

router.post(
  "/:albumId",
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const albumId = req.params.albumId;

    const [album, like] = await Promise.all([
      Album.findById(albumId),
      Like.findOne({ _ownerId: req.user?._id, albumId: albumId }),
    ]);

    if (album && !like) {
      if (album._ownerId.toString() === req.user?._id.toString()) {
        return next(new AppError("Can't like own created album!", 400));
      } else {
        await Like.create({ _ownerId: req.user?._id, albumId: album._id });
      }
    } else {
      return next(new AppError("This album is already liked from user!", 400));
    }

    res
      .status(201)
      .json({ status: "Success", message: "Successfully liked album!" });
  })
);

router.delete(
  "/revoke/:albumId",
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const albumId = req.params.albumId;

    const like = await Like.findOne({
      _ownerId: req.user?._id,
      albumId: albumId,
    });

    if (like) {
      await Like.findByIdAndDelete(like._id);
    } else {
      return next(new AppError("Can't unlike album!", 400));
    }

    res
      .status(204)
      .json({ status: "Success", message: "Successfully unliked album!" });
  })
);

export default router;
