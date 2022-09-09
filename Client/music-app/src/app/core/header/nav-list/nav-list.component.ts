import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css'],
})
export class NavListComponent implements OnInit {

  @Output() handleClose = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {    
    this.handleClose.emit();
  }
}
