export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  albums?: string[];
  __v?: number;
}

export interface IAlbum {
  name: string;
  imageUrl: string;
  price: number;
  releaseDate: string;
  artist: string;
  genre: string;
  description: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  _ownerId: string;
  likes?: string[];
}
