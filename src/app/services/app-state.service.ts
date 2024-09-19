import { Injectable } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { PeriodicElement } from '../models/periodic-element.model';
import { ELEMENT_DATA } from '../../data/mock-data';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  readonly state = rxState<{
    elements: PeriodicElement[];
    filteredElements: PeriodicElement[];
  }>(({ set }) => {
    set({ elements: [], filteredElements: [] });
  });

  elements$ = this.state.select('elements');

  loadElements() {
    this.state.connect(of({ elements: ELEMENT_DATA }));
    this.state.connect(of({ filteredElements: ELEMENT_DATA }));
  }

  filterElements(filet$: Observable<string>) {
    this.state.connect(
      'filteredElements',
      filet$.pipe(
        map((filterValue) => {
          return this.state.get('elements').filter((element) => {
            return (
              element.name.toLowerCase().includes(filterValue.toLowerCase()) ||
              element.symbol
                .toLowerCase()
                .includes(filterValue.toLowerCase()) ||
              element.position.toString().includes(filterValue) ||
              element.weight.toString().includes(filterValue)
            );
          });
        })
      )
    );
  }

  updateElement(updatedElement: PeriodicElement, oldPosition: number | string) {
    this.state.set(({ elements, filteredElements }) => {
      const index = elements.findIndex(
        (element) => element.position === oldPosition
      );

      const updatedElements = [
        ...elements.slice(0, index),
        updatedElement,
        ...elements.slice(index + 1),
      ];

      return { elements: updatedElements, filteredElements: updatedElements };
    });
  }
}
