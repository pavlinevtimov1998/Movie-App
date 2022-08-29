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
  ownerId: IUser;
  likes?: string[];
}
