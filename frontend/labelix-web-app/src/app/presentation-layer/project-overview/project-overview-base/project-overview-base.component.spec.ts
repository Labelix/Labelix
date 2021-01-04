import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOverviewBaseComponent } from './project-overview-base.component';

describe('ProjectOverviewBaseComponent', () => {
  let component: ProjectOverviewBaseComponent;
  let fixture: ComponentFixture<ProjectOverviewBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOverviewBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverviewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
