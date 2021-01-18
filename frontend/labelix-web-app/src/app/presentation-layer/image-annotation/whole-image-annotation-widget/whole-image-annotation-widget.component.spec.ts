import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeImageAnnotationWidgetComponent } from './whole-image-annotation-widget.component';

describe('WholeImageAnnotationWidgetComponent', () => {
  let component: WholeImageAnnotationWidgetComponent;
  let fixture: ComponentFixture<WholeImageAnnotationWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholeImageAnnotationWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeImageAnnotationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
