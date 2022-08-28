export interface IUser {
  username: string;
  email: string;
  password: string;
  albums: string[];
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
  likes: string[];
}
