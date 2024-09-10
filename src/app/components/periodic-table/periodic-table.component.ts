import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeriodicElement } from '../../models/periodic-element.model';
import { ELEMENT_DATA } from '../../../data/mock-data';
import { MatDialog } from '@angular/material/dialog';
import { EditingDialogComponent } from '../editing-dialog/editing-dialog.component';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'periodic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements AfterViewInit {
  @ViewChild('input') input: any;
  displayedColumns: string[] = ['number', 'name', 'weight', 'symbol', 'star'];
  elements = new MatTableDataSource(ELEMENT_DATA);

  readonly dialog = inject(MatDialog);

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(() => {
        const filterValue = this.input.nativeElement.value;
        this.elements.filter = filterValue.trim().toLowerCase();
      });
  }

  openDialog(periodicElement: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditingDialogComponent, {
      data: { selectedElement: periodicElement },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const index = this.elements.data.findIndex(
          (element) => element.name === periodicElement.name
        );

        this.elements.data = [
          ...this.elements.data.slice(0, index),
          result,
          ...this.elements.data.slice(index + 1),
        ];
      }
    });
  }
}
