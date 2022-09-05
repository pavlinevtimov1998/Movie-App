import { Component, OnInit, Input } from '@angular/core';
import { IAlbum } from 'src/app/core/interfaces.ts/Album-Interface';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css'],
})
export class AlbumItemComponent implements OnInit {
  @Input() album!: IAlbum;

  constructor() {}

  ngOnInit(): void {}
}
