const { cookieName, sercret } = require("../config/constants");
const { jwtVerify } = require("../utill");

exports.auth = async (req, res, next) => {
  const token = req.cookies[cookieName] || "";

  try {
    const decodedToken = await jwtVerify(token, sercret);

    res.userId = decodedToken.id;

    next();
  } catch (err) {
    res.status(401).json({ message: "Not allowed!" });
    return;
  }
};
