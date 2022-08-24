const Album = require("../models/AlbumModel");

exports.createAlbum = (albumData) => Album.create(albumData);

exports.getAll = () => Album.find({});

exports.getOne = (albumId) => Album.findOne({ _id: albumId });

exports.deleteOne = (albumId, userId) =>
  Album.findOneAndDelete({ _id: albumId, ownerId: userId });

exports.editAlbum = (albumId, albumData, ownerId) =>
  Album.findOneAndUpdate({ _id: albumId, ownerId }, albumData);
