import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";

import { cookieName, sercret } from "../config/constants";
import { IUser } from "../models/interfaces";
import { User } from "../models/UserModel";
import { jwtPromise, parseDocument, removePassword } from "../utill";
import { authMiddleware } from "../middlewares/authMiddleware";

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

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as IUser;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw {
        message: "Invalid username or password!",
      };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw {
        message: "Invalid username or password!",
      };
    }

    const parsedData = parseDocument(user);
    const publicData = removePassword(parsedData);

    const token = await jwtPromise(user._id, sercret);

    res.cookie(cookieName, token, { httpOnly: true });

    res.status(200).json(publicData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      throw {
        message: "No results!",
      };
    }

    const parsedData = parseDocument(user);
    const publicData = removePassword(parsedData);

    res.status(200).json(publicData);
  } catch (err) {
    res.status(404).json(err);
  }
});

export default router;
