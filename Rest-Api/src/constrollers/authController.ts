import { Request, Response, Router } from "express";
import { cookieName, sercret } from "../config/constants";
import { IUser } from "../models/interfaces";
import { User } from "../models/UserModel";
import { jwtPromise, parseDocument, removePassword } from "../utill";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, username, password } = req.body as IUser;

  try {
    const userData = await User.create({
      email,
      username,
      password,
    });

    const parsedData = parseDocument(userData);
    const publicData = removePassword(parsedData);

    const token = await jwtPromise(userData._id, sercret);

    res.cookie(cookieName, token, { httpOnly: true });

    res.status(201).json(publicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
