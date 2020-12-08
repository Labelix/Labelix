import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTimelineComponent } from './image-timeline.component';

describe('ImageTimelineComponent', () => {
  let component: ImageTimelineComponent;
  let fixture: ComponentFixture<ImageTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
