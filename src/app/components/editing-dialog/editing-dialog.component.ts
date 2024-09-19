import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PeriodicElement } from '../../models/periodic-element.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

interface DialogData {
  selectedElement: PeriodicElement;
}

@Component({
  selector: 'editing-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './editing-dialog.component.html',
  styleUrl: './editing-dialog.component.scss',
})
export class EditingDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditingDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  selectedElement = { ...this.data.selectedElement };
  oldPosition = this.selectedElement.position;

  onNoClick() {
    this.dialogRef.close();
  }
}
