import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Album } from "../models/AlbumModel";
import { IAlbum } from "../models/interfaces";
import { trimData } from "../utill";

const router = Router();

router.post("/albums", authMiddleware, async (req: Request, res: Response) => {
  const data = Object.entries(req.body) as [string, string][];

  console.log(data);
  
  const albumData = trimData(data) as IAlbum;

  try {
    const createdAlbum = await Album.create(albumData);

    res.status(201).json(createdAlbum);
  } catch (err) {
    console.log(err);
    
    res.status(404).json(err);
  }
});

export default router;
