import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbum } from '../core/interfaces.ts/Album-Interface';

@Injectable()
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>('http://localhost:3000/data/albums');
  }

  getOne(albumId: string): Observable<{ status: string; album: IAlbum }> {
    return this.http.get<{ status: string; album: IAlbum }>(
      'http://localhost:3000/data/albums/' + albumId
    );
  }

  createAlbum(body: IAlbum): Observable<{ status: string; album: IAlbum }> {
    return this.http.post<{ status: string; album: IAlbum }>(
      'http://localhost:3000/data/albums',
      body,
      {
        withCredentials: true,
      }
    );
  }

  likeAlbum() {
    
  }

  deleteAlbum(albumId: string) {
    return this.http.delete('http://localhost:3000/data/albums' + albumId, {
      withCredentials: true,
    });
  }
}
