import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiCourseComponent } from './taxi-course.component';

describe('TaxiCourseComponent', () => {
  let component: TaxiCourseComponent;
  let fixture: ComponentFixture<TaxiCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxiCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
