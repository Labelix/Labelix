import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConclusionDialogComponent } from './project-conclusion-dialog.component';

describe('ProjectConclusionDialogComponent', () => {
  let component: ProjectConclusionDialogComponent;
  let fixture: ComponentFixture<ProjectConclusionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectConclusionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConclusionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
