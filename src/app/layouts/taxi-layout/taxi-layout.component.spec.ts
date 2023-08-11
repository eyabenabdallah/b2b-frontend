import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiLayoutComponent } from './taxi-layout.component';

describe('TaxiLayoutComponent', () => {
  let component: TaxiLayoutComponent;
  let fixture: ComponentFixture<TaxiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
