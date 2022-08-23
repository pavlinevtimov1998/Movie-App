const router = require("express").Router();

const { cookieProp } = require("../config/constants");
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const { userData, token } = await authService.register({
      email,
      username,
      password,
    });

    res.cookie(cookieProp, token, { httpOnly: true });

    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { userData, token } = await authService.login(data);

    res.cookie(cookieProp, token, { httpOnly: true });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
