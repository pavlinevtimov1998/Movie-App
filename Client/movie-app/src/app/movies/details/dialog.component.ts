import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-movie',
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        <mat-icon>delete</mat-icon>YES
      </button>
      <button mat-raised-button color="primary" [mat-dialog-close]="false">
        <mat-icon>back_hand</mat-icon>NO
      </button>
    </mat-dialog-actions>
  `,
})
export class DeleteMoviePostComponent {}
