const router = require("express").Router();

const authController = require("./controllers/authController");
const albumsConstroller = require('./controllers/albumController');

router.use("/users", authController);

router.use('/data', albumsConstroller);

module.exports = router;
