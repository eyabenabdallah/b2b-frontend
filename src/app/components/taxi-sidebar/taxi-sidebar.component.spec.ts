import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiSidebarComponent } from './taxi-sidebar.component';

describe('TaxiSidebarComponent', () => {
  let component: TaxiSidebarComponent;
  let fixture: ComponentFixture<TaxiSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxiSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
