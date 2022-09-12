import { ILike } from './Like-Interface';

export interface IMovie {
  _id?: string;
  name: string;
  imageUrl: string;
  genre: string;
  description: string;
  _ownerId?: string;
  likes?: ILike[];
  isOwner?: boolean;
}
