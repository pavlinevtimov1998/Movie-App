const router = require("express").Router();

const authController = require("./controllers/authController");
const albumsConstroller = require('./controllers/albumsController');

router.use("/users", authController);

router.use('/data', albumsConstroller);

module.exports = router;
