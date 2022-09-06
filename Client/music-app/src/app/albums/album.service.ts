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

  getOne(albumId: string): Observable<IAlbum> {
    return this.http.get<IAlbum>(
      'http://localhost:3000/data/albums/' + albumId
    );
  }
}
