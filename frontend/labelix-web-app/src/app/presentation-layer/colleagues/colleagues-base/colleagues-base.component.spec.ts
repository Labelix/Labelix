import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColleaguesBaseComponent } from './colleagues-base.component';

describe('ColleaguesBaseComponent', () => {
  let component: ColleaguesBaseComponent;
  let fixture: ComponentFixture<ColleaguesBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColleaguesBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColleaguesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
