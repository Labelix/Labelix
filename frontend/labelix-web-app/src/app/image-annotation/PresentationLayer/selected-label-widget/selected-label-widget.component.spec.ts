import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLabelWidgetComponent } from './selected-label-widget.component';

describe('SelectedLabelWidgetComponent', () => {
  let component: SelectedLabelWidgetComponent;
  let fixture: ComponentFixture<SelectedLabelWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedLabelWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedLabelWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
