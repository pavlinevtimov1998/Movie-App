import { ILike } from './Like-Interface';

export interface IAlbum {
  _id?: string;
  name: string;
  imageUrl: string;
  price: number;
  releaseDate: string;
  artist: string;
  genre: string;
  description: string;
  _ownerId?: string;
  likes?: ILike[];
  isOwner?: boolean;
}
