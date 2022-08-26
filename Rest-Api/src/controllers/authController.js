const router = require("express").Router();

const { cookieName } = require("../config/constants");
const { auth } = require("../middlewares/authMiddleware");
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const { userData, token } = await authService.register({
      email,
      username,
      password,
    });

    res.cookie(cookieName, token, { httpOnly: true });

    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { userData, token } = await authService.login({ username, password });

    res.cookie(cookieName, token, { httpOnly: true });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/profile", auth, async (req, res) => {
  const userId = res.userId;
  try {
    const user = await authService.getUser(userId);

    if (!user) {
      throw {
        message: "Can't find user!",
      };
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
