import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectCardComponent } from './add-project-card.component';

describe('AddProjectCardComponent', () => {
  let component: AddProjectCardComponent;
  let fixture: ComponentFixture<AddProjectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
