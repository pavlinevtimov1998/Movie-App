import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Movie } from "../models/MovieModel";
import { Like } from "../models/LikeModel";
import { AppError } from "../utils/appError";
import { catchAsyncError } from "../utils/catchAsyncErr";

const router = Router();

router.post(
  "/",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const movieId = req.body.movieId;
    console.log(movieId);

    const [movie, like] = await Promise.all([
      Movie.findById(movieId),
      Like.findOne({ _ownerId: req.user?._id, movieId: movieId }),
    ]);

    if (movie && !like) {
      if (movie._ownerId === req.user?._id) {
        return next(new AppError("Can't like own created movie!", 400));
      } else {
        await Like.create({ _ownerId: req.user?._id, movieId: movie._id });
      }
    } else {
      return next(new AppError("This movie is already liked from user!", 400));
    }

    res
      .status(201)
      .json({ status: "Success", message: "Successfully liked movie!" });
  })
);

router.delete(
  "/revoke",
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const movieId = req.params.movieId;

    const like = await Like.findOneAndDelete({
      _ownerId: req.user?._id,
      movieId: movieId,
    });

    if (!like) {
      return next(new AppError("Not found!", 404));
    }

    res.status(204).json();
  })
);

export default router;
