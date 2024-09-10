import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingDialogComponent } from './editing-dialog.component';

describe('EditingDialogComponent', () => {
  let component: EditingDialogComponent;
  let fixture: ComponentFixture<EditingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
