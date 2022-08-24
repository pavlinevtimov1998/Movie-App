const Album = require("../models/AlbumModel");

exports.createAlbum = (albumData) => Album.create(albumData);

exports.getAll = () => Album.find({});