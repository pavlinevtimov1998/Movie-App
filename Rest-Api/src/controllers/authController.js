const router = require("express").Router();

const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await authService.register({ email, username, password });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(404).json({ message: "wrong username or password!" });
    }

    let userData = parseDocument(user);
    userData = removePassword(userData);

    const token = jwt.sign({ id: user._id }, "sercret", { expiresIn: "1d" });

    res.cookie("cookie", token, { httpOnly: true });

    res.status(200).json(userData);
  } catch (err) {}
});

module.exports = router;
