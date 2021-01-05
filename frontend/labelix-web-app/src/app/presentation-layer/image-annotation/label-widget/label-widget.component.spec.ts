import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelWidgetComponent } from './label-widget.component';

describe('LabelWidgetComponent', () => {
  let component: LabelWidgetComponent;
  let fixture: ComponentFixture<LabelWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
