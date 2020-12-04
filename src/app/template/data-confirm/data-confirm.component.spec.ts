import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConfirmComponent } from './data-confirm.component';

describe('DataConfirmComponent', () => {
  let component: DataConfirmComponent;
  let fixture: ComponentFixture<DataConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
