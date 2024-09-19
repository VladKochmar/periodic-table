import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeriodicElement } from '../../models/periodic-element.model';
import { MatDialog } from '@angular/material/dialog';
import { EditingDialogComponent } from '../editing-dialog/editing-dialog.component';
import { debounceTime, Observable, Subject } from 'rxjs';
import { AppState } from '../../services/app-state.service';
import { RxIf } from '@rx-angular/template/if';

@Component({
  selector: 'periodic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RxIf,
  ],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
  constructor(private appState: AppState) {}

  displayedColumns: string[] = ['number', 'name', 'weight', 'symbol', 'star'];
  filteredElements$: Observable<PeriodicElement[]> | null = null;
  filterSubject$ = new Subject<string>();

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.filteredElements$ = this.appState.state.select('filteredElements');
    this.appState.loadElements();
    this.appState.filterElements(this.filterSubject$.pipe(debounceTime(2000)));
  }

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject$.next(filterValue);
  }

  openDialog(periodicElement: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditingDialogComponent, {
      data: { selectedElement: periodicElement },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.selectedElement) {
        this.appState.updateElement(result.selectedElement, result.oldPosition);
      }
    });
  }
}
