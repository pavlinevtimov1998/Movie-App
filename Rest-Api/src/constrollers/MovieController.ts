import { Router, Request, Response, NextFunction } from "express";

import { authMiddleware } from "../middlewares/authMiddleware";
import { Movie } from "../models/MovieModel";
import { IMovie } from "../models/interfaces";
import { Sorting } from "../utils/utill";
import { catchAsyncError } from "../utils/catchAsyncErr";
import { Like } from "../models/LikeModel";
import { AppError } from "../utils/appError";

const router = Router();

router.post(
  "/movies",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response) => {
    const movieData = req.body as IMovie;

    if (req.user?._id) {
      movieData._ownerId = req.user._id;
    }

    const createdmovie = await Movie.create(movieData);

    res.status(201).json({ status: "Successfull!", movie: createdmovie });
  })
);

router.get(
  "/movies",
  catchAsyncError(async (req: Request, res: Response) => {
    const futures = new Sorting(
      Movie.find(),
      req.query as { [key: string]: string }
    )
      .filter()
      .sort()
      .fields();

    const movies = await futures.query.populate("likes");

    res.status(200).json(movies);
  })
);

router.get(
  "/movies/:movieId",
  catchAsyncError(async (req: Request, res: Response) => {
    const movieId = req.params.movieId;

    const movie = await Movie.findById(movieId)
      .populate("likes")
      .select("-__v -updatedAt");

    res.status(200).json({ status: "Successfull!", movie });
  })
);

router.delete(
  "/movies/:movieId",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const movieId = req.params.movieId;
    const userId = req.user?._id;

    const movie = await Movie.findOneAndDelete({
      _id: movieId,
      _ownerId: userId,
    });

    if (!movie) {
      return next(new AppError("Not found!", 404));
    }

    await Like.deleteMany({ movieId });

    res.status(204).json();
  })
);

router.put(
  "/movies/:movieId",
  authMiddleware,
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const movieId = req.params.movieId;
    const userId = req.user?._id;

    let movieData = req.body as IMovie;

    const movie = await Movie.findOneAndUpdate(
      { _id: movieId, _ownerId: userId },
      movieData,
      { new: true, runValidators: true }
    )
      .populate("likes")
      .select("-__v -updatedAt");

    if (!movie) {
      return next(new AppError("Not found!", 404));
    }

    res.status(201).json({ message: "Successfull editing!", movie });
  })
);

export default router;
