import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTimelineSingleImageComponent } from './image-timeline-single-image.component';

describe('ImageTimelineSingleImageComponent', () => {
  let component: ImageTimelineSingleImageComponent;
  let fixture: ComponentFixture<ImageTimelineSingleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTimelineSingleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTimelineSingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
