const router = require("express").Router();

const albumService = require("../services/albumService");
const { trimData } = require("../utill");

router.post("/albums", async (req, res) => {
  let albumData = Object.entries(req.body);

  try {
    albumData = trimData(albumData);

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

module.exports = router;
