const Album = require("../models/AlbumModel");

exports.createAlbum = (albumData) => Album.create(albumData);

exports.getAll = () => Album.find({});

exports.getOne = (albumId) => Album.findOne({ _id: albumId });

exports.deleteOne = (albumId) => Album.findByIdAndDelete({ _id: albumId });
