const router = require("express").Router();

const { auth } = require("../middlewares/authMiddleware");
const albumService = require("../services/albumService");
const { trimData } = require("../utill");

router.post("/albums", auth, async (req, res) => {
  let albumData = Object.entries(req.body);
  const userId = res.userId;

  try {
    albumData = trimData(albumData);
    albumData["ownerId"] = userId;

    const album = await albumService.createAlbum(albumData);

    res.status(201).json(album);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/albums", async (req, res) => {
  try {
    const albums = await albumService.getAll();

    res.status(200).json(albums);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/albums/:albumId", async (req, res) => {
  const albumId = req.params.albumId;

  try {
    const album = await albumService.getOne(albumId);

    res.status(200).json(album);
  } catch (err) {
    res.status(400).json({ message: "No results!" });
  }
});

router.delete("/albums/:albumId", auth, async (req, res) => {
  const albumId = req.params.albumId;
  const userId = res.userId;

  try {
    const album = await albumService.deleteOne(albumId, userId);

    if (!album) {
      throw {
        message: "Not Found!",
      };
    }

    res.status(200).json({ album, message: "Successfull deleting!" });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/albums/:albumId", auth, async (req, res) => {
  const albumId = req.params.albumId;
  const userId = res.userId;

  let albumData = Object.entries(req.body);

  try {
    albumData = trimData(albumData);

    const album = await albumService.editAlbum(albumId, albumData, userId);

    if (!album) {
      throw {
        message: "Not Found!",
      };
    }

    res.status(201).json({ message: "Successfull editing!" });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
