import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCourseComponent } from './agent-course.component';

describe('AgentCourseComponent', () => {
  let component: AgentCourseComponent;
  let fixture: ComponentFixture<AgentCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
