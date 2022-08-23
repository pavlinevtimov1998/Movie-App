const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [5, "Album name should be at least 5 characters!"],
    validate: {
      validator: function (value) {
        return /[A-Za-z]/g.test(value);
      },
      message: () => "Album name should contains only letters!",
    },
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /((https:\/\/|http:\/\/).+(\.jpg))/g.test(value);
      },
      message: () => "Album image should be valid URL!",
    },
  },
  releaseDate: {
    type: String,
    required: [true, "Release date is required!"],
    validate: {
      validator: function (value) {
        return /[A-Za-z0-9]+/g.test(value);
      },
      message: () => "Invalid date!",
    },
  },
  artist: {
    type: String,
    required: true,
    minLength: [5, "Artist name should be at least 5 characters!"],
    validate: {
      validator: function (value) {
        return /[A-Za-z]+/g.test(value);
      },
      message: () => "Artist name should contains only letters!",
    },
  },
  genre: {
    type: String,
    required: [true, "Genre is required!"],
    validate: {
      validator: function (value) {
        return /[A-Za-z]+/g.test(value);
      },
      message: () => "Genre should contains only letters!",
    },
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Description should be at least 10 characters!"],
  },
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;

// {
//     name,
//     imgUrl,
//     price,
//     releaseDate,
//     artist,
//     genre,
//     description
//   }
