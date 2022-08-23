const Album = require("../models/AlbumModel");

exports.createAlbum = (albumData) => Album.create(albumData);
