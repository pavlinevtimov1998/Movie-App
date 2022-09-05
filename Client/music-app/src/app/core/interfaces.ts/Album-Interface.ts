export interface IAlbum {
  _id: string;
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
  likes: number;
}
